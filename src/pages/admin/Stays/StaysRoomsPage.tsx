import { FC, useEffect, useState } from "react";
import { Button } from "../../../components";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaces, getPlaceRooms, verifyRoom } from "../../../redux/actions/places";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { IoBedOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import DeleteRoom from "./Delete/DeleteRoom";
import "../../../index.css";
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import StaysRoomsVerifyModal from "./StaysRoomsVerifyModal";
import { RoomModel } from "../../../types/places";

const StaysRoomsPage: FC = () => {
  const navigate = useNavigate();
  const { id: placeIdParam } = useParams();
  const dispatch = useAppDispatch();

  const { rooms, places } = useAppSelector((state: RootAppState) => state.places);
  const [selectedPlace, setSelectedPlace] = useState<number | null>(
    placeIdParam ? Number(placeIdParam) : null
  );

  useEffect(() => {
    dispatch(getPlaces()); // Fetch places on mount
  }, [dispatch]);

  useEffect(() => {
    if (selectedPlace) {
      dispatch(getPlaceRooms(selectedPlace)); // Fetch rooms when place changes
    }
  }, [dispatch, selectedPlace]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomModel | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const showStaysRoomsVerifyModal = (room: RoomModel) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleOk = async (isVerified: boolean, verifyMessage: string) => {
    if (!selectedRoom?.id) return;

    setVerifyLoading(true);
    try {
      const result = await verifyRoom(selectedRoom.id.toString(), verifyMessage, isVerified);
      if (result.success) {
        // Refresh the room list after successful verification
        if (selectedPlace) {
          dispatch(getPlaceRooms(selectedPlace));
        }
      }
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setVerifyLoading(false);
      setIsModalOpen(false);
      setSelectedRoom(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div>
      <div className={`flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center`}>
        <h2 className={`text-3xl text-dark-blue font-medium`}>
          {`Rooms & Packages (${selectedPlace ? rooms.length : "0"})`}
        </h2>
        {/* <Button
          variant="filled"
          onClick={() => navigate(`/admin/rooms/create`)}
          title={`Add New Room`}
        /> */}
      </div>

      <div className="my-4 ">
        <Select
          className="w-full form-border-color rounded-md popins"
          placeholder="Select a places"
          value={selectedPlace}
          onChange={(value) => setSelectedPlace(value)}
        >
          {places.map((place) => (
            <Select.Option key={place.id} value={place.id}>
              {place.title}
            </Select.Option>
          ))}
          <Select.Option  value="">
            No Option
          </Select.Option>
        </Select>
      </div>
      <div className={`grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12`}>
        {selectedPlace && rooms.map((room) => (
          <div key={room.id} className={`rounded-xl shadow-xl hover:border-primary smooth overflow-hidden`}>
            <img
              src={room?.images?.length ? room.images[0] : "https://dmttourism.com/images/property/15/IMG_20250224_18120667bc69be62936.jpg"}
              alt={room?.title || "Room Image"}
              className="max-h-[200px] w-full object-cover"
            />

            <div className={`flex text-start flex-col items-start justify-start p-4 gap-4`}>
              <h3 className={`text-lg font-medium text-dark-blue`}>{room.title}</h3>

              <div className={`flex gap-2 items-center`}>
                <IoBedOutline />
                <h3 className={`text-sm text-dark-blue font-semibold`}>{`Beds -`}</h3>
                <div>
                  {room.beds.length > 0 ? (
                    room.beds.map((bed, index) => (
                      <h4 key={index} className={`text-sm text-gray font-normal capitalize`}>
                        {`${bed.amount} ${bed.bed_type}`}
                      </h4>
                    ))
                  ) : (
                    <h4 className={`text-sm text-gray font-normal`}>N/A</h4>
                  )}
                </div>
              </div>

              <div className={`flex gap-2 items-center`}>
                <IoBedOutline />
                <h3 className={`text-sm text-dark-blue font-semibold`}>{`Type -`}</h3>
                <h4 className={`text-sm text-gray font-normal capitalize`}>{room.room_type}</h4>
              </div>

              {room.isDiscountAvailable && (
                <div className={`flex gap-2 items-center`}>
                  <h3 className={`text-sm text-dark-blue font-semibold`}>{`Discount -`}</h3>
                  <h4 className={`text-sm text-gray font-normal`}>{room.discount ? `${getCurrencySymbol("NPR")} ${room.discount}` : "N/A"}</h4>
                </div>
              )}

              <div className={`flex gap-2 items-center`}>
                <h3 className={`text-sm text-dark-blue font-semibold`}>{`Transfer Service -`}</h3>
                <h4 className={`text-sm text-gray font-normal capitalize`}>{room.transferService}</h4>
              </div>

              {room.extraAmount !== null && (
                <div className={`flex gap-2 items-center`}>
                  <h3 className={`text-sm text-dark-blue font-semibold`}>{`Extra Cost -`}</h3>
                  <h4 className={`text-sm text-gray font-normal`}>{`${getCurrencySymbol("NPR")} ${room.extraAmount}`}</h4>
                </div>
              )}

              <div className={`flex items-center justify-between w-full`}>
                <div className={`gap-2 items-center`}>
                  <h3 className={`text-xl font-medium text-dark-blue`}>{`${getCurrencySymbol("NPR")} ${room.price}`}</h3>
                  <h4 className={`text-sm text-gray font-normal`}>{`per night`}</h4>
                </div>

                <div className={`flex gap-3 items-center`}>
                  <button type="button" className={`p-3 bg-white rounded-full`} onClick={() => {
                    navigate(`/admin/rooms/edit/${room.id}?placeId=${room.place_id}`, { replace: true }); // ✅ Pass both roomId & placeId
                  }}
                  >
                    <FiEdit className={`text-primary text-base`} />
                  </button>
                  {room.id !== undefined && <DeleteRoom place_id={room.place_id} id={room.id} />}

                </div>
              </div>
              <Button
                className="w-full"
                variant={room.isVerified ? "filled" : "outline"}
                title={room.isVerified ? "Verified" : "Verify"}
                onClick={() => showStaysRoomsVerifyModal(room)}
                disabled={verifyLoading}
              />
            </div>
          </div>
        ))}
      </div>

      {rooms.length === 0 && !selectedPlace && (
        <p className="text-center text-gray-500 mt-4">Please Select Places.</p>
      )}
      {rooms.length === 0 && selectedPlace && (
        <p className="text-center text-gray-500 mt-4">No rooms found for this place.</p>
      )}

      <StaysRoomsVerifyModal
        handleOk={handleOk}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        initialIsVerified={selectedRoom?.isVerified || false}
        initialMessage={selectedRoom?.verificationMessage || "Room meets all requirements and is approved"}
        loading={verifyLoading}
      />
    </div>
  );
};

export default StaysRoomsPage;
