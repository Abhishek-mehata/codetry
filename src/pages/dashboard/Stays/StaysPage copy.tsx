// import { TableColumnsType, Table } from "antd";
// import { FC } from "react";
// // import { IoIosSearch } from "react-icons/io";
// import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
// // import { Svg } from "../../../assets";
// import { Button } from "../../../components";
// import { useAppSelector } from "../../../hooks/useTypedSelectors";
// import { RootAppState } from "../../../redux/store";
// import { Place } from "../../../types/places";
// import DeletePlace from "./Delete/DeletePlace";

// const columns: TableColumnsType<Place> = [
//   {
//     title: "Listing",
//     dataIndex: "title",
//     render: (text: string, record: Place) => (
//       <NavLink to={`/app/stays/${record.id}/details`}>{text}</NavLink>
//     ),
//   },
//   {
//     title: "Status",
//     dataIndex: "listing_status",
//     render: (listingStatus: "ACTIVE" | "INACTIVE") =>
//       listingStatus === "ACTIVE" ? "Active" : "Inactive",
//   },
//   {
//     title: "Location",
//     dataIndex: "city",
//     render: (city: string, record: Place) => `${city}, ${record.country}`,
//   },
//   {
//     title: "Business Nature",
//     dataIndex: "businessNature",
//   },
//   {
//     title: "Subtitle",
//     dataIndex: "subtitle",
//   },
//   {
//     title: "Actions",
//     dataIndex: "actions",
//     render: (_, { id }: Place) => {
//       if (id) {
//         return <DeletePlace id={id} />;
//       }
//     },
//   },
// ];

// const ListingPage: FC = () => {
//   const navigate = useNavigate();
//   const { sellerPlaces } = useAppSelector(
//     (state: RootAppState) => state.places
//   );

//   const data: Place[] = sellerPlaces?.map((place, i) => ({
//     key: i.toString(),
//     ...place,
//   }));

//   return (
//     <div className={``}>
//       <div className={`flex items-center justify-between w-full`}>
//         <h1 className={`text-2xl text-dark-blue font-semibold`}>{`${
//           data?.length || 0
//         } Stays`}</h1>
//         <Button
//           title="Add Stays"
//           variant="filled"
//           onClick={() => navigate(`/app/stays/create`)}
//         />
//       </div>

//       {/* <div>
//         <div className={`flex flex-wrap gap-4 md:gap-6 my-6`}>
//           <div
//             className={`flex gap-2 p-2 items-center border border-gray rounded w-80`}
//           >
//             <IoIosSearch className={`text-xl text-gray`} />
//             <Input
//               placeholder="Search"
//               variant="borderless"
//               className={`p-0`}
//             />
//           </div>

//           <div
//             className={`flex gap-2 items-center justify-center p-2 px-6 border border-primary rounded-3xl`}
//           >
//             <img src={Svg.filter} className={`w-4`} alt="filter icon" />
//             <h4 className={`text-gray text-sm`}>Filters</h4>
//           </div>

//           <div
//             className={`flex gap-2 items-center justify-center p-2 px-6 border border-primary rounded-3xl`}
//           >
//             <h4 className={`text-gray text-sm`}>Popular</h4>
//             <img
//               src={Svg.arrowBottom_2}
//               className={`w-4`}
//               alt="arrow bottom side icon"
//             />
//           </div>

//           <div
//             className={`flex gap-2 items-center justify-center p-2 px-6 border border-primary rounded-3xl`}
//           >
//             <h4 className={`text-gray text-sm`}>Price</h4>
//             <img
//               src={Svg.arrowBottom_2}
//               className={`w-4`}
//               alt="arrow bottom side icon"
//             />
//           </div>

//           <div
//             className={`flex gap-2 items-center justify-center p-2 px-6 border border-primary rounded-3xl`}
//           >
//             <h4 className={`text-gray text-sm`}>Rooms & Spaces</h4>
//             <img
//               src={Svg.arrowBottom_2}
//               className={`w-4`}
//               alt="arrow bottom side icon"
//             />
//           </div>
//         </div>
//       </div> */}
//       <div className={`mt-6`}>
//         <Table
//           columns={columns}
//           dataSource={data}
//           style={{
//             backgroundColor: `transparent`,
//           }}
//           className={`bg-none`}
//         />
//       </div>
//     </div>
//   );
// };

// export default ListingPage;
// import { useEffect } from "react";
// import { TableColumnsType, Table } from "antd";
// import { FC } from "react";
// import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
// import { Button } from "../../../components";
// import { useAppSelector, useAppDispatch } from "../../../hooks/useTypedSelectors";
// import { RootAppState } from "../../../redux/store";
// import { getPlaces } from "../../../redux/actions/places"; //  Import API call
// import { Place } from "../../../types/places";
// import DeletePlace from "./Delete/DeletePlace";

// // const columns: TableColumnsType<Place> = [
// //   {
    
// //     title: "Listing",
// //     dataIndex: "title",
// //     render: (text: string, record: Place) => (
// //       <NavLink to={`/app/stays/${record.id}/details`}>{text}</NavLink>
// //     ),
// //   },
// //   {
// //     title: "Status",
// //     dataIndex: "listing_status",
// //     render: (listingStatus: "ACTIVE" | "INACTIVE") =>
// //       listingStatus === "ACTIVE" ? "Active" : "Inactive",
// //   },
// //   {
// //     title: "Location",
// //     dataIndex: "city",
// //     render: (city: string, record: Place) => `${city}, ${record.country}`,
// //   },
// //   {
// //     title: "Business Nature",
// //     dataIndex: "businessNature",
// //   },
// //   {
// //     title: "Subtitle",
// //     dataIndex: "subtitle",
// //   },
// //   {
// //     title: "Actions",
// //     dataIndex: "actions",
// //     render: (_, { id }: Place) => {
// //       if (id) {
// //         return <DeletePlace id={id} />;
// //       }
// //     },
// //   },
// // ];
// const columns: TableColumnsType<Place> = [
//   {
//     title: "Image",
//     dataIndex: "cover_image",
//     render: (_, record: Place) =>
//       record.cover_image && record.cover_image.url ? (
//         <img
//           src={record.cover_image.url} // Use URL from cover_image
//           alt={record.title || "Cover Image"}
//           width={50}
//           height={50}
//           style={{ objectFit: "cover", borderRadius: "5px" }}
//         />
//       ) : (
//         "No Image"
//       ),
//   },
//   {
//     title: "Listing",
//     dataIndex: "title",
//     render: (text: string, record: Place) => (
//       <NavLink to={`/app/stays/${record.id}/details`}>{text}</NavLink>
//     ),
//   },
//   {
//     title: "Status",
//     dataIndex: "listing_status",
//     render: (listingStatus: "ACTIVE" | "INACTIVE") =>
//       listingStatus === "ACTIVE" ? "Active" : "Inactive",
//   },
//   {
//     title: "Location",
//     dataIndex: "city",
//     render: (city: string, record: Place) => `${city}, ${record.country}`,
//   },
//   {
//     title: "Business Nature",
//     dataIndex: "businessNature",
//   },
//   {
//     title: "Subtitle",
//     dataIndex: "subtitle",
//   },
//   {
//     title: "Actions",
//     dataIndex: "actions",
//     render: (_, { id }: Place) => id && <DeletePlace id={id} />,
//   },
  
// ];
// const ListingPage: FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch(); // Get dispatch
//   const { sellerPlaces } = useAppSelector((state: RootAppState) => state.places);
//   console.log("sellerPlaces:", sellerPlaces); // Debugging output

//   //  Fetch places when component mounts
//   useEffect(() => {
//     dispatch(getPlaces());
//   }, [dispatch]);

//   const data: Place[] = sellerPlaces?.map((place, i) => ({
//     key: i.toString(),
//     ...place,
//   }));

//   return (
//     <div>
//       <div className="flex items-center justify-between w-full">
//         <h1 className="text-2xl text-dark-blue font-semibold">{`${data?.length || 0} Stays`}</h1>
//         <Button title="Add Stays" variant="filled" onClick={() => navigate(`/app/stays/create`)} />
//       </div>

//       <div className="mt-6">
//         <Table
//           columns={columns}
//           dataSource={data}
//           style={{ backgroundColor: "transparent" }}
//           className="bg-none"
//         />
//       </div>
//     </div>
//   );
// };

// export default ListingPage;
import { useEffect, useState } from "react";
import { TableColumnsType, Table } from "antd";
import { FC } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { getPlaces } from "../../../redux/actions/places";
import { Place } from "../../../types/places";
import DeletePlace from "./Delete/DeletePlace";
import BoostPlaceModal from "./BoostPlaceModal"; // ✅ Import Boost Modal

const ListingPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [boostPlaceId, setBoostPlaceId] = useState<string | null>(null);
  const openBoostModal = (id: string) => setBoostPlaceId(id);
  const closeBoostModal = () => setBoostPlaceId(null);

  const { sellerPlaces } = useAppSelector((state: RootAppState) => state.places);

  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);

  const data: Place[] = sellerPlaces?.map((place, i) => ({
    key: i.toString(),
    ...place,
  }));

  const columns: TableColumnsType<Place> = [
    {
      title: "Image",
      dataIndex: "cover_image",
      render: (_, record: Place) =>
        record.cover_image?.url ? (
          <img
            src={record.cover_image.url}
            alt={record.title || "Cover Image"}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "5px" }}
            />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Listing",
      dataIndex: "title",
      render: (text: string, record: Place) => (
        <NavLink to={`/stays/${record.id}`}>{text}</NavLink>
      ),
    },
    {
      title: "Status",
      dataIndex: "listing_status",
      render: (listingStatus: "ACTIVE" | "INACTIVE") =>
        listingStatus === "ACTIVE" ? "Active" : "Inactive",
    },
    {
      title: "Location",
      dataIndex: "city",
      render: (city: string, record: Place) => `${city}, ${record.country}`,
    },
    {
      title: "Business Nature",
      dataIndex: "businessNature",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, { id, isBoosted }: Place) =>
        id && (
          <div className="flex gap-2 ">
            <DeletePlace id={id} />
            <Button
              title={isBoosted ? "Boosted" : "Boost"}
              disabled={isBoosted} // optional: disable the button if already boosted
              onClick={() => !isBoosted && openBoostModal(id.toString())}
            />
          </div>
        ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl text-dark-blue font-semibold">
          {`${data?.length || 0} Stays`}
        </h1>
        <Button
          title="Add Stays"
          variant="filled"
          onClick={() => navigate(`/app/stays/create`)}
        />
      </div>

      <div className="mt-6">
        <Table
          columns={columns}
          dataSource={data}
          style={{
            backgroundColor: "transparent",

          }}
        />
      </div>

      {/* Boost Modal */}
      {/* {boostPlaceId && ( */}
      <BoostPlaceModal
        isOpen={!!boostPlaceId}
        placeId={boostPlaceId?.toString() || ""}
        onClose={closeBoostModal}
      />
      {/* )} */}
    </div>
  );
};

export default ListingPage;
