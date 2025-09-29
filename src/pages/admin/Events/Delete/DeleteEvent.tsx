/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useAppDispatch } from "../../../../hooks/useTypedSelectors";
import { DeleteButton } from "../../../../components";
import { deleteEvent } from "../../../../redux/actions/events";

interface Props {
  id: number;
}

const DeleteEvent: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(deleteEvent(id));
  };

  return <DeleteButton onClick={handleDelete} />;
};

export default DeleteEvent;
