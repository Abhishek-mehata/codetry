// export default ListingPage;
import { useEffect, useState } from "react";
import { TableColumnsType, Table, Input } from "antd";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Button , Loader} from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { getPlaces } from "../../../redux/actions/places";
import { Place } from "../../../types/places";
import DeletePlace from "./Delete/DeletePlace";
import BoostPlaceModal from "./BoostPlaceModal"; // ✅ Import Boost Modal
import VerifyPlaceModal from "./VerifyPlaceModal";

const AdminStaysPage: FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [boostPlaceId, setBoostPlaceId] = useState<string | null>(null);
  const [verifyPlaceId, setVerifyPlaceId] = useState<string | null>(null);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verifyDefaultMsg, setVerifyDefaultMsg] = useState<string>("");
  const [verifyPlaceInitial, setVerifyPlaceInitial] = useState(true);
  const [searchTitle, setSearchTitle] = useState(""); // <-- Add search state
  
  const openBoostModal = (id: string) => setBoostPlaceId(id);
  const closeBoostModal = () => setBoostPlaceId(null);
  const openVerifyModal = (id: string, defaultMsg?: string, initialIsVerified: boolean = true) => {
    setVerifyPlaceId(id);
    setVerifyDefaultMsg(defaultMsg || "");
    setVerifyPlaceInitial(initialIsVerified);
    setVerifyModalOpen(true);
  };
  const closeVerifyModal = () => {
    setVerifyPlaceId(null);
    setVerifyModalOpen(false);
  };
  const handleVerified = () => {
    dispatch(getPlaces());
  };
  console.log(localStorage.getItem("admin-token"), "This is the thing......");

  useEffect(() => {
    if(!places.length){
      dispatch(getPlaces());
    }
  }, [dispatch]);

  const { places, loadingLatestPlaces } = useAppSelector((state: RootAppState) => state.places);
  console.log(loadingLatestPlaces, "Loading Latest Places Here")


  const data: Place[] = places?.map((place, i) => ({
    key: i.toString(),
    ...place,
  }));

  // Filter stays by searchTitle (case-insensitive)
  const filteredData = data.filter(place =>
    place.title?.toLowerCase().includes(searchTitle.toLowerCase())
  );

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
      title: "Verify",
      dataIndex: "verificationStatus",
      render: (_: unknown, record: Place) => (
        record.isVerified ? (
          <Button
            title="Verified"
            variant="filled"
            className="bg-success text-white border-none hover:text-white"
            onClick={() => openVerifyModal(record.id.toString(), "", false)}
          />
        ) : (
          <Button
            title="Verify"
            variant="outline"
            onClick={() => openVerifyModal(record.id.toString(), "", true)}
          />
        )
      )
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

  if(loadingLatestPlaces){
    return <Loader loading={loadingLatestPlaces}/>;
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl text-dark-blue font-semibold">
          {`${data?.length || 0} Stays`}
        </h1>
        <div className="flex gap-4 items-stretch">
          <Input
            placeholder="Search by title"
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
            className="w-[200px] border border-primary"
            allowClear
          />
          {/* <Button
            title="Add Stays"
            variant="filled"
            onClick={() => navigate(`/admin/stays/create`)}
          /> */}
        </div>
      </div>

      <div className="mt-6">
          <Table
            columns={columns}
            dataSource={filteredData}
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
      
      {/* Verify Modal */}
      <VerifyPlaceModal
        placeId={verifyPlaceId || ""}
        isOpen={verifyModalOpen}
        onClose={closeVerifyModal}
        onVerified={handleVerified}
        defaultMessage={verifyDefaultMsg}
        initialIsVerified={verifyPlaceInitial}
      />
    </div>
  );
};

export default AdminStaysPage;
