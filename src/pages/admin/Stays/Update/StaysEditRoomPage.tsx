 
// import { FC } from "react";
// import { AddUpdateRoom } from "../../../../components";
// import { useParams } from "react-router";
// import { useAppSelector } from "../../../../hooks/useTypedSelectors";
// import { RootAppState } from "../../../../redux/store";

// const StaysEditRoomPage: FC = () => {
//   const { id: placeId, editId: roomId } = useParams();
//   const { rooms } = useAppSelector((state: RootAppState) => state.places);
//   const room = rooms?.find(
//     ({ id, place_id }) => id === Number(roomId) && place_id === Number(placeId)
//   );

//   // return <AddUpdateRoom method="update" data={room} roomId={Number(roomId)} />;
//   return <AddUpdateRoom method="update" data={room} roomId={Number(roomId)} />;
// };

// export default StaysEditRoomPage;



import { FC } from "react";
import { AddUpdateRoom } from "../../../../components";
import { useParams } from "react-router";
import { useAppSelector } from "../../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../../redux/store";



const StaysEditRoomPage: FC = () => {
  const { id: placeId, editId: roomId } = useParams();

  const { rooms } = useAppSelector((state: RootAppState) => state.places);

  const room = rooms?.find(
    ({ id, place_id }) => id === Number(roomId) && place_id === Number(placeId)
  );

  if (!room || !roomId) {
    return <div>Room not found</div>; // Handle case when room or roomId is invalid
  }

  return <AddUpdateRoom  />;
};

export default StaysEditRoomPage;
