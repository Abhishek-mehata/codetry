import { FC, MouseEventHandler, ReactNode, useState } from "react";
import { Button } from "../../../components";
import { Divider, Input, Modal, Tabs } from "antd";
import { GoDotFill } from "react-icons/go";
import type { TabsProps } from "antd";
import { useNavigate } from "react-router";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const { TextArea } = Input;

const Tab: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`bg-white p-6 rounded shadow-md ${className}`}>
    {children}
  </div>
);

const listingItems: TabsProps["items"] = [
  {
    key: "listing basics",
    label: "Listing basics",
  },
  {
    key: "amenities",
    label: "Amenities",
  },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "propertyNames",
    label: "Property and rooms",
  },
];

// const pricingItems: TabsProps["items"] = [
//   {
//     key: "pricing",
//     label: "Pricing ",
//   },
//   {
//     key: "discounts",
//     label: "Discounts",
//   },
//   {
//     key: "addtional charges",
//     label: "Addtional charges",
//   },
//   {
//     key: "trip length",
//     label: "Trip length",
//   },
//   {
//     key: "taxes",
//     label: "Taxes",
//   },
//   {
//     key: "calender Sync",
//     label: "Calender Sync",
//   },
//   {
//     key: "sharing settings",
//     label: "Sharing settings",
//   },
// ];

const EditBox: FC<{
  title: string;
  children: ReactNode;
  description: string;
  inputType?: "input" | "textArea";
  onCancel?: MouseEventHandler<HTMLButtonElement>;
}> = ({ title, description, onCancel, children }) => (
  <div className={`border border-light-gray rounded-md`}>
    <div className={`p-6`}>
      <h3 className={`text-dark-blue mt-2 font-semibold`}>{title}</h3>
      <p className={`text-gray text-md mt-1`}>{description}</p>
      <div className={`mt-6`}>{children}</div>
    </div>
    <Divider className={`h-0.2 w-full bg-light-gray m-0`} />
    <div className={`flex items-center justify-between p-6`}>
      <button
        type="button"
        onClick={onCancel}
        className={`text-dark-blue underline underline-offset-2 font-medium`}
      >
        Cancel
      </button>
      <Button title={`Save`} variant="filled" />
    </div>
  </div>
);

const EventsDetailsPage: FC = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const [currentList, setCurrentList] = useState<string>("Listing details");
  const [currentTab, setCurrentTab] = useState<string>(listingItems[0].key);

  const onListChange = (value: string) => setCurrentList(value);
  const onTabChange = (key: string) => setCurrentTab(key);

  return (
    <div>
      <div className={`flex items-center justify-between`}>
        <h2 className={`text-3xl text-dark-blue font-medium`}>
          Hilton Hotel & Suites
        </h2>
        <div className={`flex justify-between items-center gap-8`}>
          <div className={`flex justify-between items-center gap-1`}>
            <GoDotFill className={`text-green-700 text-xl`} />
            <h5 className={`text-dark-blue underline underline-offset-2`}>
              Listed
            </h5>
          </div>
          <Button title={`Preview Listing`} variant="filled" />
        </div>
      </div>
      <div
        className={`flex gap-4 mt-12 items-start justify-center listing-details-tabs`}
      >
        <div
          className={`w-[15%] flex flex-col gap-8 items-start justify-center`}
        >
          <div className={`flex flex-col gap-6 items-start justify-center`}>
            <button
              type="button"
              className={`text-dark-blue font-semibold `}
              onClick={() => onListChange(`Listing details`)}
            >
              Listing details
            </button>
            <Tabs
              tabPosition={`right`}
              defaultActiveKey="1"
              items={listingItems}
              onChange={onTabChange}
              indicator={{ size: (origin) => origin + 6, align: `center` }}
            />
          </div>
        </div>
        <div className={`w-[85%]`}>
          {/* Listing Details */}
          {currentList === "Listing details" && (
            <div className={`w-full`}>
              {currentTab === "listing basics" && (
                <Tab className={`flex flex-col gap-6`}>
                  <h2 className={`text-dark-blue text-xl font-semibold`}>
                    Listing basics
                  </h2>
                  <div className={`mt-4 w-full`}>
                    <div className={`flex items-center justify-between w-full`}>
                      <h5 className={`text-dark-gray text-md`}>
                        Listing title
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          setEditState({
                            title: `Listing title`,
                            description: `Your listing title should highlight what makes your place special.`,
                            children: (
                              <div
                                className={`border border-light-gray rounded py-3 px-4 w-full`}
                              >
                                <Input
                                  placeholder="Enter title"
                                  variant="borderless"
                                  className={`mt-1 p-0`}
                                />
                              </div>
                            ),
                          });
                          toggleModal();
                        }}
                        className={`text-dark-blue underline underline-offset-2 font-medium`}
                      >
                        Edit
                      </button>
                    </div>
                    <h3 className={`text-gray mt-2`}>Delightful 1 bedroom</h3>
                  </div>
                  <Divider className={`h-0.2 w-full bg-light-gray my-2`} />
                  <div className={`mt-4 w-full`}>
                    <div className={`flex items-center justify-between w-full`}>
                      <h5 className={`text-dark-gray text-md`}>
                        Listing Description
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          setEditState({
                            title: `Listing description`,
                            description: `Give guests a sense of what it’s like to stay at your place, including why they’ll love staying there.`,
                            children: (
                              <>
                                <TextArea
                                  rows={6}
                                  maxLength={200}
                                  placeholder="Description"
                                />
                                <p className={`text-dark-gray text-md mt-2`}>
                                  21/50
                                </p>
                              </>
                            ),
                          });
                          toggleModal();
                        }}
                        className={`text-dark-blue underline underline-offset-2 font-medium`}
                      >
                        Edit
                      </button>
                    </div>
                    <h3 className={`text-gray mt-2`}>
                      This is memorable stay is anything but ordinary
                    </h3>
                  </div>
                  <Divider className={`h-0.2 w-full bg-light-gray my-2`} />
                  <div className={`mt-4 w-full`}>
                    <div className={`flex items-center justify-between w-full`}>
                      <h5 className={`text-dark-gray text-md`}>
                        Listing status
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          setEditState({
                            title: `Listing title`,
                            description: `Your listing title should highlight what makes your place special.`,
                            children: (
                              <>
                                <div
                                  className={`border border-light-gray rounded py-3 px-4 w-full`}
                                >
                                  <Input
                                    placeholder="Enter Room name"
                                    variant="borderless"
                                    className={`mt-1 p-0`}
                                  />
                                </div>
                                <p className={`text-dark-gray text-md mt-2`}>
                                  21/50
                                </p>
                              </>
                            ),
                          });
                          toggleModal();
                        }}
                        className={`text-dark-blue underline underline-offset-2 font-medium`}
                      >
                        Edit
                      </button>
                    </div>
                    <div
                      className={`flex justify-between items-center gap-1 w-fit mt-2`}
                    >
                      <GoDotFill className={`text-green-700 text-xl`} />
                      <h3 className={`text-gray`}>
                        Listed - Guests can book your listing.
                      </h3>
                    </div>
                  </div>
                  <Divider className={`h-0.2 w-full bg-light-gray my-2`} />
                  <h2 className={`text-dark-blue text-xl font-semibold`}>
                    Location
                  </h2>
                  <div className={`mt-4 w-full`}>
                    <div className={`flex items-center justify-between w-full`}>
                      <h5 className={`text-dark-gray text-md`}>Address</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setEditState({
                            title: `Listing title`,
                            description: `Your listing title should highlight what makes your place special.`,
                            children: (
                              <>
                                <div
                                  className={`border border-light-gray rounded py-3 px-4 w-full`}
                                >
                                  <Input
                                    placeholder="Enter Room name"
                                    variant="borderless"
                                    className={`mt-1 p-0`}
                                  />
                                </div>
                                <p className={`text-dark-gray text-md mt-2`}>
                                  21/50
                                </p>
                              </>
                            ),
                          });
                          toggleModal();
                        }}
                        className={`text-dark-blue underline underline-offset-2 font-medium`}
                      >
                        Edit
                      </button>
                    </div>
                    <h3 className={`text-gray`}>
                      1020 Waverly Dr. Longwood FL 32750, USA
                    </h3>
                  </div>
                  <Divider className={`h-0.2 w-full bg-light-gray my-2`} />
                  <h2 className={`text-dark-blue text-xl font-semibold`}>
                    Room Packages
                  </h2>
                  <div className={`mt-4 w-full`}>
                    <div className={`flex items-start justify-between w-full`}>
                      <div>
                        {[
                          "3B King superior Room - $282",
                          "One bedroom Suite - $132",
                          "2b Jr Suite - $150",
                        ].map((item, i) => (
                          <h5 className={`text-gray`} key={i}>
                            {item}
                          </h5>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/app/stays/1234/rooms`)}
                        className={`flex gap-2 itesm-center text-dark-blue underline underline-offset-2 font-medium`}
                      >
                        {`Edit`}
                        <MdOutlineKeyboardArrowRight className={`text-2xl`} />
                      </button>
                    </div>

                    {/* <div className={`flex items-center justify-between w-full`}>
                      <h5 className={`text-dark-gray text-md`}>
                        Property type
                      </h5>
                      <button
                        type="button"
                        onClick={() => navigate(`/app/stays/`)}
                        className={`text-dark-blue underline underline-offset-2 font-medium`}
                      >
                        Edit
                      </button>
                    </div>
                    <h3 className={`text-gray`}>Hotel</h3> */}
                  </div>
                  {/* <Divider className={`h-0.2 w-full bg-light-gray my-2`} />
                  <div className={`w-full`}>
                    <div className={`flex items-center justify-between w-full`}>
                      <h5 className={`text-dark-gray text-md`}>
                        Rooms and spaces
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          setEditState({
                            title: `Listing title`,
                            description: `Your listing title should highlight what makes your place special.`,
                            children: (
                              <>
                                <div
                                  className={`border border-light-gray rounded py-3 px-4 w-full`}
                                >
                                  <Input
                                    placeholder="Enter Room name"
                                    variant="borderless"
                                    className={`mt-1 p-0`}
                                  />
                                </div>
                                <p className={`text-dark-gray text-md mt-2`}>
                                  21/50
                                </p>
                              </>
                            ),
                          });
                          toggleModal();
                        }}
                        className={`text-dark-blue underline underline-offset-2 font-medium`}
                      >
                        Edit
                      </button>
                    </div>
                    <h3 className={`text-gray`}>Packages: 5</h3>
                  </div> */}
                  <Divider className={`h-0.2 w-full bg-light-gray my-2`} />
                  <h2 className={`text-dark-blue text-xl font-semibold`}>
                    Amenities
                  </h2>
                  <div className={`mt-4 w-full`}>
                    <div className={`flex items-start justify-between w-full`}>
                      <div>
                        {[
                          "Hot Tub",
                          "Resturant",
                          "Pool",
                          "Wifi",
                          "Smoke Alarm",
                          "Washer",
                          "Bar",
                        ].map((item, i) => (
                          <h5 className={`text-gray`} key={i}>
                            {item}
                          </h5>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/app/stays/`)}
                        className={`flex gap-2 itesm-center text-dark-blue underline underline-offset-2 font-medium`}
                      >
                        {`Edit`}
                        <MdOutlineKeyboardArrowRight className={`text-2xl`} />
                      </button>
                    </div>
                  </div>
                </Tab>
              )}
            </div>
          )}

          {/* Pricing & Availability */}
          {/* {currentTab === "pricing" && (
            <Tab>
              <h2 className={`text-dark-blue text-xl font-semibold`}>
                Pricing
              </h2>
              <div className={`mt-4 w-full`}>
                <div className={`flex items-center justify-between w-full`}>
                  <h5 className={`text-dark-gray text-md`}>Listing currency</h5>
                  <button
                    type="button"
                    className={`text-dark-blue underline underline-offset-2 font-medium`}
                  >
                    Show
                  </button>
                </div>
                <h3 className={`text-gray mt-2`}>USD</h3>
              </div>
              <Divider className={`h-0.2 w-full bg-light-gray my-6`} />
              <div className={`mt-4 w-full`}>
                <div className={`flex items-center justify-between w-full`}>
                  <h5 className={`text-dark-gray text-md`}>Weekly Discount</h5>
                  <button
                    type="button"
                    className={`text-dark-blue underline underline-offset-2 font-medium`}
                  >
                    Show
                  </button>
                </div>
                <h3 className={`text-gray mt-2`}>Not Set</h3>
              </div>
              <Divider className={`h-0.2 w-full bg-light-gray my-6`} />
              <div className={`mt-4 w-full`}>
                <div className={`flex items-center justify-between w-full`}>
                  <h5 className={`text-dark-gray text-md`}>Nightly Discount</h5>
                  <button
                    type="button"
                    className={`text-dark-blue underline underline-offset-2 font-medium`}
                  >
                    Show
                  </button>
                </div>
                <h3 className={`text-gray mt-2`}>Not Set</h3>
              </div>
              <Divider className={`h-0.2 w-full bg-light-gray my-6`} />
            </Tab>
          )} */}
        </div>
      </div>

      <Modal
        width={1000}
        footer={null}
        closeIcon={null}
        open={isModalOpen}
        onCancel={cancelModal}
      >
        <EditBox
          title={editState?.title}
          onCancel={cancelModal}
          children={editState.children}
          description={editState?.description}
        />
      </Modal>
    </div>
  );
};

export default EventsDetailsPage;
