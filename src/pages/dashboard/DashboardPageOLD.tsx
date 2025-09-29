import { Checkbox, Divider, Dropdown, Progress, Space, message } from "antd";
import type { MenuProps } from "antd";
import { Menu, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
import {
  BusinessForm,
  Button,
  DashboardInput,
  ImageUploader,
  SearchMap,
  TabButtons,
  TabIntro,
} from "../../components";
import { CiCircleMinus, CiCirclePlus, CiSquarePlus } from "react-icons/ci";
import { Logo } from "../../assets";
import {
  amenities_facilities,
  amenities_foodDrink,
  amenities_property,
  initRoomState,
  placeInitState,
} from "../../lib/constants/stays";
import { roomTypes } from "../../lib/constants/dashboard";
import { AddPlaceModel, RoomModel } from "../../types/places";

const { TextArea } = Input;

type MenuItem = Required<MenuProps>["items"][number];

// const ProgressCircle: FC<{ percent: number; isActive?: boolean }> = ({
//   isActive,
//   percent,
// }) =>
//   percent === 100 ? (
//     <FaCheckCircle
//       className={`${isActive ? `text-white` : `text-primary`} mr-3`}
//       size={20}
//     />
//   ) : (
//     <Progress
//       type="circle"
//       style={{
//         marginRight: 12,
//       }}
//       size={20}
//       strokeColor={isActive ? `#fff` : `#9C59DF`}
//       percent={76}
//     />
//   );

const items: MenuItem[] = [
  {
    key: "welcome",
    label: "Welcome",
  },
  {
    key: "location",
    label: "Location",
    // icon: <ProgressCircle percent={80} isActive />,
  },
  {
    key: "business",
    label: "Business",
    // icon: <ProgressCircle percent={80} isActive />,
  },
  {
    key: "details",
    label: "Details",
    // icon: <ProgressCircle percent={100} />,
    children: [
      { key: "listingDetails", label: "Listing Details" },
      { key: "rooms&spaces", label: "Rooms and Spaces" },
      // { key: "amenities", label: "Amenities" },
    ],
  },
  {
    key: "photos",
    label: "Photos",
    // icon: <ProgressCircle percent={80} />,
  },
  {
    key: "payment",
    label: "Payment",
    // icon: <ProgressCircle percent={80} />,
  },
  {
    key: "pricing",
    label: "Pricing",
    // icon: <ProgressCircle percent={80} />,
  },
  // {
  //   key: "booking",
  //   label: "Booking",
  //   // icon: <ProgressCircle percent={80} />,
  // },
  {
    key: "go live",
    label: "Go Live",
    // icon: <ProgressCircle percent={80} />,
  },
];

const Tab: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={`bg-white p-6 rounded shadow-md`}>{children}</div>
);

const CustomDropdown: FC<{
  value: string;
  title?: string;
  onClick?: () => void;
}> = ({ title, onClick, value }) => (
  <div className={`border border-fade-white rounded-lg py-3 px-4 w-full`}>
    <h5 className={`text-dark-gray mb-1`}>{title}</h5>
    <Dropdown
      trigger={["click"]}
      menu={{
        items: roomTypes,
        onClick,
      }}
      className={`cursor-pointer`}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space className={`flex items-center justify-between w-full`}>
          <h5 className={`text-dark-gray capitalize`}>{value}</h5>
          <DownOutlined className={`text-dark-gray text-sm`} />
        </Space>
      </a>
    </Dropdown>
  </div>
);

const AddRoom: FC<{
  roomData: (value: RoomModel, index: number) => void;
  onRemove: (index: number) => void;
  index: number;
}> = ({ roomData, onRemove, index }) => {
  const [state, setState] = useState<RoomModel>({
    ...initRoomState,
    room_type: roomTypes[0].label,
  });

  useEffect(() => {
    roomData(state, index);
  }, [state]);

  const changeQuantity = (method: "plus" | "minus") =>
    setState({
      ...state,
      stock:
        state.stock === 1 && method === "minus"
          ? 1
          : method === "minus"
          ? state.stock - 1
          : state.stock + 1,
    });

  return (
    <div
      className={`flex gap-20 justify-between items-start border-2 border-fade-white p-4 rounded-lg w-full`}
    >
      <div className={`flex flex-col gap-2 justify-between items-start w-full`}>
        <div className={`flex justify-between items-center w-full`}>
          <h4 className={`text-dark-gray text-md font-semibold`}>{`BedRoom ${
            index + 1
          }`}</h4>
          <button
            type="button"
            className={`text-primary`}
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        </div>
        <div
          className={`flex flex-col gap-4 justify-between items-center w-full`}
        >
          <div
            className={`border border-fade-white rounded-lg py-3 px-4 mt-2 w-full`}
          >
            <h5 className={`text-dark-gray mb-1`}>Property Type</h5>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: roomTypes,
                onClick: ({ key }) =>
                  setState({
                    ...state,
                    room_type: key,
                  }),
              }}
              className={`cursor-pointer`}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className={`flex items-center justify-between w-full`}>
                  <h5 className={`text-dark-gray capitalize`}>
                    {state.room_type}
                  </h5>
                  <DownOutlined className={`text-dark-gray text-sm`} />
                </Space>
              </a>
            </Dropdown>
          </div>
          {/* <TextArea
            rows={6}
            maxLength={200}
            placeholder="Description"
            value={state.description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          /> */}
          <div className={`flex gap-4 items-center justify-start w-full`}>
            <div className={`border border-fade-white rounded-lg py-3 px-4`}>
              <h5 className={`text-dark-gray`}>Quantity</h5>
              <Input
                variant="borderless"
                className={`mt-1 p-0`}
                value={state.stock}
                placeholder="Enter Room quantity"
              />
            </div>
            <button type="button" onClick={() => changeQuantity("plus")}>
              <CiCirclePlus className={`text-7xl text-gray`} />
            </button>
            <button type="button" onClick={() => changeQuantity("minus")}>
              <CiCircleMinus className={`text-7xl text-gray`} />
            </button>
          </div>
        </div>
      </div>
      <div className={`w-full`}>
        <ImageUploader
        // onImagesSelected={(images: File[]) => setState({ ...state, images })}
        />
      </div>
    </div>
  );
};

interface StateModal extends AddPlaceModel {}

const DashboardPage = () => {
  // const [location, setLocation] = useState();
  const [dataState, setDataState] = useState<StateModal>({
    ...placeInitState,
  });
  const [currentTab, setCurrent] = useState("welcome");
  const [roomState, setRoomState] = useState<RoomModel[]>([]);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDataState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onTabClick: MenuProps["onClick"] = (e) => setCurrent(e.key);
  const changeTab = (tab: string) => setCurrent(tab);

  const {
    businessNature,
    individualNbr,
    individualTaxIdNbr,
    businessRegistrationNbr,
    businessTaxIdNbr,
  } = dataState;

  return (
    <div>
      <div className={`absolute top-0 left-12 bg-light-gray h-full w-1`} />
      <div className={`absolute top-12 left-0 bg-light-gray h-1 w-full`} />
      <div className={`absolute top-0 right-12 bg-light-gray h-full w-1`} />

      <div className={`p-2`}>
        <h3 className={`text-xl text-dark-blue font-medium`}>Progress</h3>
        <Progress percent={30} showInfo={false} strokeColor={`#9C59DF`} />
      </div>
      <Divider className={`h-0.5 w-full bg-light-gray mt-8`} />
      <div className={`flex gap-8 pt-10 pl-10 pr-20 w-full`}>
        <div className={`w-[15%]`}>
          <Menu
            onClick={onTabClick}
            style={{
              color: "#434859",
              marginTop: 12,
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
            defaultOpenKeys={["location"]}
            selectedKeys={[currentTab]}
            mode="inline"
            items={items}
          />
        </div>
        <div className={`w-[85%]`}>
          {currentTab === "welcome" && (
            <Tab>
              <div className={`flex justify-center items-center`}>
                <figure>
                  <img
                    src={Logo.logo_purple}
                    className={`w-52`}
                    alt={`dmt logo`}
                  />
                </figure>
              </div>

              <TabIntro
                title={`Welcome to DMT`}
                intro={`We welcome all the individuals and businesses to our tourism marketplace platform. Here, you can list Accommodation property and Experience offering based in Africa and Asia. Focused on tourism niche and regional specific services, the sellers will be able to take great advantage among buyers around the world. We wish everyone who is connected with DMT for the prosperity of this community and help boost business operations around the region. May we all prosper`}
              />
            </Tab>
          )}

          {/* Location */}
          {currentTab === "location" && (
            <Tab>
              <h2 className={`text-dark-blue text-xl font-semibold`}>
                Verify the location of your service or property
              </h2>
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <div
                className={`grid grid-rows-1 grid-cols-3 gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}
              >
                <DashboardInput
                  name={`country`}
                  title="Country"
                  placeholder="Enter Country"
                  value={String(dataState.country)}
                  onChange={onChangeHandler}
                />
                <DashboardInput
                  name={`city`}
                  title="City"
                  placeholder="Enter City"
                  value={String(dataState.city)}
                  onChange={onChangeHandler}
                />
                <DashboardInput
                  name={`street`}
                  onChange={onChangeHandler}
                  title="Street"
                  placeholder="Enter street"
                  value={String(dataState.street)}
                />
                <DashboardInput
                  name={`province`}
                  title="Province"
                  placeholder="Enter province"
                  value={String(dataState.province)}
                  onChange={onChangeHandler}
                />
                <DashboardInput
                  name={`postal_code`}
                  title="Postal code"
                  placeholder="Enter postal code"
                  value={String(dataState.postal_code)}
                  onChange={onChangeHandler}
                />
                <div className={`flex gap-2`}>
                  <DashboardInput
                    name={`latitude`}
                    title="Latitude"
                    onChange={onChangeHandler}
                    placeholder="Enter latitude"
                    value={String(dataState.latitude)}
                  />
                  <DashboardInput
                    name={`longitude`}
                    title="Longitude"
                    onChange={onChangeHandler}
                    placeholder="Enter longitude"
                    value={String(dataState.longitude)}
                  />
                </div>
              </div>
              <div className={`mt-4`}>
                <SearchMap
                  mapDetails={(data) => {
                    const {
                      country,
                      city,
                      address,
                      geometry: { lat: latitude, lng: longitude },
                      postalCode,
                      state,
                    } = data;

                    const location = {
                      ...dataState,
                      city,
                      country,
                      latitude,
                      longitude,
                      street: address,
                      province: state,
                      postal_code: String(postalCode),
                    };

                    setDataState(location);
                  }}
                />
              </div>
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                backDisabled={true}
                onClickNext={() => changeTab(`business`)}
              />
            </Tab>
          )}

          {/* business */}
          {currentTab === "business" && (
            <Tab>
              <TabIntro
                title={`Tell us about your business`}
                intro="Share some details about your business and the type of listing you want to host."
              />

              <BusinessForm
                businessData={{
                  businessNature:
                    businessNature === "INDIVIDUAL" ? "INDIVIDUAL" : "BUSINESS",
                  individualNbr,
                  individualTaxIdNbr,
                  businessRegistrationNbr,
                  businessTaxIdNbr,
                }}
                getBusinessData={({
                  businessNature,
                  individualNbr,
                  individualTaxIdNbr,
                  businessRegistrationNbr,
                  businessTaxIdNbr,
                }) => {
                  const business = {
                    ...dataState,
                    businessNature,
                    individualNbr,
                    individualTaxIdNbr,
                    businessRegistrationNbr,
                    businessTaxIdNbr,
                  };

                  setDataState(business);
                }}
              />
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => changeTab(`location`)}
                onClickNext={() => changeTab(`listingDetails`)}
              />
            </Tab>
          )}

          {currentTab === "listingDetails" && (
            <Tab>
              <h2 className={`text-dark-blue text-xl font-semibold`}>
                Heading
              </h2>
              <h5 className={`text-dark-gray mt-2`}>
                Let guests know more about the service.
              </h5>
              <h5 className={`text-dark-gray mt-1`}>
                Example: Romantic Spanish villa w/hot tub — 5 min from the
                beach!
              </h5>

              <div
                className={`border border-fade-white rounded-lg py-3 px-4 mt-6`}
              >
                <h5 className={`text-dark-gray`}>Headline</h5>
                <Input
                  name={`title`}
                  variant="borderless"
                  className={`mt-1 p-0`}
                  onChange={onChangeHandler}
                  value={dataState.title}
                  placeholder="Enter your headline"
                />
              </div>
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <h2 className={`text-dark-blue text-xl font-semibold`}>
                Description
              </h2>
              <h5 className={`text-dark-gray mt-2`}>
                Tell guests more about your space in your own words. Try to help
                them imagine what a stay might be like at your property.
              </h5>
              <TextArea
                rows={6}
                maxLength={200}
                className={`mt-6`}
                name={`description`}
                onChange={onChangeHandler}
                placeholder="Description"
                value={dataState.description}
              />
              <h5 className={`text-dark-gray mt-2`}>Minimum 200 characters</h5>
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => changeTab(`business`)}
                onClickNext={() => changeTab(`rooms&spaces`)}
              />
            </Tab>
          )}

          {currentTab === "rooms&spaces" && (
            <Tab>
              <TabIntro
                title={`Add details about the hotel`}
                intro="Let guests know more about the service."
              />
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <h2 className={`text-dark-blue text-xl font-semibold`}>Rooms</h2>
              <h5 className={`text-dark-gray mt-2`}>
                Add room packages and information about each room.
              </h5>
              {roomState.length > 0 && (
                <div className={`flex flex-col gap-4 mt-6`}>
                  {roomState.map((_, i: number) => (
                    <AddRoom
                      key={i}
                      index={i}
                      roomData={(value: RoomModel, index: number) => {
                        setRoomState((prevRoomState) => {
                          const updatedRoomState = [...prevRoomState];
                          updatedRoomState[index] = value;
                          return updatedRoomState;
                        });
                      }}
                      onRemove={(index: number) => {
                        setRoomState(() => {
                          const updatedRoomState = roomState.filter(
                            (_, ind) => index !== ind
                          );
                          return updatedRoomState;
                        });
                      }}
                    />
                  ))}
                </div>
              )}
              <Button
                variant="outline"
                className={`my-6`}
                onClick={() =>
                  setRoomState((prevState) => [...prevState, initRoomState])
                }
                icon={
                  <CiSquarePlus
                    className={`text-primary group-hover:text-white`}
                  />
                }
                title={`Add New Room`}
              />
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => changeTab(`listingDetails`)}
                onClickNext={() => changeTab(`photos`)}
              />
            </Tab>
          )}

          {currentTab === "amenities" && (
            <Tab>
              <h2 className={`text-dark-blue text-xl font-semibold`}>
                What amenities does your property have?
              </h2>
              <h5 className={`text-dark-gray mt-4`}>
                We recommend having at least five of these top amenities. You’ll
                be able to add other amenities after you publish your listing.
              </h5>
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <div>
                <h2 className={`text-dark-blue text-xl font-semibold`}>
                  Property
                </h2>
                <h5 className={`text-dark-gray mt-2`}>
                  Add room packages and information about each room.
                </h5>
                <div
                  className={`flex flex-col gap-4 justify-between items-start mt-6`}
                >
                  {amenities_property.map(({ title }, i) => (
                    <Checkbox key={`${title}_${i}`}>{title}</Checkbox>
                  ))}
                </div>
              </div>
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <div>
                <h2 className={`text-dark-blue text-xl font-semibold`}>
                  Facilities
                </h2>
                <h5 className={`text-dark-gray mt-2`}>
                  Add room packages and information about each room.
                </h5>
                <div
                  className={`flex flex-col gap-4 justify-between items-start mt-6`}
                >
                  {amenities_facilities.map(({ title }, i) => (
                    <Checkbox key={`${title}_${i}`}>{title}</Checkbox>
                  ))}
                </div>
              </div>
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <div>
                <h2 className={`text-dark-blue text-xl font-semibold`}>
                  Food & Drink
                </h2>
                <h5 className={`text-dark-gray mt-2`}>
                  Add room packages and information about each room.
                </h5>
                <div
                  className={`flex flex-col gap-4 justify-between items-start mt-6`}
                >
                  {amenities_foodDrink.map(({ title }, i) => (
                    <Checkbox key={`${title}_${i}`}>{title}</Checkbox>
                  ))}
                </div>
              </div>

              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => changeTab(`rooms&spaces`)}
                onClickNext={() => changeTab(`photos`)}
              />
            </Tab>
          )}

          {currentTab === "photos" && (
            <Tab>
              <h2 className={`text-dark-blue text-xl font-semibold`}>
                Add photos of your property
              </h2>
              <h5 className={`text-dark-gray mt-4`}>
                Show guests why they should pick your property with well-lit,
                landscape-oriented photos. Add at least 6 photos to publish your
                listing.
              </h5>
              <ImageUploader className={`mt-12`} />
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />

              <TabButtons
                onClickBack={() => changeTab(`photos`)}
                onClickNext={() => changeTab(`payment`)}
              />
            </Tab>
          )}

          {currentTab === "payment" && (
            <Tab>
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <TabButtons
                onClickBack={() => changeTab(`photos`)}
                onClickNext={() => changeTab(`pricing`)}
              />
            </Tab>
          )}

          {currentTab === "pricing" && (
            <Tab>
              <TabIntro
                title={`How much do you want to charge?`}
                intro="We recommend starting with a lower price to get a few bookings and earn some initial guests 
                reviewed. You can also update your rates at any time."
              />
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <div className={`grid gap-2 grid-cols-3`}>
                <CustomDropdown title={`Currency`} value={``} />
                <DashboardInput title={`Nightly base rate`} value={`f`} />
                <DashboardInput title={`Minimum night stay`} value={`f`} />
              </div>
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />
              <TabButtons
                onClickBack={() => changeTab(`payment`)}
                onClickNext={() => changeTab(`go live`)}
              />
            </Tab>
          )}

          {currentTab === "go live" && (
            <Tab>
              <TabIntro
                title={`How much do you want to charge?`}
                intro="We recommend starting with a lower price to get a few bookings and earn some initial guests 
                reviewed. You can also update your rates at any time."
              />
              <Divider className={`h-0.5 w-full bg-fade-white my-6`} />

              <TabButtons
                onClickBack={() => changeTab(`pricing`)}
                onClickNext={() => message.success(`Success`)}
              />
            </Tab>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

