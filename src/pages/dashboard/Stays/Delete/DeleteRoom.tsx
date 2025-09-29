/* eslint-disable @typescript-eslint/no-explicit-any */

import { message } from "antd";
import { FC } from "react";
import api from "../../../../api";
import { useAppDispatch } from "../../../../hooks/useTypedSelectors";
import { DeleteButton } from "../../../../components";
import { getPlaceRooms } from "../../../../redux/actions/places";

interface Props {
  placeId?: number;
  roomId: number;
}

const DeleteRoom: FC<Props> = ({ placeId, roomId }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await api.delete(`/rooms/${roomId}`);
      message.success("Successfully Deleted!");
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
    if (typeof placeId === "number") {
      dispatch(getPlaceRooms(placeId));
    }
  };

  return <DeleteButton onClick={handleDelete} />;
};

export default DeleteRoom;
