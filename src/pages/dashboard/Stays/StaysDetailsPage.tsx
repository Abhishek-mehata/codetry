// import { FC, ReactNode, useEffect, useState } from "react";
// import { Button, DashboardInput } from "../../../components";
// import { Divider } from "antd";
// import { GoDotFill } from "react-icons/go";
// import { useNavigate, useParams } from "react-router";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../hooks/useTypedSelectors";
// import { RootAppState } from "../../../redux/store";
// import { getPlaceRooms } from "../../../redux/actions/places";
// import TextArea from "antd/es/input/TextArea";

// const Tab: FC<{ children: ReactNode; className?: string }> = ({
//   children,
//   className,
// }) => (
//   <div className={`bg-white p-6 rounded shadow-md ${className}`}>
//     {children}
//   </div>
// );

// const StaysDetailsPage: FC = () => {
//   const dispatch = useAppDispatch();
//   const { id: placeId } = useParams();
//   const navigate = useNavigate();
//   const [editState, setEditState] = useState<{
//     title: string;
//     children: ReactNode;
//     description: string;
//   }>({
//     title: "",
//     children: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (placeId) {
//       dispatch(getPlaceRooms(Number(placeId)));
//     }
//   }, []);

//   const { places, rooms: placeRooms } = useAppSelector(
//     (state: RootAppState) => state.places
//   );
//   const place = places?.find(({ id }) => id === Number(placeId));
//   const rooms = placeRooms?.filter(
//     ({ place_id }) => place_id.toString() === placeId
//   );

//   const onChangeHandler = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     setEditState({
//       ...editState,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <div className={`flex items-center justify-between`}>
//         <h2 className={`text-3xl text-dark-blue font-medium`}>
//           {place?.title}
//         </h2>
//         <div className={`flex justify-between items-center gap-8`}>
//           <div className={`flex justify-between items-center gap-1`}>
//             <GoDotFill className={`text-green-700 text-xl`} />
//             <h5 className={`text-dark-blue underline underline-offset-2`}>
//               Listed
//             </h5>
//           </div>
//           <Button title={`Update Stays`} variant="filled" />
//         </div>
//       </div>
//       <div className={`flex gap-4 mt-6 items-start justify-center w-full`}>
//         {/* Stays Details */}
//         <Tab className={`flex flex-col gap-6 w-full`}>
//           <h2 className={`text-dark-blue text-xl font-semibold`}>
//             Stays basics
//           </h2>
//           <div
//             className={`flex flex-col gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}
//           >
//             <div className={`flex items-center gap-4`}>
//               <DashboardInput
//                 title={`Title`}
//                 value={place?.title}
//                 subTitle={`Make it short and clear. It will appear on search results.`}
//                 placeholder="exp: Romantic Spanish villa - 5 min from the beach"
//                 onChange={onChangeHandler}
//               />
//               <DashboardInput
//                 title={`Sub Title`}
//                 value={place?.subtitle}
//                 subTitle={`Make it shorter and clear.`}
//                 placeholder="exp: Romantic Spanish villa"
//                 onChange={onChangeHandler}
//               />
//             </div>
//             <TextArea
//               title={`Description`}
//               // input="textarea"
//               minLength={400}
//               maxLength={800}
//               value={place?.description}
//               // subTitle={`Describe what makes your space unique.`}
//               placeholder="exp: Romantic Spanish villa - 5 min from the beach"
//               onChange={onChangeHandler}
//             />
//           </div>
//           <Divider className={`h-0.2 w-full bg-light-gray my-2`} />
//           <h2 className={`text-dark-blue text-xl font-semibold`}>Location</h2>
//           <div
//             className={`grid grid-rows-1 grid-cols-3 gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}
//           >
//             <DashboardInput
//               name={`country`}
//               title="Country"
//               placeholder="Enter Country"
//               value={String(place?.country)}
//               onChange={onChangeHandler}
//             />
//             <DashboardInput
//               name={`city`}
//               title="City"
//               placeholder="Enter City"
//               value={String(place?.city)}
//               onChange={onChangeHandler}
//             />
//             <DashboardInput
//               name={`street`}
//               onChange={onChangeHandler}
//               title="Street"
//               placeholder="Enter street"
//               value={String(place?.street)}
//             />
//             <DashboardInput
//               name={`province`}
//               title="Province"
//               placeholder="Enter province"
//               value={String(place?.province)}
//               onChange={onChangeHandler}
//             />
//             <DashboardInput
//               name={`postal_code`}
//               title="Postal code"
//               placeholder="Enter postal code"
//               value={String(place?.postal_code)}
//               onChange={onChangeHandler}
//             />
//             <div className={`flex gap-2`}>
//               <DashboardInput
//                 name={`latitude`}
//                 title="Latitude"
//                 onChange={onChangeHandler}
//                 placeholder="Enter latitude"
//                 value={String(place?.latitude)}
//               />
//               <DashboardInput
//                 name={`longitude`}
//                 title="Longitude"
//                 onChange={onChangeHandler}
//                 placeholder="Enter longitude"
//                 value={String(place?.longitude)}
//               />
//             </div>
//           </div>
//           <Divider className={`h-0.2 w-full bg-light-gray my-2`} />
//           <h2 className={`text-dark-blue text-xl font-semibold`}>
//             Room Packages
//           </h2>
//           <div className={`w-full`}>
//             <div className={`flex gap-4 items-start justify-between w-full`}>
//               <div
//                 className={`flex flex-col gap-2 items-start justify-between w-full`}
//               >
//                 {rooms?.map((item, i) => (
//                   <div
//                     key={i}
//                     className={`flex gap-12 items-center justify-between w-full`}
//                   >
//                     <h3
//                       className={`text-gray font-semibold truncate w-60`}
//                       key={i}
//                     >
//                       {item.title}
//                     </h3>
//                     <h5 className={`text-gray truncate w-60`} key={i}>
//                       {item.room_type}
//                     </h5>
//                     <div className={`flex text-start gap-2 w-60`}>
//                       {item?.beds.map(({ bed_type, amount }, i) => (
//                         <div key={i}>
//                           <h4
//                             className={`text-sm text-gray font-normal capitalize`}
//                           >
//                             {`${amount} ${bed_type}`}
//                             {i !== item?.beds.length - 1 && <span>{`,`}</span>}
//                           </h4>
//                         </div>
//                       ))}
//                     </div>
//                     <h5 className={`text-gray truncate w-60`} key={i}>
//                       {`$${item.price}.00`}
//                     </h5>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 type="button"
//                 onClick={() => navigate(`/app/stays/${placeId}/rooms`)}
//                 className={`flex gap-2 itesm-center text-dark-blue underline underline-offset-2 font-medium`}
//               >
//                 {rooms.length === 0 ? `Add` : `Edit`}
//                 <MdOutlineKeyboardArrowRight className={`text-2xl`} />
//               </button>
//             </div>
//           </div>
//         </Tab>
//       </div>
//     </div>
//   );
// };

// export default StaysDetailsPage;



// // import React from 'react'

// // const StaysDetailsPage = () => {
// //   return (
// //     <div>StaysDetailsPage</div>
// //   )
// // }

// // export default StaysDetailsPage


import { FC, ReactNode, useEffect, useState, ChangeEvent } from "react";
import { Button, DashboardInput } from "../../../components";
import { Divider } from "antd";
import { GoDotFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { getPlaceRooms } from "../../../redux/actions/places";
import TextArea from "antd/es/input/TextArea";

interface Bed {
  bed_type: string;
  amount: number;
}

interface Room {
  title: string;
  room_type: string;
  beds: Bed[];
  price: number;
  place_id: number;
}

interface Place {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  country?: string;
  city?: string;
  street?: string;
  province?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

const Tab: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`bg-white p-6 rounded shadow-md ${className}`}>
    {children}
  </div>
);

const StaysDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id: placeId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [editState, setEditState] = useState<{
    title: string;
    children: ReactNode;
    description: string;
  }>({
    title: "",
    children: "",
    description: "",
  });

  console.log(editState);

  useEffect(() => {
    if (placeId) {
      dispatch(getPlaceRooms(Number(placeId)));
    }
  }, [dispatch, placeId]);

  const { places, rooms: placeRooms } = useAppSelector(
    (state: RootAppState) => state.places
  );

  const place: Place | undefined = places?.find(({ id }) => id === Number(placeId));
  const rooms: Room[] | undefined = placeRooms?.filter(
    ({ place_id }) => place_id.toString() === placeId
  );

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl text-dark-blue font-medium">{place?.title}</h2>
        <div className="flex justify-between items-center gap-8">
          <div className="flex justify-between items-center gap-1">
            <GoDotFill className="text-green-700 text-xl" />
            <h5 className="text-dark-blue underline underline-offset-2">
              Listed
            </h5>
          </div>
          <Button title="Update Stays" variant="filled" />
        </div>
      </div>

      <div className="flex gap-4 mt-6 items-start justify-center w-full">
        {/* Stays Details */}
        <Tab className="flex flex-col gap-6 w-full">
          <h2 className="text-dark-blue text-xl font-semibold">Stays basics</h2>

          <div className="flex flex-col gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full">
            <div className="flex items-center gap-4">
              <DashboardInput
                title="Title"
                value={place?.title || ""}
                subTitle="Make it short and clear. It will appear on search results."
                placeholder="exp: Romantic Spanish villa - 5 min from the beach"
                onChange={onChangeHandler}
              />
              <DashboardInput
                title="Sub Title"
                value={place?.subtitle || ""}
                subTitle="Make it shorter and clear."
                placeholder="exp: Romantic Spanish villa"
                onChange={onChangeHandler}
              />
            </div>

            <TextArea
              title="Description"
              minLength={400}
              maxLength={800}
              value={place?.description || ""}
              placeholder="exp: Romantic Spanish villa - 5 min from the beach"
              onChange={onChangeHandler}
            />
          </div>

          <Divider className="h-0.2 w-full bg-light-gray my-2" />

          <h2 className="text-dark-blue text-xl font-semibold">Location</h2>

          <div className="grid grid-rows-1 grid-cols-3 gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full">
            <DashboardInput
              name="country"
              title="Country"
              placeholder="Enter Country"
              value={place?.country || ""}
              onChange={onChangeHandler}
            />
            <DashboardInput
              name="city"
              title="City"
              placeholder="Enter City"
              value={place?.city || ""}
              onChange={onChangeHandler}
            />
            <DashboardInput
              name="street"
              title="Street"
              placeholder="Enter street"
              value={place?.street || ""}
              onChange={onChangeHandler}
            />
            <DashboardInput
              name="province"
              title="Province"
              placeholder="Enter province"
              value={place?.province || ""}
              onChange={onChangeHandler}
            />
            <DashboardInput
              name="postal_code"
              title="Postal code"
              placeholder="Enter postal code"
              value={place?.postal_code || ""}
              onChange={onChangeHandler}
            />
            <div className="flex gap-2">
              <DashboardInput
                name="latitude"
                title="Latitude"
                placeholder="Enter latitude"
                value={place?.latitude?.toString() || ""}
                onChange={onChangeHandler}
              />
              <DashboardInput
                name="longitude"
                title="Longitude"
                placeholder="Enter longitude"
                value={place?.longitude?.toString() || ""}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <Divider className="h-0.2 w-full bg-light-gray my-2" />

          <h2 className="text-dark-blue text-xl font-semibold">Room Packages</h2>

          <div className="w-full">
            <div className="flex gap-4 items-start justify-between w-full">
              <div className="flex flex-col gap-2 items-start justify-between w-full">
                {rooms?.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-12 items-center justify-between w-full"
                  >
                    <h3 className="text-gray font-semibold truncate w-60">{item.title}</h3>
                    <h5 className="text-gray truncate w-60">{item.room_type}</h5>
                    <div className="flex text-start gap-2 w-60">
                      {item?.beds.map(({ bed_type, amount }, idx) => (
                        <div key={idx}>
                          <h4 className="text-sm text-gray font-normal capitalize">
                            {`${amount} ${bed_type}`}
                            {idx !== item?.beds.length - 1 && <span>,</span>}
                          </h4>
                        </div>
                      ))}
                    </div>
                    <h5 className="text-gray truncate w-60">
                      {`$${item.price}.00`}
                    </h5>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate(`/app/stays/${placeId}/rooms`)}
                className="flex gap-2 items-center text-dark-blue underline underline-offset-2 font-medium"
              >
                {rooms && rooms.length === 0 ? `Add` : `Edit`}
                <MdOutlineKeyboardArrowRight className="text-2xl" />
              </button>
            </div>
          </div>
        </Tab>
      </div>
    </div>
  );
};

export default StaysDetailsPage;
