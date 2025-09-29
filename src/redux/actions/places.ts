/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { AppDispatch,RootAppState  } from "../store";
import { AppDispatch } from "../store";
import {
  addPlaceToStore,
  storeActivePlaces,
  storeNewPlaceDetails,
  storePlaces,
  storeRooms,
  storeSellerPlaces,
  storeLatestPlaces,
  setLoadingLatestPlaces,
  setIncompleteStay,
  updateRoomInStore,
} from "../reducers/places";
import api, { multipartHeader } from "../../api";
import { message } from "antd";
import { storePageDetails, switchLoading } from "../reducers/ui";
import { placeInitState } from "../../lib/constants/stays";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Room } from "../../lib/types/stays";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPlaces = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoadingLatestPlaces(true))
    const { data } = await api.get("/places");
    dispatch(storePlaces(data)); //  Ensure it is dispatching
  } catch (err: any) {
    console.log(err.response?.data);
    message.error(err.response?.data?.message);
  }
};

export const getSellerPlaces =
  (id: number | undefined) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingLatestPlaces(true));
      const {
        data: { data },
      } = await api.get(`places/seller?sellerId=${id}`);

      dispatch(storeSellerPlaces(data));
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };

export const createPlace = (body: any, navigate: ReturnType<typeof useNavigate>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const {
      data: { data, success },
    } = await api.post("/places", body, {
      headers: multipartHeader(),
    });

    dispatch(switchLoading());
    dispatch(addPlaceToStore(data));
    dispatch(storeNewPlaceDetails(placeInitState));
    dispatch(setIncompleteStay({ placeId: data.id, incomplete: true }));
    message.success("Successfully created! Now add at least one room to complete your listing.");

    //  Redirect to room creation page with the new place ID
    navigate(`/app/rooms/create?placeId=${data.id}&incomplete=true`);

    return success;

  } catch (err: any) {
    dispatch(switchLoading());
    console.log(err.response.data?.message);

    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};

export const updateStay = (body: any, stayId: string) => async () => {
  try {
    let res;

    if (body instanceof FormData) {
      res = await api.patch(`/places/${stayId}`, body, {
        headers: multipartHeader(),
      });
    } else {
      res = await api.patch(`/places/${stayId}`, body);
    }

    message.success("Successfully updated!");
    return res;
  } catch (err: any) {
    message.error(
      err.response?.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response?.data?.message || "Failed to update stay"
    );
  }
};

export const getActivePlaces = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.get(`/places/active`);
    dispatch(storeActivePlaces(data));
  } catch (err: any) {
    console.log(err);
    message.error(err.response.data?.message);
  }
};

export const getPlaceImage = (placeId: string) => async () => {
  try {
    await api.get(`/places/${placeId}/images`);
  } catch (err: any) {
    console.log(err);
    message.error(err.response.data?.message);
  }
};

export const deletePlaceImage =
  (stayId: string, assetId: string) => async () => {
    try {
      await api.delete(`/places/${stayId}/images/${assetId}`);

      message.success("Successfully deleted!");
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };

export const getPlaceById =
  (placeId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());
      const { data } = await api.get(`/places/${placeId}`);
      dispatch(storePageDetails(data));
      dispatch(getPlaceRooms(placeId));
      dispatch(switchLoading());
      return data;
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getPlaceRooms =
  (placeId: number) => async (dispatch: AppDispatch) => {
    try {
      const {
        data: { data },
      } = await api.get(`/rooms/${placeId}`);

      console.log(data);
      dispatch(storeRooms(data));

      return data;
    } catch (err: any) {
      message.error(
        err.response.data?.message ===
          "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
          ? `Switch to SELLER`
          : err.response.data?.message
      );
    }
  };

export const getAllRooms = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get("/rooms");
    dispatch(storeRooms(response.data.data));
  } catch (err: any) {
    console.error("Error fetching all rooms:", err);
    message.error(err.response?.data?.message || "Failed to fetch rooms");
  }
}


export const getRoom = createAsyncThunk<Room | undefined, { placeId: number; roomId: number }>(
  "places/getRoom",
  async ({ placeId, roomId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/rooms/${placeId}/${roomId}`);
      return response.data.data as Room; //  Returns the actual room
    } catch (error) {
      return rejectWithValue("Failed to fetch room");
    }
  }
);

export const createRoom = (roomData: any) => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem("token"); // Ensure token is retrieved
    if (!token) {
      message.error("Authentication failed. Please log in.");
      return false;
    }

    // Check if there are images to upload
    const hasImages = roomData.images && roomData.images.length > 0;
    
    let dataToSend;
    let config;

    if (hasImages) {
      // If there are images, use FormData
      const formData = new FormData();
      
      // Add all the room data fields directly to FormData
      const { images, ...roomDataWithoutImages } = roomData;
      
      // Add each field individually
      Object.keys(roomDataWithoutImages).forEach(key => {
        const value = roomDataWithoutImages[key];
        if (key === 'beds' && Array.isArray(value)) {
          // Handle beds array specially - append each bed object individually
          value.forEach((bed: any, index: number) => {
            formData.append(`beds[${index}][bed_type]`, bed.bed_type);
            formData.append(`beds[${index}][amount]`, String(bed.amount));
          });
        } else if (typeof value === 'object') {
          // For other objects, stringify them
          formData.append(key, JSON.stringify(value));
        } else {
          // For primitive values, convert to string
          formData.append(key, String(value));
        }
      });
      
      // Add each image file
      images.forEach((image: File) => {
        formData.append('images', image);
      });

      dataToSend = formData;
      // Don't set Content-Type manually for FormData - let browser set it with boundary
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      // If no images, send as JSON
      dataToSend = roomData;
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }

    const response = await api.post("/rooms", dataToSend, config);
    if (response.status === 201) {
      dispatch(getPlaceRooms(Number(roomData.place_id))); // Fetch updated room list
      // Clear incomplete stay state when room is created successfully
      dispatch(setIncompleteStay({ placeId: 0, incomplete: false }));
      return true;
    } else {
      message.error("Failed to create room.");
      return false;
    }
  } catch (error: any) {
    console.error("Room creation failed:", error.response?.data || error.message);
    message.error(error.response?.data?.message || "An error occurred.");
    return false;
  }
}

export const updateRoom = (roomData: any, roomId: number, originalData?: any) => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Authentication failed. Please log in.");
      return false;
    }

    // Get only the changed fields
    const getChangedFields = (current: any, original: any) => {
      const changed: any = {};
      
      Object.keys(current).forEach(key => {
        if (key === 'images') return; // Handle images separately
        
        const currentValue = current[key];
        const originalValue = original?.[key];
        
        // Handle boolean values properly
        if (typeof currentValue === 'boolean' && typeof originalValue === 'boolean') {
          if (currentValue !== originalValue) {
            changed[key] = currentValue;
          }
        }
        // Deep comparison for objects/arrays
        else if (typeof currentValue === 'object' && currentValue !== null) {
          if (JSON.stringify(currentValue) !== JSON.stringify(originalValue)) {
            changed[key] = currentValue;
          }
        } else if (currentValue !== originalValue) {
          changed[key] = currentValue;
        }
      });
      
      return changed;
    };

    const changedFields = originalData ? getChangedFields(roomData, originalData) : roomData;

    // --- PATCH: Always include both transferService and extraAmount if transferService is EXTRA_COST ---
    // Find the current transferService value (from changedFields or fallback to originalData)
    const transferServiceValue =
      changedFields.transferService !== undefined
        ? changedFields.transferService
        : originalData?.transferService;
    if (
      transferServiceValue === "EXTRA_COST" &&
      (changedFields.extraAmount !== undefined || changedFields.transferService !== undefined)
    ) {
      // Always include both fields
      changedFields.transferService = "EXTRA_COST";
      changedFields.extraAmount =
        changedFields.extraAmount !== undefined
          ? changedFields.extraAmount
          : roomData.extraAmount;
    }
    // --- END PATCH ---

    // --- PATCH: Always include both discount and isDiscountAvailable if discount is present ---
    if (changedFields.discount !== undefined) {
      changedFields.isDiscountAvailable = true;
    }
    // --- END PATCH ---
    
    // Check if there are new images (File objects) being uploaded
    const hasNewImages = roomData.images && roomData.images.length > 0 && roomData.images.some((img: any) => img instanceof File);
    const hasChangedFields = Object.keys(changedFields).length > 0;
    
    let dataToSend;
    let config;

    if (hasNewImages || hasChangedFields) {
      // If there are new images or changed fields, use FormData
      const formData = new FormData();
      
      // Add only the changed fields
      Object.keys(changedFields).forEach(key => {
        const value = changedFields[key];
        if (key === 'beds' && Array.isArray(value)) {
          // Handle beds array specially - append each bed object individually
          value.forEach((bed: any, index: number) => {
            formData.append(`beds[${index}][bed_type]`, bed.bed_type);
            formData.append(`beds[${index}][amount]`, String(bed.amount));
          });
        } else if (typeof value === 'object') {
          // For other objects, stringify them
          formData.append(key, JSON.stringify(value));
        } else {
          // For primitive values, convert to string
          formData.append(key, String(value));
        }
      });
      
      // Add new images if they exist (only File objects)
      if (hasNewImages) {
        roomData.images.forEach((image: any) => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      }

      dataToSend = formData;
      // Don't set Content-Type manually for FormData - let browser set it with boundary
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      // If no changes and no new images, return early
      message.info("No changes detected.");
      return true;
    }

    const response = await api.patch(`/rooms/${roomId}`, dataToSend, config);
    if (response.status === 200) {
      // Update the room in the store with the response data
      const updatedRoom = response.data.data;
      if (updatedRoom) {
        dispatch(updateRoomInStore(updatedRoom));
      }
      dispatch(getPlaceRooms(Number(roomData.place_id))); // Fetch updated room list
      return true;
    } else {
      message.error("Failed to update room.");
      return false;
    }
  } catch (error: any) {
    console.error("Room update failed:", error.response?.data || error.message);
    message.error(error.response?.data?.message || "An error occurred.");
    return false;
  }
}


export const deleteRoom = (roomId: number) => async () => {
  try {
    await api.delete(`/rooms/${roomId}`);
    message.success("Successfully deleted!");
  } catch (err: any) {
    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};

export const getLatestPlaces = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoadingLatestPlaces(true)); // if you have a loading flag
    const response = await api.get("/explore/latestplaces");

    // Now check the structure and safely grab the data
    const places = response.data?.data || response.data; // fallback if there's no `data.data`
    dispatch(storeLatestPlaces(places)); // your actual reducer here
  } catch (err: any) {
    console.error("❌ Error fetching latest places:", err);
    message.error(err.response?.data?.message || "Failed to fetch latest places");
  } finally {
    dispatch(setLoadingLatestPlaces(false)); // if you have this flag
  }
};

// Verify room action (admin)
export const verifyRoom = async (roomId: string, verifyMessage: string, isVerified: boolean) => {
  try {
    const { data } = await api.patch(`/rooms/admin/verify/${roomId}`, {
      isVerified,
      message: verifyMessage,
    });
    message.success("Room verified successfully");
    return { success: true, data };
  } catch (err: any) {
    message.error(err.response?.data?.message || "Failed to verify room");
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

// Verify place action (admin)
export const verifyPlace = async (placeId: string, verifyMessage: string, isVerified: boolean) => {
  try {
    const { data } = await api.patch(`/places/verify/${placeId}`, {
      isVerified,
      message: verifyMessage,
    });
    message.success("Place verified successfully");
    return { success: true, data };
  } catch (err: any) {
    message.error(err.response?.data?.message || "Failed to verify place");
    return { success: false, error: err.response?.data?.message || err.message };
  }
};
