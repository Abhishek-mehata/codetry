// export default ListingPage;
import { useEffect, useMemo, useState } from "react";
import { TableColumnsType, Table, Input } from "antd";
import { FC } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Loader } from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { getSellerPlaces } from "../../../redux/actions/places";
import { Place } from "../../../types/places";
import DeletePlace from "./Delete/DeletePlace";
import BoostPlaceModal from "./BoostPlaceModal"; // ✅ Import Boost Modal
import PlaceVerificationModal from "./PlaceVerificationModal";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const ListingPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootAppState) => state.auth);
  const [boostPlaceId, setBoostPlaceId] = useState<string | null>(null);
  const [verificationModal, setVerificationModal] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const openBoostModal = (id: string) => setBoostPlaceId(id);
  const closeBoostModal = () => setBoostPlaceId(null);
  const { sellerPlaces, loadingLatestPlaces } = useAppSelector((state: RootAppState) => state.places);
  const [searchTitle, setSearchTitle] = useState(""); // <-- Add search state

  useEffect(() => {
    if (!sellerPlaces.length && user.id) {
      dispatch(getSellerPlaces(user.id));
    }
  }, [dispatch, user]);

  const data: Place[] = useMemo(() => {
    return sellerPlaces?.map((place, i) => ({
      key: i.toString(),
      ...place,
    })) || [];
  }, [sellerPlaces]);

  // Filter stays by searchTitle (case-insensitive)
  const filteredData = data.filter(place =>
    place.title?.toLowerCase().includes(searchTitle.toLowerCase())
  );


  const columns: TableColumnsType<Place> = [
    {
      title: "Image",
      dataIndex: "cover_image",
      render: (_, record: Place) => {
        const imageUrl = record.cover_image?.url || record.images?.[0]?.url;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt={record.title || "Cover Image"}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "5px" }}
          />
        ) : (
          "No Image"
        );
      },
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
      title: "Verification",
      dataIndex: "verification",
      render: (_: unknown, record: Place) => (
        <span
          className={`text-base border-b font-normal cursor-pointer ${record.isVerified ? "text-green-600" : "text-red-600"}`}
          onClick={() => setVerificationModal({ open: true, message: record.message || "No message" })}
        >
          {record.isVerified ? "Verified" : "Not Verified"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, { id, isBoosted }: Place) =>
        id && (
          <div className="flex gap-2 items-center  p-1">
            <DeletePlace id={id} />
            <Link to={`/app/stays/edit/${id}`}>
              <FiEdit className="text-primary text-base" />
            </Link>
            <Button
              className="hidden"
              title={isBoosted ? "Boosted" : "Boost"}
              disabled={isBoosted}
              onClick={() => !isBoosted && openBoostModal(id.toString())}
            />
          </div>
        ),
    },
  ];

  if (loadingLatestPlaces) {
    return <Loader loading={loadingLatestPlaces} />
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full flex-wrap">
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
          <Button
            title="Add Stays"
            variant="filled"
            onClick={() => navigate(`/app/stays/create`)}
          />
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

      {/* Verification Modal */}
      <PlaceVerificationModal
        isOpen={verificationModal.open}
        onClose={() => setVerificationModal({ open: false, message: "" })}
        message={verificationModal.message}
      />
    </div>
  );
};

export default ListingPage;
