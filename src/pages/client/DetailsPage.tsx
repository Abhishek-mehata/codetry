/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { ClientContainer, RoomReserveCard, Button } from "../../components";
import { Svg } from "../../assets";
// import { LuHeart, LuShare } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";
import { Alert, DatePicker, Divider, Rate, message } from "antd";
import { FaRegClock } from "react-icons/fa";
import { BiWifi } from "react-icons/bi";
// import { LuParkingSquare } from "react-icons/lu";
import { SquareParking } from 'lucide-react';

import { TbAirConditioning } from "react-icons/tb";
import { MdOutlineAirportShuttle } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { Navigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { RootAppState } from "../../redux/store";
import { clearBookRoomsIds } from "../../redux/reducers/places";
import { getPlaceRooms } from "../../redux/actions/places";
import {
  // getPlaceReviewById,
  getPlaceReviews,
} from "../../redux/actions/reviews";
import { requestAEvent } from "../../redux/actions/events";
import { createBook } from "../../redux/actions/book";
import { ImageAPI } from "../../api";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const goodToKnow = [
  {
    title: "Children",
    description: "Childern are welcome at this hotel.",
    icons: [],
  },
  {
    title: "Pets",
    description: "Pets are not allowed.",
    icons: [],
  },
  {
    title: "Breakfast",
    description: "Free contenital breakfeast included.",
    icons: [],
  },
  {
    title: "Accepts payment methods",
    description: "The hotel accepts the following payment methods:",
    icons: [],
  },
  {
    title: "Import information from the hotel",
    description:
      "Guests are required to show a photo ID and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. In response to the coronavirus (COVID-19), additional safety and sanitation measures are in effect at this property. Food and beverage services at this property may be limited or unavailable due to the coronavirus (COVID-19). Due to the coronavirus (COVID-19), this property is taking steps to protect the safety of guests and staff. Certain services and amenities may be reduced or unavailable as a result. Due to the coronavirus (COVID-19), this property has reduced reception and service hours. In accordance with government guidelines to minimize transmission of the coronavirus (COVID-19), this property may request additional documentation from guests to validate identity, travel itinerary, and other relevant info on dates where such guidelines exist. Spa and gym facilities at this property are unavailable due to the coronavirus (COVID-19). Please note that the property is implementing the online payment transaction for the advance purchase reservations. In this process, the property will send a link to the email of the card holder and this allows them to purchase the amount directly from their credit card.",
    icons: [],
  },
];

const ProgressBar: FC<{ width?: string; color?: string }> = ({
  width = `50%`,
  color = `bg-primary`,
}) => (
  <div
    className={`relative bg-fade-white h-2 w-full rounded-md overflow-hidden`}
  >
    <div
      className={`absolute top-0 left-0 h-full w-full ${color}`}
      style={{
        width,
      }}
    />
  </div>
);

const Status: FC<{
  title?: string;
  rating?: string;
  barWidth?: string;
  barColor?: string;
}> = ({ title, rating, barWidth, barColor }) => (
  <div className={`flex flex-col gap-1 w-full`}>
    <div className={`flex items-center justify-between`}>
      <h5 className={`text-gray text-base font-normal`}>{title}</h5>
      <h5 className={`text-black text-base font-normal`}>{rating}</h5>
    </div>
    <ProgressBar color={barColor} width={barWidth} />
  </div>
);

const amenities_icons = [
  {
    icon: <BiWifi className={`text-dark-gray text-3xl`} />,
    title: "Wifi",
  },
  {
    icon: <SquareParking className={`text-dark-gray text-3xl`} />,
    title: "Parking",
  },
  {
    icon: <TbAirConditioning className={`text-dark-gray text-3xl`} />,
    title: "Air Conditioning",
  },
  {
    icon: <MdOutlineAirportShuttle className={`text-dark-gray text-3xl`} />,
    title: "Airport Shuttle",
  },
  {
    icon: <CgGym className={`text-dark-gray text-3xl`} />,
    title: "Gym",
  },
];

const amenities_facilities = [
  {
    title: "Business facilities",
    features: ["Meeting facilities", "Business center"],
  },
  {
    title: "Cafe",
    features: ["Banquet Service", "Banquet Service"],
  },
  {
    title: "Food and drink",
    features: ["Complimentary Snacks", "Restaurant", "Full Bar"],
  },
  {
    title: "Hotels and outdoor facilities",
    features: [
      "Smoking areas",
      "Non-smoking areas",
      "Wedding facilities",
      "Ticket office",
      "Laundry",
      "Shops",
    ],
  },
  {
    title: "In the rooms",
    features: ["Shower", "Air conditioning"],
  },
  {
    title: "Sports and fitness",
    features: ["Tennis court", "Fitness Center", "Pool"],
  },
];

const Title: FC<{ isPlace: boolean; data: any }> = ({ isPlace, data }) => (
  <div className={`flex gap-2 justify-between items-end`}>
    <div>
      <h2 className={`text-3xl font-semibold text-dark-blue`}>
        {isPlace ? data.title : data.name}
      </h2>
      <div className={`flex gap-2 justify-start items-center mt-2`}>
        <img src={Svg.marker} className={`w-6`} alt="marker icon" />
        <h4 className={`text-sm font-medium text-gray`}>
          {isPlace ? data.street : data.location}
        </h4>
      </div>
    </div>
    <div className={`flex items-center gap-6`}>
      <Button
        icon={
          <LuHeart
            className={`text-primary font-semibold group-hover:text-white`}
          />
        }
        title={`Save`}
        className={`flex gap-2 items-center justify-center p-2 px-6 border-2 border-primary rounded-3xl`}
      />
      {/* <div
        className={`flex gap-2 items-center justify-center p-2 px-6 border-2 border-primary rounded-3xl`}
      >
        <LuShare className={`text-gray`} />
        <h5 className={`text-gray text-base`}>Share</h5>
      </div> */}
    </div>
  </div>
);

const PageImages: FC<{ isPlace: boolean; data: any }> = ({ isPlace, data }) => {
  const images = isPlace ? data.images : data.files;

  return (
    <div className={`grid grid-flow-rows grid-cols-3 lg:grid-cols-4 gap-3`}>
      {images.map(({ file_key, original_name }: any, i: number) => (
        <figure
          key={`${original_name}_${i}`}
          className={`h-full w-full ${
            i === 0 ? "col-span-2 row-span-2" : "col-span-1"
          } bg-fade-white`}
        >
          <img
            src={`${ImageAPI}/${file_key}`}
            alt={`${original_name} image`}
            className={`${
              i === 0
                ? "object-cover object-center w-full h-full max-w-full"
                : "object-cover object-center w-full h-full max-w-full"
            }`}
          />
        </figure>
      ))}
    </div>
  );
};

const DetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { category, id: _id } = useParams();
  const { places, rooms, bookRoomsIds } = useAppSelector(
    (state: RootAppState) => state.places
  );

  // console.log(rooms);
  const { events } = useAppSelector((state: RootAppState) => state.events);
  const {
    user: { id: userId },
  } = useAppSelector((state: RootAppState) => state.auth);
  const isPlace: boolean = category && category === "places" ? true : false;
  const details = (isPlace ? places : events).find(({ id }) =>
    isPlace ? id === Number(_id) : String(id) === String(_id)
  ) as any;
  const [roomBookDates, setRoomBookDates] = useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    if (isPlace && category && _id) {
      dispatch(clearBookRoomsIds());
      dispatch(getPlaceRooms(Number(_id)));
      // dispatch(getPlaceReviewById(Number(_id)));
      dispatch(getPlaceReviews(Number(_id)));
    }
  }, []);

  if (!details) return <Navigate to={`/`} replace />;

  // console.log(category);
  // console.log(details);

  const isSeller = isPlace
    ? userId === details.user_id
    : userId === details.sellerId;
  const TotalRoomAmount = rooms
    .filter(({ id }: any) => bookRoomsIds.includes(id))
    .reduce((acc, { price }: any) => acc + price, 0);

  return (
    <div className={`w-full min-h-screen`}>
      <ClientContainer className={`mt-12 mb-8`}>
        <Title isPlace={isPlace} data={details} />
      </ClientContainer>
      <PageImages isPlace={isPlace} data={details} />
      <ClientContainer
        className={`flex gap-10 items-start justify-between w-full mt-8`}
      >
        <div className={`w-full xl:w-3/4`}>
          <Divider className={`h-0.5 w-full bg-fade-white m-0`} />
          <div className={`flex items-center justify-between py-4`}>
            <div className={`flex gap-8 items-center justify-between`}>
              <h3
                className={`text-xl font-medium text-dark-blue underline underline-offset-2`}
              >
                Deals
              </h3>
              <h3
                className={`text-xl font-medium text-dark-blue underline underline-offset-2`}
              >
                Reviews
              </h3>
              <h3
                className={`text-xl font-medium text-dark-blue underline underline-offset-2`}
              >
                Locations
              </h3>
              <h3
                className={`text-xl font-medium text-dark-blue underline underline-offset-2`}
              >
                Details
              </h3>
            </div>
            {/* <figure>
              <img src={Images.brand} className={`w-16`} alt="brand logo" />
            </figure> */}
          </div>
          <Divider className={`h-0.5 w-full bg-fade-white m-0`} />
          <div className={`flex flex-col gap-6 py-8`}>
            <div className={`flex gap-4 items-center justify-start`}>
              <img src={Svg.lock} className={`w-8`} />
              <div className={``}>
                <h4
                  className={`text-base font-medium text-dark-blue`}
                >{`Great check-in experience`}</h4>
                <h5
                  className={`text-sm font-normal text-dark-gray`}
                >{`100% of recent guests gave the check-in process a 5-star rating.`}</h5>
              </div>
            </div>
          </div>
          <Divider className={`h-0.5 w-full bg-fade-white m-0`} />
          {/* Details */}
          <div className={`py-8`}>
            <h2 className={`text-3xl font-semibold text-dark-blue`}>
              Hotel description
            </h2>
            <p className={`text-sm text-gray font-normal mt-2`}>
              This property is 1 minute walk from the beach. Situated in Naples,
              400 m from Castel dell'Ovo, Di Palma Suite provides rooms with air
              conditioning and free WiFi. The property is set 1 km from Molo
              Beverello, 1 km from Maschio Angioino and 600 m from San Carlo
              Theatre. The property is located in the Lungomare Caracciolo
              district.
            </p>
          </div>
          {isPlace && rooms.length && (
            <Divider className={`h-0.5 w-full bg-fade-white m-0`} />
          )}
          {isPlace && rooms.length && userId && (
            <div className={`pt-8 pb-20`}>
              <h2 className={`text-3xl font-semibold text-dark-blue`}>
                Choose your room
              </h2>
              {/* Cards */}
              <div
                className={`grid gap-4 grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4`}
              >
                {rooms.map((room, i) => (
                  <RoomReserveCard key={i} data={room} isSeller={isSeller} />
                ))}
              </div>
            </div>
          )}
          <Divider className={`h-0.5 w-full bg-fade-white m-0`} />
          <div className={`py-8`}>
            <h2 className={`text-3xl font-semibold text-dark-blue`}>
              Good to know
            </h2>
            <ul className={`flex flex-col`}>
              {goodToKnow.map(({ title, description, icons }, i) => (
                <li key={`${title}${i}`} className={``}>
                  <div
                    className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start justify-between py-8`}
                  >
                    <h5
                      className={`text-start text-xl text-dark-blue font-normal md:w-1/5`}
                    >{`${title}`}</h5>
                    <div
                      className={`flex flex-col gap-4 items-start justify-start md:w-4/5`}
                    >
                      <p
                        className={`text-sm text-black font-normal`}
                      >{`${description}`}</p>
                      {icons.length > 0 && (
                        <div
                          className={`flex justify-center items-start gap-2`}
                        ></div>
                      )}
                    </div>
                  </div>
                  {i !== goodToKnow.length - 1 && (
                    <Divider className={`h-0.5 w-full bg-fade-white m-0`} />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Divider className={`h-0.5 w-full bg-fade-white mt-10`} />
          <div className={`pt-4`}>
            <h2 className={`text-3xl font-semibold text-dark-blue`}>
              Check in and check out
            </h2>
            <div
              className={`flex gap-12 flex-col md:flex-row items-start justify-start mt-8`}
            >
              <FaRegClock className={`text-7xl text-dark-blue`} />
              <ul className={`flex gap-40 items-center justify-between`}>
                <li className={`flex flex-col gap-3`}>
                  <h5 className={`text-2xl text-dark-blue font-semibold`}>
                    Check in:
                  </h5>
                  <h5 className={`text-2xl text-dark-blue font-medium`}>
                    14:00
                  </h5>
                </li>
                <li className={`flex flex-col gap-3`}>
                  <h5 className={`text-2xl text-dark-blue font-semibold`}>
                    Check out:
                  </h5>
                  <h5 className={`text-2xl text-dark-blue font-medium`}>
                    12:00
                  </h5>
                </li>
              </ul>
            </div>
            <Divider className={`h-0.5 w-full bg-fade-white mt-20 mb-0`} />
          </div>
          <div className={`py-8`}>
            <h2 className={`text-3xl font-semibold text-dark-blue`}>Reviews</h2>
            <div
              className={`flex gap-6 md:gap-0 flex-col md:flex-row md:justify-between mt-6`}
            >
              <div className={`flex justify-between items-center w-full`}>
                <div className={`flex gap-4 justify-center items-center`}>
                  <h3 className={`text-6xl text-dark-blue font-bold`}>4.5</h3>
                  <div className={`flex flex-col gap-1`}>
                    <Rate
                      allowHalf
                      disabled
                      value={4.5}
                      style={{
                        color: `#9C59DF`,
                      }}
                    />
                    <h5
                      className={`text-sm text-dark-blue font-semibold`}
                    >{`12 reviews`}</h5>
                  </div>
                </div>
              </div>
              <div
                className={`grid gap-8 grid-flow-row grid-cols-1 md:grid-rows-2 md:grid-cols-2 w-full`}
              >
                <Status title={`Cleanliness`} rating={`4.5`} barWidth={`80%`} />
                <Status title={`Location`} rating={`4.0`} barWidth={`60%`} />
                <Status
                  title={`Service`}
                  rating={`3.5`}
                  barWidth={`50%`}
                  barColor={`bg-green-700`}
                />
                <Status title={`Value`} rating={`4.5`} barWidth={`80%`} />
              </div>
            </div>
            {/* <div
              className={`grid gap-14 grid-flow-rows grid-cols-1 md:grid-cols-2 mt-14 mb-20`}
            >
              {( isPlace ? placeReviews : eventsReviews ).map(({ avatar, name, date, description }, i:number ) => (
                <ReviewCard
                  key={i}
                  avatar={avatar}
                  name={name}
                  date={date}
                  description={description}
                />
              ))}
            </div> */}
            <Divider className={`h-0.5 w-full bg-fade-white m-0 mt-12`} />
          </div>
          <div className={`py-8`}>
            <h2 className={`text-3xl font-semibold text-dark-blue`}>
              Amenities
            </h2>
            <div
              className={`grid gap-10 xl:gap-16 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-14 mb-4`}
            >
              {amenities_icons.map(({ icon, title }, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-6 items-center justify-center bg-[#f5f4f5] rounded-lg py-8 px-4`}
                >
                  <div>{icon}</div>
                  <h4
                    className={`text-dark-gray text-center text-lg font-medium`}
                  >
                    {title}
                  </h4>
                </div>
              ))}
            </div>
            <ul className={`flex flex-col`}>
              {amenities_facilities.map(({ title, features }, i) => (
                <li key={`${title}${i}`} className={``}>
                  <div
                    className={`flex gap-6 md:gap-12 flex-col md:flex-row items-start justify-between py-6`}
                  >
                    <h5
                      className={`text-start text-xl text-dark-blue font-normal md:w-1/5`}
                    >{`${title}`}</h5>
                    <div
                      className={`flex gap-6 md:gap-12 flex-wrap items-start justify-start md:w-4/5`}
                    >
                      {features.map((item, j) => (
                        <div
                          key={`${title}${j}`}
                          className={`flex gap-4 items-center justify-center`}
                        >
                          <h5
                            className={`text-base text-dark-blue font-normal`}
                          >{`${item}`}</h5>
                        </div>
                      ))}
                    </div>
                  </div>
                  {i !== goodToKnow.length && (
                    <Divider className={`h-0.5 w-full bg-fade-white m-0`} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isPlace ? (
          isSeller ? (
            <div
              className={`hidden xl:block xl:sticky top-24 w-3/12 p-6 shadow-2xl border border-fade-white rounded-lg`}
            >
              <Alert
                type="error"
                message="You cannot book your own room. Please select a different room or log in with a different account."
                banner
              />
            </div>
          ) : (
            <div
              className={`hidden xl:block xl:sticky top-24 w-3/12 p-6 shadow-2xl border border-fade-white rounded-lg`}
            >
              <h3
                className={`flex items-end gap-2 text-2xl text-dark-blue font-semibold`}
              >
                {`${details.price}`}
                <span className={`text-xl`}>{`/night`}</span>
              </h3>
              <h3
                className={`text-xl font-medium text-dark-blue underline underline-offset-2 mt-6`}
              >
                {rooms.length > 0
                  ? `Select room for pricing`
                  : `Rooms not available`}
              </h3>

              {rooms.length > 0 && (
                <div
                  className={`flex gap-1 justify-start items-center cursor-pointer p-4 mt-4 border-2 border-primary rounded-lg`}
                >
                  <img src={Svg.calender} alt="calender icon" />
                  <RangePicker
                    suffixIcon={null}
                    value={
                      !roomBookDates.start.length
                        ? null
                        : [
                            dayjs(roomBookDates.start, "YYYY-MM-DD"),
                            dayjs(roomBookDates.end, "YYYY-MM-DD"),
                          ]
                    }
                    onChange={(_: any, dateStrings: string[]) => {
                      const start = dateStrings[0];
                      const end = dateStrings[1];

                      setRoomBookDates({
                        start,
                        end,
                      });
                    }}
                    className={`w-full`}
                  />
                </div>
              )}

              {bookRoomsIds.length > 0 && (
                <div className={`mt-5`}>
                  <div
                    className={`flex flex-col gap-2 justify-between items-center`}
                  >
                    {rooms
                      .filter(({ id }: any) => bookRoomsIds.includes(id))
                      .map(({ title, price }: any, indx: number) => (
                        <div
                          key={indx}
                          className={`flex items-center justify-between w-full`}
                        >
                          <h3
                            className={`text-base text-dark-blue font-semibold`}
                          >
                            {title}
                          </h3>
                          <h4 className={`text-base text-gray font-medium`}>
                            {`$${price}.00`}
                          </h4>
                        </div>
                      ))}
                  </div>
                  <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
                  <div className={`flex items-center justify-between`}>
                    <h3 className={`text-xl text-dark-blue font-semibold`}>
                      {`Total`}
                    </h3>
                    <h3 className={`text-xl text-dark-blue font-semibold`}>
                      {`$${TotalRoomAmount}.00`}
                    </h3>
                  </div>
                  <div className={`mx-8 mt-4`}>
                    <Button
                      variant="filled"
                      title="Book Now"
                      className={`w-full`}
                      onClick={() => {
                        if (isSeller)
                          return message.error(
                            "You cannot book your own room. Please select a different room or log in with a different account."
                          );

                        const { start, end } = roomBookDates;

                        if (!start || !end)
                          return message.error(
                            `Please select a start and an end date.`
                          );

                        if (!_id) return;

                        dispatch(
                          createBook(_id, {
                            room_ids: bookRoomsIds,
                            start_date: start,
                            end_date: end,
                          })
                        );
                        setRoomBookDates({ start: "", end: "" });
                        dispatch(clearBookRoomsIds());
                      }}
                    />
                  </div>
                  <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
                  <Button
                    title="Cancel"
                    variant="outline"
                    className={`w-full`}
                    onClick={() => dispatch(clearBookRoomsIds())}
                  />
                </div>
              )}
            </div>
          )
        ) : (
          <div
            className={`text-center hidden xl:block xl:sticky top-24 w-3/12 p-6 shadow-2xl border border-fade-white rounded-lg`}
          >
            <h4 className={`text-2xl text-dark-blue font-semibold`}>
              {`$${details.price}.00`}
            </h4>
            <h3 className={`text-xl text-dark-blue font-semibold mt-2`}>
              {`${details?.eventType} Event`}
            </h3>
            {isSeller && (
              <Alert
                type="error"
                className={`mt-6`}
                message="You cannot make request on your own event. Please select a different event or log in with a different account."
                banner
              />
            )}
            <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
            <Button
              variant="filled"
              title="Request"
              className={`w-full`}
              disabled={isSeller}
              onClick={() => {
                if (isSeller)
                  return message.error(
                    "You cannot make request on your own event. Please select a different event or log in with a different account."
                  );

                dispatch(requestAEvent(_id as string));
              }}
            />
          </div>
        )}
      </ClientContainer>
    </div>
  );
};

export default DetailsPage;
