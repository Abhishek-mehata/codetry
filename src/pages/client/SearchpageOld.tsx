/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoComplete, Divider, Flex, Input, Select } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { DatePicker } from "antd";
import { Svg } from "../../assets";

import { LocationCard, PositionViewMap } from "../../components";
import dayjs from "dayjs";
import { useAppSelector } from "../../hooks/useTypedSelectors";
import { RootAppState } from "../../redux/store";
import { roomTypes } from "../../lib/constants/dashboard";
import { BiSolidCategory } from "react-icons/bi";

const { RangePicker } = DatePicker;

type Category = "places" | "events";

// const rooms = [
//   {
//     value: "Suite",
//   },
//   {
//     value: "Deluxe room",
//   },
//   {
//     value: "Executive room",
//   },
//   {
//     value: "Family room",
//   },
//   {
//     value: "Presidential suite",
//   },
// ];

interface FilterState {
  property: string;
  type: Category;
  destination: string;
  start_date: string;
  end_date: string;
  min_price: string;
  max_price: string;
  room: string;
}

const filterInitState: FilterState = {
  property: "",
  destination: "",
  type: "places",
  start_date: "",
  end_date: "",
  min_price: "10",
  max_price: "1000",
  room: "",
};

const Searchpage = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const start_date = searchParams.get("start");
  const end_date = searchParams.get("end");
  const type = searchParams.get("type");
  const destination = searchParams.get("destination");
  const { places } = useAppSelector((state: RootAppState) => state.places);
  const { events } = useAppSelector((state: RootAppState) => state.events);
  const [filterState, setFilterState] = useState<FilterState>(filterInitState);
  // const [searchLocation, setSearchLocation] = useState<{
  //   lat: number;
  //   lng: number;
  // }>({
  //   lat: 27.717245,
  //   lng: 85.323959,
  // });

  useEffect(() => {
    if (start_date && end_date && type && destination) {
      setFilterState({
        ...filterState,
        start_date,
        end_date,
        type: type as Category,
        destination,
        room: roomTypes[0].key,
      });
    }
  }, []);

  const isCategoryPlaces = filterState.type === "places" ? true : false;
  const locations = useMemo(() => {
    const items = isCategoryPlaces ? places : events;
    const uniqueLocations = items
      .map((item: any) => {
        return {
          value: isCategoryPlaces ? item.street : item.location,
        };
      })
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.value === item.value)
      );
    return uniqueLocations;
  }, [isCategoryPlaces, places, events]);

  const data = useMemo(() => {
    const { destination: userDestination, min_price, max_price } = filterState;

    const lowC = (value: string) => value.toLowerCase();
    const num = (value: string) => Number(value);

    const checkPrice = (price: number): boolean =>
      price >= num(min_price) && price <= num(max_price);

    const items = isCategoryPlaces ? places : events;

    return items.filter((item: any) => {
      const { price }: any = item;

      const destinationMatch = isCategoryPlaces
        ? [item.city, item.country, item.province, item.street]
            .map(lowC)
            .includes(lowC(userDestination))
        : lowC(item.location) === lowC(userDestination);

      const priceMatch = price !== null && checkPrice(num(price));

      return (!userDestination || destinationMatch) && priceMatch;
    });
  }, [filterState, isCategoryPlaces, places, events]);

  const onHandleChange = ({ target: { name, value } }: any) =>
    setFilterState({
      ...filterState,
      [name]: value,
    });

  const mapData = data.map((item: any) => {
    const {
      latitude,
      longitude,
      OnlineEvent,
      OnsiteEvent,
      images,
      files,
      street,
      location,
    } = item;

    console.log(mapData);
    const isPlace = isCategoryPlaces;
    const defaultLat = 27.717245;
    const defaultLng = 85.323959;

    const Lat = isPlace
      ? latitude
      : OnlineEvent?.latitude ?? OnsiteEvent?.latitude ?? defaultLat;
    const Lng = isPlace
      ? longitude
      : OnlineEvent?.longitude ?? OnsiteEvent?.longitude ?? defaultLng;

    return {
      images: isPlace ? images : files,
      location: isPlace ? street : location,
      latitude: Lat,
      longitude: Lng,
    };
  });

  // console.log(mapData);

  return (
    <div className={`flex flex-1 flex-col w-full min-h-screen`}>
      
      <div className={`p-4 md:py-6 md:px-8 border-b-2 border-fade-white`}>
        <div className={`flex flex-col md:flex-row gap-4 md:gap-6`}>
          <div
            className={`flex gap-2 justify-start items-center cursor-pointer p-3 border-2 border-primary rounded-xl w-80`}
          >
            <img src={Svg.marker} className={`w-6`} alt="marker icon" />
            <AutoComplete
              size={`middle`}
              variant="borderless"
              filterOption={true}
              value={filterState.destination}
              options={locations}
              placeholder="Search Destination..."
              className={`border-outline-none w-full`}
              style={{ width: "100%", textAlign: "start" }}
              onChange={(value) =>
                setFilterState({
                  ...filterState,
                  destination: value,
                })
              }
              onSelect={(value: string) =>
                setFilterState({
                  ...filterState,
                  destination: value,
                })
              }
            />
          </div>
          <div
            className={`flex gap-2 justify-start items-center border-2 border-primary rounded-xl cursor-pointer px-3 py-3 md:py-0 w-full md:w-80`}
          >
            <img src={Svg.calender} alt="calender icon" />
            <RangePicker
              suffixIcon={null}
              value={
                !filterState.start_date.length
                  ? null
                  : [
                      dayjs(filterState.start_date, "YYYY-MM-DD"),
                      dayjs(filterState.end_date, "YYYY-MM-DD"),
                    ]
              }
              onChange={(_: any, dateStrings: string[]) => {
                const start_date = dateStrings[0];
                const end_date = dateStrings[1];

                setFilterState({
                  ...filterState,
                  start_date,
                  end_date,
                });
              }}
              className={`w-full`}
            />
          </div>
        </div>
        <div className={`flex flex-wrap gap-4 md:gap-4 mt-4 md:mt-6`}>
          <Flex
            gap={10}
            align="center"
            className={`border-2 border-primary rounded-xl w-48 cursor-pointer py-2 px-4 md:p-3`}
          >
            <BiSolidCategory className={`text-primary text-3xl`} />
            <Select
              options={[
                {
                  value: "events",
                },
                {
                  value: "places",
                },
              ]}
              variant="borderless"
              value={filterState.type}
              style={{ height: "100%", width: "100%" }}
              onChange={(value: string) =>
                setFilterState({
                  ...filterState,
                  type: value as Category,
                })
              }
            />
          </Flex>

          <Flex className={`border-2 border-primary px-3 rounded-xl`}>
            <Input
              name="min_price"
              value={filterState.min_price}
              placeholder="Price start range"
              variant="borderless"
              style={{
                width: 140,
                borderRadius: 0,
                paddingBlock: 10,
                borderRight: `1px solid #9d63df`,
              }}
              onChange={onHandleChange}
            />
            <Input
              name="max_price"
              value={filterState.max_price}
              placeholder="Price end range"
              variant="borderless"
              style={{
                width: 140,
                borderRadius: 0,
                paddingBlock: 10,
                borderLeft: `1px solid #9d63df`,
              }}
              onChange={onHandleChange}
            />
          </Flex>

          {/* {filterState.type === "places" && (
            <Flex
              gap={10}
              align="center"
              className={`border-2 border-primary rounded-xl w-60 cursor-pointer py-2 px-4 md:p-3`}
            >
              <MdOutlineBed className={`text-primary text-3xl`} />
              <Select
                options={rooms}
                variant="borderless"
                value={filterState.room}
                style={{ height: "100%", width: "100%" }}
                onChange={(value: string) =>
                  setFilterState({
                    ...filterState,
                    room: value,
                  })
                }
              />
            </Flex>
          )} */}
        </div>
      </div>
      <section className={`flex flex-1 w-full h-full`}>
        <div className={`w-full md:w-2/4`}>
          <div className={`px-4 pt-4 md:px-8`}>
            <h3
              className={`text-sm text-gray font-medium mt-2 mb-4 capitalize`}
            >{`${data.length}${data.length > 10 ? "+" : ""} ${
              filterState.type
            } ${filterState.destination && "in"} ${
              filterState.destination
            }`}</h3>
            <Divider className={`h-0.5 w-full bg-fade-white mt-3 mb-4`} />
          </div>
          <div
            className={`grid grid-flow-rows grid-cols-1 xl:grid-cols-2 mt-4 md:mt-10 px-0 md:px-4 overflow-auto`}
          >
            {data.map((item, i) => (
              <LocationCard data={item} isPlace={isCategoryPlaces} key={i} />
            ))}
          </div>
        </div>
        <div className={` w-full md:block md:w-2/4`}>
          <PositionViewMap destination=""  />
        </div>
      </section>
    </div>
  );
};

export default Searchpage;
