import { FC, useEffect } from "react";
import { Button, RoomCard } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { RoomModel } from "../../../types/places";
import { getPlaceRooms } from "../../../redux/actions/places";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";

const StaysRoomsPage: FC = () => {
  const navigate = useNavigate();
  const { id: placeId } = useParams();
  const dispatch = useAppDispatch();

  const { rooms } = useAppSelector((state: RootAppState) => state.places);

  useEffect(() => {
    dispatch(getPlaceRooms(Number(placeId)));
  }, []);

  return (
    <div>
      <div
        className={`flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center`}
      >
        <h2 className={`text-3xl text-dark-blue font-medium`}>
          {`Rooms & Packages (${rooms.length})`}
        </h2>
        <Button
          variant="outline"
          onClick={() => navigate(`/app/stays/${placeId}/rooms/create`)}
          icon={
            <CiSquarePlus className={`text-primary group-hover:text-white`} />
          }
          title={`Add New Room`}
        />
      </div>
      {rooms && rooms.length > 0 && (
        <div
          className={`grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12`}
        >
          {rooms.map((room: RoomModel, i: number) => (
            <RoomCard data={room} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StaysRoomsPage;
