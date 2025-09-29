//
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Input, Pagination } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RootAppState } from "../../../redux/store";
import { Button, Loader } from "../../../components";
import ReservationEventPage from "./ReservationEventPage"; // For event reservations
import api from "../../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { setReservationCache, clearReservationCache } from "../../../redux/actions/reservationCache";

const category = [
  { label: "All", key: "all" },
  { label: "Stay", key: "stay" },
  { label: "Event", key: "event" },
];

const events = [
  { label: "Online", key: "online" },
  { label: "Onsite", key: "onsite" },
];

const bookingStatusOptions = [
  { label: "All", key: "all" },
  { label: "Pending", key: "PENDING" },
  { label: "Confirmed", key: "CONFIRM" },
  { label: "Declined", key: "DECLINED" },
];
const sortOptions = [
  { label: "Latest", key: "latest" },
  { label: "Oldest", key: "oldest" },
];

const ReservationPage: FC = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const eventParam = queryParams.get('event');
  const staysParam = queryParams.get('stays');
  const initialCategory = eventParam
    ? 'event'
    : staysParam
      ? 'stay'
      : 'all';
  const initialEvent = eventParam === 'online' || eventParam === 'onsite' ? eventParam : 'online';

  const [selectCategory, setSelectCategory] = useState<string>(initialCategory);
  const [selectEvent, setSelectEvent] = useState<string>(initialEvent);
  const [listEvents, setListEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = 10;
  const dispatch = useDispatch();
  const cachedReservations = useSelector(
    (state: RootAppState) => (state as any).reservationCache[selectCategory] || []
  );
  const role = (useSelector((state: RootAppState) => (state as any).auth.user.role) || "BUYER") as string;
  const [selectedBookingStatus, setSelectedBookingStatus] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("latest");
  // Update URL when category or event changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (selectCategory === 'event') {
      newSearchParams.set('event', selectEvent);
    } else if (selectCategory === 'stay') {
      newSearchParams.set('stays', 'stays');
    }
    const newUrl = `${location.pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
    navigate(newUrl, { replace: true });
  }, [selectCategory, selectEvent, location.pathname, navigate]);

  useEffect(() => {
    if (cachedReservations.length > 0) {
      setListEvents(cachedReservations);
    }
  }, [cachedReservations]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [selectCategory, selectEvent, searchTerm, selectedBookingStatus, sortOrder]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const fetchReservations = async () => {
    // if (cachedReservations.length > 0 && !invalidateCache) {
    //   setListEvents(cachedReservations);
    //   return;
    // }
    try {
      setIsLoading(true);
      let eventsResult: any[] = [];
      let staysResult: any[] = [];
      let merged: any[] = [];
      if (selectCategory === "all") {
        // Fetch both online and onsite events
        const eventTypes = ["ONLINE", "ONSITE"];
        let allEvents: any[] = [];
        for (const eventType of eventTypes) {
          const eventEndpoint =
            role === "BUYER"
              ? `events/booked-events?eventType=${eventType}`
              : `events/bookings-on-my-events?eventType=${eventType}`;
          const eventResponse = await api.get(eventEndpoint);
          let result =
            eventResponse?.data?.eventBookings ||
            eventResponse?.data?.bookedEvents ||
            [];
          result = result.map((item: any) => ({ ...item, __reservationType: 'event' }));
          allEvents = allEvents.concat(result);
        }
        eventsResult = allEvents;
        // Fetch stays
        const stayEndpoint =
          role === "BUYER"
            ? `rooms/buyer/my-booked-rooms`
            : `rooms/seller/booked-rooms`;
        const stayResponse = await api.get(stayEndpoint);
        staysResult = stayResponse?.data?.roomBookings || [];
        staysResult = staysResult.map((item: any) => ({ ...item, __reservationType: 'stay' }));
        merged = [...eventsResult, ...staysResult];
      } else if (selectCategory === "event") {
        const eventType = selectEvent.toUpperCase();
        const eventEndpoint =
          role === "BUYER"
            ? `events/booked-events?eventType=${eventType}`
            : `events/bookings-on-my-events?eventType=${eventType}`;
        const eventResponse = await api.get(eventEndpoint);
        eventsResult =
          eventResponse?.data?.eventBookings ||
          eventResponse?.data?.bookedEvents ||
          [];
        eventsResult = eventsResult.map((item: any) => ({ ...item, __reservationType: 'event' }));
        merged = eventsResult;
      } else if (selectCategory === "stay") {
        const stayEndpoint =
          role === "BUYER"
            ? `rooms/buyer/my-booked-rooms`
            : `rooms/seller/booked-rooms`;
        const stayResponse = await api.get(stayEndpoint);
        staysResult = stayResponse?.data?.roomBookings || [];
        staysResult = staysResult.map((item: any) => ({ ...item, __reservationType: 'stay' }));
        merged = staysResult;
      }
      // Sort merged by latest updatedAt, paidAt, or createdAt
      const sorted = [...merged].sort((a: any, b: any) => {
        const getDate = (item: any) =>
          item?.updatedAt ||
          item?.Payment?.paidAt ||
          item?.Payment?.createdAt ||
          item?.createdAt ||
          0;
        return new Date(getDate(b)).getTime() - new Date(getDate(a)).getTime();
      });
      setListEvents(sorted);
      dispatch(setReservationCache(selectCategory as 'all' | 'event' | 'stay', sorted));
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setListEvents([]);
      dispatch(clearReservationCache(selectCategory as 'all' | 'event' | 'stay'));
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [selectCategory, selectEvent, role]);

  const onSelectCategory = ({ key }: { key: string }) => setSelectCategory(key);
  const onSelectEvent = ({ key }: { key: string }) => setSelectEvent(key);

  // Invalidate cache on status update
  const handleStatusUpdate = () => fetchReservations();

  // Filter by search term (refNumber) and booking status
  const filteredEvents = listEvents.filter((item: any) => {
    const refNumber = item?.Payment?.refId || item?.refNumber || "";
    const matchesSearch = refNumber.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesStatus = true;
    if (selectedBookingStatus !== "all") {
      // Filter by verifyBySeller status
      const status = item.verifyBySeller || "";
      matchesStatus = status.toUpperCase() === selectedBookingStatus.toUpperCase();
    }
    return matchesSearch && matchesStatus;
  });
  // Sort logic
  const sortedEvents = [...filteredEvents].sort((a: any, b: any) => {
    const getDate = (item: any) =>
      item?.updatedAt ||
      item?.Payment?.paidAt ||
      item?.Payment?.createdAt ||
      item?.createdAt ||
      0;
    const dateA = new Date(getDate(a)).getTime();
    const dateB = new Date(getDate(b)).getTime();
    if (sortOrder === "latest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
  // Pagination logic
  const paginatedEvents = sortedEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (isLoading) {
    return <Loader className="h-screen" loading={isLoading}/>;
  }

  return (
    <>
      <section className="flex flex-col flex-1 w-full bg-white p-8">
        <div className="flex-col md:flex-row flex items-start md:items-center justify-between w-full mt-4">
          <h1 className="text-lg md:text-2xl text-dark-blue font-semibold capitalize">
            {`${sortedEvents?.length || 0} ${selectCategory} Booked`}
          </h1>
          <div className="flex items-stretch justify-start md:justify-end flex-wrap gap-4">
          <Input
              placeholder="Search by Ref Number"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
            <Dropdown
              menu={{
                items: category,
                selectable: true,
                selectedKeys: [selectCategory],
                onClick: onSelectCategory,
              }}
              trigger={["click"]}
            >
              <Button
                title={selectCategory}
                iconPlacement="right"
                icon={<MdKeyboardArrowDown />}
              />
            </Dropdown>
            {selectCategory === "event" && (
              <Dropdown
                menu={{
                  items: events,
                  selectable: true,
                  selectedKeys: [selectEvent],
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
            )}
            {/* Booking Status Dropdown */}
            <Dropdown
              menu={{
                items: bookingStatusOptions,
                selectable: true,
                selectedKeys: [selectedBookingStatus],
                onClick: ({ key }) => setSelectedBookingStatus(key),
              }}
              trigger={["click"]}
            >
              <Button
                title={
                  bookingStatusOptions.find(opt => opt.key === selectedBookingStatus)?.label || "All"
                }
                iconPlacement="right"
                icon={<MdKeyboardArrowDown />}
              />
            </Dropdown>
            {/* Sort Dropdown */}
            <Dropdown
              menu={{
                items: sortOptions,
                selectable: true,
                selectedKeys: [sortOrder],
                onClick: ({ key }) => setSortOrder(key),
              }}
              trigger={["click"]}
            >
              <Button
                title={sortOptions.find(opt => opt.key === sortOrder)?.label || "Latest"}
                iconPlacement="right"
                icon={<MdKeyboardArrowDown />}
              />
            </Dropdown>
            {/* Search input for refNumber */}
          </div>
        </div>
      </section>
      <main className="relative p-8 w-full flex flex-col gap-10 h-[100vh] mb-5">
        {paginatedEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <span className="text-lg font-semibold">No Data Found</span>
          </div>
        ) : (
          <>
            {paginatedEvents?.map((item: any, i: number) => {
              console.log(item,"lllllll");
              if (item.__reservationType === 'event') {
                return (
                  <ReservationEventPage
                    key={`event-${item?.id || i}`}
                    data={{
                      id: item?.id,
                      eventId: item?.eventId,
                      onlineEvent: item?.Event?.OnlineEvent,
                      name: item.Event?.name,
                      status: item.Event?.status,
                      verifyBySellerStatus: item.verifyBySeller,
                      refNumber: item.Payment?.refId,
                      location: item.Event?.location,
                      startDate: new Date(item.Payment?.paidAt).toLocaleDateString(),
                      endDate: new Date(item.Payment?.paidAt).toLocaleDateString(),
                      price: item.Payment?.amount,
                      priceDue: item.Payment?.nextPaymentAmount,
                      nights: 1,
                      guest: item.numberOfGuests,
                      category: 'event',
                      imageUrl:
                        item.Event?.files?.[0]?.url || "https://via.placeholder.com/300",
                      currency: item.Event?.currency,
                      eventType: item.Event?.eventType
                    }}
                    role={role}
                    onStatusUpdate={handleStatusUpdate}
                  />
                );
              } else if (item.__reservationType === 'stay') {
                return (
                  <ReservationEventPage key={`stay-${item?.id || i}`} data={{
                    id: item?.id,
                    name: item.Room?.title,
                    status: item?.Room?.status,
                    verifyBySellerStatus: item.verifyBySeller,
                    bookingStatus: item.bookingStatus,
                    refNumber: item?.Payment?.refId,
                    location: item.Room?.place?.city,
                    startDate: item?.startDate ? new Date(item.startDate)?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric', }) : '',
                    endDate: item?.endDate ? new Date(item.endDate)?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : '',
                    price: item?.Payment?.amount,
                    nights: item?.startDate && item?.endDate
                    ? Math.round(
                        (new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                      )
                    : 0,
                    guest: item?.noOfGuests,
                    category:'stay',
                    priceDue: item?.Payment?.nextPaymentAmount || 0,
                    imageUrl:
                      item?.Room?.images[0],
                    currency: item.Room?.currency || "usd",
                    eventId: "dummyeventid", 
                    eventType: "dummytype"// Default to 'stay' if not specified
                  }} 
                  role={role}
                  onStatusUpdate={handleStatusUpdate}
                  />
                );
              }
              return null;
            })}
          </>
        )}
        {/* Pagination controls */}
        {paginatedEvents.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={sortedEvents.length}
              onChange={page => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default ReservationPage;
