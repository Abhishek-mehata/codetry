/* eslint-disable @typescript-eslint/no-explicit-any */

// import { message } from "antd";
import { FC } from "react";
// import api from "../../../../api";
import { useAppDispatch } from "../../../../hooks/useTypedSelectors";
import { DeleteButton } from "../../../../components";
import { deleteRoom, getPlaceRooms} from "../../../../redux/actions/places";
// import { removeSellerPlacesFromStore } from "../../../../redux/reducers/places";

interface Props {
  id: number;
  place_id: number;
}

const DeleteRoom: FC<Props> = ({ id,place_id }) => {
    const dispatch = useAppDispatch();

  const handleDelete = async () => {
    // try {
    //   await api.delete(`/rooms/${id}`);

    //   //   dispatch(removeSellerPlacesFromStore(id));
    //   message.success("Successfully Deleted!");
    // } catch (err: any) {
    //   message.error(err.response.data?.message);
    // }
    await dispatch(deleteRoom(id));
    dispatch(getPlaceRooms(place_id));
  };

  return <DeleteButton onClick={handleDelete} />;
};

export default DeleteRoom;
