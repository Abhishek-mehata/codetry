/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { TableColumnsType, Table, Dropdown, Input } from "antd";
import type { MenuProps } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { EventModel } from "../../../types/event";
import { useAppSelector, useAppDispatch } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import DeleteEvent from "../Events/Delete/DeleteEvent";
import { getAllHostedEvents, updateEventStatus } from "../../../redux/actions/events"; // Fetch events
// import api from "../../../api";
import BoostEventModal from "./BoostEventModal";
import EventVerificationModal from "./EventVerificationModal";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

const items = [
  { label: "All", key: "all" },
  { label: "Online", key: "online" },
  { label: "Onsite", key: "onsite" },
];

const EventsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [boostEventId, setBoostEventId] = useState<string | null>(null);
  const [verificationModal, setVerificationModal] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const [searchName, setSearchName] = useState(""); // <-- Add search state

  const openBoostModal = (id: string) => setBoostEventId(id);
  const closeBoostModal = () => setBoostEventId(null);
  // Get events from Redux
  const { hosted, loadingLatestEvents } = useAppSelector((state: RootAppState) => state.events);
  console.log(loadingLatestEvents, hosted, "loadingLatestEvents");
  const {
    user: { id: userId },
  } = useAppSelector((state: RootAppState) => state.auth);
  const [selectEvent, setSelectEvent] = useState<string>("all");
  useEffect(() => {
    dispatch(getAllHostedEvents()); // Fetch all events when page loads
  }, [dispatch]);
  const columns: TableColumnsType<EventModel> = [
    {
      title: "Image",
      dataIndex: "files",
      render: (data) =>
        data?.length ? (
          <img src={data[0].url} alt={data[0].original_name} width={50} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: EventModel) => (
        <NavLink to={`/events/${record.id} `}>{text}</NavLink>
      ),
    },
    { title: "Category", dataIndex: "category" },
        { 
      title: "Status", 
      dataIndex: "status",
      render: (status: string, record: EventModel) => {
        const statusOptions = [
          { label: "Pending", value: "PENDING" },
          { label: "On Going", value: "ON_GOING" },
          { label: "Completed", value: "COMPLETED" },
          { label: "Cancelled", value: "CANCELLED" },
        ];

        const handleStatusChange = async (newStatus: string) => {
          console.log('Status change requested:', record.id, newStatus);
          const success = await dispatch(updateEventStatus(record.id.toString(), newStatus));
          if (success) {
            // Force refresh the events list to ensure UI updates
            dispatch(getAllHostedEvents());
          }
        };

        // Get status color based on status value
        const getStatusColor = (statusValue: string) => {
          switch (statusValue) {
            case "COMPLETED":
              return "#4dda63";
            case "ON_GOING":
            case "PENDING":
              return "#f4de19";
            case "CANCELLED":
              return "#e2445c";
            default:
              return "#6b7280"; // gray for unknown status
          }
        };

        const statusColor = getStatusColor(status);
        const statusLabel = statusOptions.find(option => option.value === status)?.label || status;

        return (
          <Dropdown
            menu={{
              items: statusOptions.map(option => ({
                key: option.value,
                label: option.label,
                onClick: () => handleStatusChange(option.value)
              }))
            }}
            trigger={["click"]}
          >
            <span className="cursor-pointer flex items-center gap-1 hover:opacity-80">
              <span style={{ color: statusColor, fontWeight: "500" }}>
                {statusLabel}
              </span>
              <IoIosArrowDown style={{ color: statusColor }} className="text-sm" />
            </span>
          </Dropdown>
        );
      }
    },
    { title: "Location", dataIndex: "location" },
    { title: "Business Nature", dataIndex: "businessNature" },
    { title: "Price", dataIndex: "price" },
    {
      title: "Verification",
      dataIndex: "verification",
      render: (_: any, record: EventModel) => (
        <span
          className={`text-base border-b font-normal cursor-pointer ${record.isVerified ? "text-[#4dda63]" : "text-[#e2445c]"}`}
          // style={{ color: record.isVerified ? "green" : "red", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setVerificationModal({ open: true, message: record.message || "No message" })}
        >
          {record.isVerified ? "Verified" : "Not Verified"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record: EventModel) => (
        <div className="flex gap-2">
          <button
          onClick={() => navigate(`/app/events/edit/${record.id}`)}
          type="button" className={`p-3 bg-white rounded-full`}>
            <FiEdit className={`text-primary text-base`} />
          </button>
          <DeleteEvent id={record.id} />
          {record.isBoosted ? (
            <Button
              title="Boosted"
              // variant="outlined"
              className="text-green-600 border-green-600 cursor-default hidden"
              disabled
            />
          ) : (
            <Button
            className="hidden"
              title="Boost"
              onClick={() => openBoostModal(record.id.toString())}
            />
          )}
        </div>
      ),
    },
  ];
  const onSelectEvent: MenuProps["onClick"] = ({ key }) => setSelectEvent(key);
  const data: any = hosted
    ?.filter(({ eventType, sellerId }: any) => {
      const matchesType = selectEvent === "all" || eventType === selectEvent.toUpperCase();
      return matchesType && sellerId === userId;
    })
    .map((item, i: number) => ({
      key: i.toString(),
      ...item,
    }));

  // Filter events by searchName (case-insensitive)
  const filteredData = data.filter((event: any) =>
    event.name?.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className=" w-full h-full">
      <div className={`flex items-center justify-between w-full flex-wrap`}>
        <h1 className={`text-lg md:text-2xl text-dark-blue font-semibold`}>{`${data?.length || 0
          } Events`}</h1>
        <div className="flex items-stretch justify-start md:justify-end gap-4 flex-wrap">
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["all"],
              onClick: onSelectEvent,
            }}
            trigger={["click"]}
          >
            <Button
              title={selectEvent}
              iconPlacement="right"
              icon={<MdKeyboardArrowDown />}
            />
          </Dropdown>
          <Input
            placeholder="Search by name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            className="w-[200px] border border-primary"
            allowClear
          />
          <Button
            title="Add Event"
            variant="filled"
            onClick={() => navigate("/app/events/create")}
          />
        </div>
      </div>
      <div className={`mt-6`}>
        <Table
          key={JSON.stringify(filteredData?.map((item: any) => item.id + item.status))} // Force re-render when status changes
          columns={columns}
          dataSource={filteredData}
          style={{
            backgroundColor: `transparent`,
          }}
          className={`bg-none`}
        />
      </div>
      <BoostEventModal
        eventId={boostEventId?.toString() || ""}
        isOpen={!!boostEventId}
        onClose={closeBoostModal}
      />
      <EventVerificationModal
        isOpen={verificationModal.open}
        onClose={() => setVerificationModal({ open: false, message: "" })}
        message={verificationModal.message}
      />
    </div>
  );
};

export default EventsPage;
