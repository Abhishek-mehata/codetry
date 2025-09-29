/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../../components";
import { TableColumnsType, Table, Dropdown, Modal, Input, Switch } from "antd";
import type { MenuProps } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { EventModel } from "../../../types/event";
import { useAppSelector, useAppDispatch } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import DeleteEvent from "../Events/Delete/DeleteEvent";
import { getAllAdminEvents, verifyEvent } from "../../../redux/actions/events";
import BoostEventModal from "./BoostEventModal";
import "../../../index.css";

const items = [
    { label: "All", key: "all" },
    { label: "Online", key: "online" },
    { label: "Onsite", key: "onsite" },
    { label: "Verified", key: "verified" },
    { label: "Unverified", key: "unverified" },
];

// VerifyEventModal component
const VerifyEventModal = ({ eventId, isOpen, onClose, onVerified, defaultMessage, initialIsVerified = true }: {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  defaultMessage?: string;
  initialIsVerified?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState(defaultMessage || "");
  const [isVerified, setIsVerified] = useState(initialIsVerified);

  useEffect(() => {
    setVerifyMessage(defaultMessage || "");
    setIsVerified(initialIsVerified);
  }, [defaultMessage, isOpen, initialIsVerified]);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const result = await verifyEvent(eventId, verifyMessage, isVerified);
      if (result.success) {
        onVerified();
        onClose();
      }
    } catch (err) {
      // Error message is handled in the action
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Verify Event"
      open={isOpen}
      onCancel={onClose}
      onOk={handleVerify}
      confirmLoading={loading}
      okText={isVerified ? "Verify" : "Unverify"}
      cancelText="Cancel"
    >
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Verified:</span>
        <Switch checked={isVerified} onChange={setIsVerified} />
      </div>
      <p>Are you sure you want to {isVerified ? "verify" : "unverify"} this event?</p>
      <Input.TextArea
        rows={3}
        value={verifyMessage}
        onChange={e => setVerifyMessage(e.target.value)}
      />
    </Modal>
  );
};

const EventsPage = () => {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const [boostEventId, setBoostEventId] = useState<string | null>(null);
    const [verifyEventId, setVerifyEventId] = useState<string | null>(null);
    const [verifyModalOpen, setVerifyModalOpen] = useState(false);
    const [verifyDefaultMsg, setVerifyDefaultMsg] = useState<string>("");
    const [verifyEventInitial, setVerifyEventInitial] = useState(true);
    const [selectEvent, setSelectEvent] = useState<string>("all");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchName, setSearchName] = useState(""); // <-- Add search state

    const openBoostModal = (id: string) => setBoostEventId(id);
    const closeBoostModal = () => setBoostEventId(null);
    const openVerifyModal = (id: string, defaultMsg?: string, initialIsVerified: boolean = true) => {
      setVerifyEventId(id);
      setVerifyDefaultMsg(defaultMsg || "");
      setVerifyEventInitial(initialIsVerified);
      setVerifyModalOpen(true);
    };
    const closeVerifyModal = () => {
      setVerifyEventId(null);
      setVerifyModalOpen(false);
    };
    const handleVerified = () => {
      dispatch(getAllAdminEvents(page, pageSize));
    };
    // Get admin events from Redux
    const { adminEvents = [], adminEventsPagination = {}, loadingLatestEvents } = useAppSelector((state: RootAppState) => state.events);
    // Map isVerified from raw event objects (API response)
    const mappedEvents = (adminEvents || []).map((event: any) => ({
      ...event,
      isVerified: event.isVerified,
      id: event.id?.toString?.() || String(event.id),
    }));
    const filteredEvents = mappedEvents.filter((event) => {
      if (selectEvent === "all") return true;
      if (selectEvent === "verified") return event.isVerified;
      if (selectEvent === "unverified") return !event.isVerified;
      return event.eventType?.toLowerCase() === selectEvent;
    })
    // Filter by search name (case-insensitive)
    .filter((event) =>
      event.name?.toLowerCase().includes(searchName.toLowerCase())
    );
    useEffect(() => {
        dispatch(getAllAdminEvents(page, pageSize)); // Fetch all admin events when page or pageSize changes
    }, [dispatch, page, pageSize]);

    const columns: TableColumnsType<any> = [
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
        { title: "Status", dataIndex: "status" },
        { title: "Location", dataIndex: "location" },
        { title: "Business Nature", dataIndex: "businessNature" },
        { title: "Price", dataIndex: "price" },
        { title: "Verify", dataIndex: "verificationStatus",
          render: (_: any, record: any) => (
            record.isVerified ? (
              <Button
                title="Verified"
                variant="filled"
                className="bg-success text-white border-none hover:text-success"
                onClick={() => openVerifyModal(record.id, "", false)}
              />
            ) : (
              <Button
                title="Verify"
                variant="outline"
                onClick={() => openVerifyModal(record.id, "", true)}
              />
            )
          )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record: EventModel) => (
                <div className="flex gap-2">
                    <DeleteEvent id={record.id} />
                    {record.isBoosted ? (
                        <Button
                            title="Boosted"
                            className="text-success border-success cursor-default"
                            disabled
                        />
                    ) : (
                        <Button
                            title="Boost"
                            onClick={() => openBoostModal(record.id.toString())}
                        />
                    )}
                </div>
            ),
        },
    ];
    const onSelectEvent: MenuProps["onClick"] = ({ key }) => setSelectEvent(key);
    return (
        <div className=" w-full h-full">
            <div className={`flex items-center justify-between w-full`}>
                <h1 className={`text-lg md:text-2xl text-dark-blue font-semibold`}>{`${adminEventsPagination.total || 0
                    } Events`}</h1>
                <div className="flex items-stretch justify-center gap-4">
                    <div className="flex gap-2">
                        <Dropdown
                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ["all"],
                                onClick: onSelectEvent,
                            }}
                            trigger={["click"]}
                        >
                            <span>
                                <Button
                                    title={selectEvent}
                                    iconPlacement="right"
                                    icon={<MdKeyboardArrowDown />}
                                />
                            </span>
                        </Dropdown>
                    </div>
                    {/* Search by Name Input */}
                    <Input
                      placeholder="Search by name"
                      value={searchName}
                      onChange={e => setSearchName(e.target.value)}
                      className="w-[200px] border border-primary"
                      allowClear
                    />
                    {/* <Button
                        title="Add Event"
                        variant="filled"
                        onClick={() => navigate("/admin/events/create")}
                    /> */}
                </div>
            </div>
            <div className={`mt-6`}>
                <Table
                    columns={columns}
                    dataSource={filteredEvents}
                    rowKey="id"
                    style={{
                        backgroundColor: `transparent`,
                        fontFamily: "Poppins",
                    }}
                    className={`bg-none`}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: adminEventsPagination.total || 0,
                        onChange: (newPage, newPageSize) => {
                          setPage(newPage);
                          setPageSize(newPageSize || 10);
                        },
                    }}
                    loading={loadingLatestEvents}
                />
            </div>
            <BoostEventModal
                eventId={boostEventId?.toString() || ""}
                isOpen={!!boostEventId}
                onClose={closeBoostModal}
            />
            <VerifyEventModal
              eventId={verifyEventId || ""}
              isOpen={verifyModalOpen}
              onClose={closeVerifyModal}
              onVerified={handleVerified}
              defaultMessage={verifyDefaultMsg}
              initialIsVerified={verifyEventInitial}
            />
        </div>
    );
};

export default EventsPage;
