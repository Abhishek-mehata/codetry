/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useAppDispatch } from "../../../../hooks/useTypedSelectors";
import { DeleteButton } from "../../../../components";
import { deleteEvent, getAllHostedEvents } from "../../../../redux/actions/events";

interface Props {
  id: number;
}

const DeleteEvent: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(deleteEvent(id));
    dispatch(getAllHostedEvents());
  };

  return <DeleteButton onClick={handleDelete} />;
};

export default DeleteEvent;
