import { FC, useEffect, useState } from "react";
import { Button } from "../../../components";
import { Select, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaceRooms, getSellerPlaces } from "../../../redux/actions/places";
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
import { RoomModel } from "../../../types/places";

const StaysRoomsPage: FC = () => {
  const navigate = useNavigate();
  const { id: placeIdParam } = useParams();
  const dispatch = useAppDispatch();

  const { rooms, sellerPlaces } = useAppSelector((state: RootAppState) => state.places);
  console.log(rooms,"roomsasjdflkasfd");
  const { user } = useAppSelector((state: RootAppState) => state.auth);
  const [selectedPlace, setSelectedPlace] = useState<number | null>(
    placeIdParam ? Number(placeIdParam) : null
  );
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomModel | null>(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(getSellerPlaces(user.id)); // Fetch places on mount
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (selectedPlace) {
      dispatch(getPlaceRooms(selectedPlace)); // Fetch rooms when place changes
    }
  }, [dispatch, selectedPlace]);

  const openVerifyModal = (room: RoomModel) => {
    setSelectedRoom(room);
    setVerifyModalOpen(true);
  };

  const closeVerifyModal = () => {
    setVerifyModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div>
      <div className={`flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center`}>
        <h2 className={`text-3xl text-dark-blue font-medium`}>
          {`Rooms & Packages (${selectedPlace ? rooms.length : 0})`}
        </h2>
        <Button
          variant="filled"
          onClick={() => navigate(`/app/rooms/create`)}
          title={`Add New Room`}
        />
      </div>

      <div className="my-4 ">
        <Select
          className="w-full form-border-color rounded-md popins"
          placeholder="Select a places"
          value={selectedPlace}
          onChange={(value) => setSelectedPlace(value)}
        >
          {sellerPlaces.map((place) => (
            <Select.Option key={place.id} value={place.id}>
              {place.title}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className={`grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12`}>
        {selectedPlace && rooms.map((room: RoomModel) => (
          <div key={room.id} className={`rounded-md shadow-xl hover:border-primary smooth overflow-hidden`}>
            <img
              src={room?.images?.length ? room.images[0] : "https://dmttourism.com/images/property/15/IMG_20250224_18120667bc69be62936.jpg"}
              alt={room?.title || "Room Image"}
              className="h-[200px] w-full object-cover"
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
                  <h4 className={`text-sm text-gray font-normal`}>{room.discount ? `${getCurrencySymbol("USD")} ${room.discount}` : "N/A"}</h4>
                </div>
              )}

              <div className={`flex gap-2 items-center`}>
                <h3 className={`text-sm text-dark-blue font-semibold`}>{`Transfer Service -`}</h3>
                <h4 className={`text-sm text-gray font-normal capitalize`}>{room.transferService}</h4>
              </div>

              {room.extraAmount !== null && (
                <div className={`flex gap-2 items-center`}>
                  <h3 className={`text-sm text-dark-blue font-semibold`}>{`Extra Cost -`}</h3>
                  <h4 className={`text-sm text-gray font-normal`}>{`${getCurrencySymbol("USD")} ${room.extraAmount}`}</h4>
                </div>
              )}

              <div className={`flex items-center justify-between w-full`}>
                <div className={`gap-2 items-center`}>
                  <h3 className={`text-xl font-medium text-dark-blue`}>{`${getCurrencySymbol("USD")} ${room.price}`}</h3>
                  <h4 className={`text-sm text-gray font-normal`}>{`per night`}</h4>
                </div>

                <div className={`flex gap-3 items-center`}>
                  <button type="button" className={`p-3 bg-white rounded-full`} onClick={() => {
                    navigate(`/app/rooms/edit/${room.id}?placeId=${room.place_id}`, { replace: true });
                  }}
                  >
                    <FiEdit className={`text-primary text-base`} />
                  </button>
                  {room.id !== undefined && <DeleteRoom placeId={room.place_id} roomId={room.id} />}
                </div>
              </div>
              <Button
                className="w-full mt-2"
                variant={room.isVerified ? "filled" : "outline"}
                title={room.isVerified ? "Verified" : "Show Verification"}
                onClick={() => openVerifyModal(room)}
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

      {/* Verification Message Modal */}
      <Modal
        title="Room Verification Status"
        open={verifyModalOpen}
        onCancel={closeVerifyModal}
        footer={[
          <Button key="close" onClick={closeVerifyModal}>
            Close
          </Button>
        ]}
      >
        {selectedRoom && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                selectedRoom.isVerified
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {selectedRoom.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
            {selectedRoom.message ? (
              <div>
                <span className="font-semibold block mb-2">Admin Message:</span>
                <p className="text-gray-700 bg-gray-50 p-3 ps-0 rounded">
                  {selectedRoom.message}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No verification message available.
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StaysRoomsPage;
