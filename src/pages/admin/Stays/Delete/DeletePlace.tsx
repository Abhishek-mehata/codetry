/* eslint-disable @typescript-eslint/no-explicit-any */

import { message } from "antd";
import { FC } from "react";
import api from "../../../../api";
import { useAppDispatch } from "../../../../hooks/useTypedSelectors";
import { DeleteButton } from "../../../../components";
import { removeSellerPlacesFromStore } from "../../../../redux/reducers/places";
import { getPlaces } from "../../../../redux/actions/places";

interface Props {
  id: number;
}

const DeletePlace: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await api.delete(`/places/${id}`);

      dispatch(removeSellerPlacesFromStore(id));
      message.success("Successfully Deleted!");
    } catch (err: any) {
      message.error(err.response.data?.message);
    } finally {
      dispatch(getPlaces());
    }
  };

  return <DeleteButton onClick={handleDelete} />;
};

export default DeletePlace;
