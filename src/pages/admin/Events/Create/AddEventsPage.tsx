/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  DatePicker,
  MenuProps,
  RadioChangeEvent,
  Tabs,
  Divider,
  Dropdown,
  Checkbox,
  Select,
  message,
  Input,
  Space,
  Button as AntdButton,
  Modal,
  TimePicker,
} from "antd";
import { FC, ReactNode, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  RadioBox,
  TabButtons,
  SearchMap,
  DashboardInput,
  ImageUploader,
  Button,
  BusinessForm,
} from "../../../../components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useTypedSelectors";
import {
  listingItems,
  category_items,
  select_events,
  business_checkboxes,
  experiential_checkboxes,
  category_skills,
  events_duration,
  discount,
  currencies,
  languages,
  initEventDetailsState,
  initEventDatePicker,
} from "../../../../lib/constants/events";
import { storeNewEventDetails } from "../../../../redux/reducers/events";
import { RootAppState } from "../../../../redux/store";
import { DateRangeModel, EventModel } from "../../../../types/event";
import { createEvent } from "../../../../redux/actions/events";
import { PlusOutlined } from "@ant-design/icons";
import { FaTrash } from "react-icons/fa6";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import type { InputRef, TimeRangePickerProps } from "antd";
import { getPlaces } from "../../../../redux/actions/places";
import { useEffect } from "react";

const Tab: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`bg-white p-6 rounded shadow-md ${className}`}>
    {children}
  </div>
);

const TabIntro: FC<{ title: string; intro: string }> = ({ title, intro }) => (
  <div className={`w-full mb-8`}>
    <h2 className={`text-dark-blue text-xl font-semibold`}>{title}</h2>
    <h3 className={`text-gray mt-2`}>{intro}</h3>
  </div>
);

const EventDate: FC<{
  dispatch?: any;
  data: EventModel;
  dateType: "SINGLE" | "MULTIPLE";
}> = ({ data, dateType, dispatch }) => {
  const [dateState, setDateState] =
    useState<DateRangeModel>(initEventDatePicker);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const eventType = data.eventType === "ONLINE" ? "onlineEvent" : "onsiteEvent";

  const eventDateRanges =
    data.eventType === "ONLINE"
      ? data.onlineEvent.dateRanges
      : data.onsiteEvent.dateRanges;

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const onChange: TimeRangePickerProps["onChange"] = (_, timeString) => {
    setDateState({
      ...dateState,
      startTime: timeString[0],
      endTime: timeString[1],
    });
  };

  const onDeleteDate = (index: number) => {
    const updatedDateRange = [...eventDateRanges].filter(
      (_, i: number) => i !== index
    );

    dispatch({
      ...data,
      [eventType]: {
        ...data[eventType],
        dateRanges: updatedDateRange,
      },
    });
  };

  const { date, startTime, endTime } = dateState;

  const handleOk = () => {
    toggleModal();

    dispatch({
      ...data,
      [eventType]: {
        ...data[eventType],
        dateRanges: [...eventDateRanges, dateState],
      },
    });

    setDateState(initEventDatePicker);
  };

  return (
    <div className={`border-2 border-fade-white p-4 rounded-lg mt-4`}>
      <div
        className={`flex flex-col  items-center gap-2 justify-between ${eventDateRanges.length && "mb-4"}`}
      >
        <h3 className={`text-dark-blue font-semibold`}>Date Range</h3>
        {dateType === "SINGLE" && eventDateRanges.length === 0 && (
          <Button onClick={toggleModal} title="Add Date" />
        )}

        {dateType === "MULTIPLE" && (
          <Button onClick={toggleModal} title="Add Date" />
        )}
      </div>

      <ul className={`flex flex-col gap-2`}>
        {eventDateRanges.map(
          (
            {
              date: eventDate,
              startTime: eventStartTime,
              endTime: eventEndTime,
            }: DateRangeModel,
            i: number
          ) => (
            <li
              key={i}
              className={`flex items-center justify-between bg-light-gray/30 p-2 px-3 rounded`}
            >
              <h5
                className={`text-xs text-black`}
              >{`${eventStartTime} - ${eventEndTime} | ${eventDate}`}</h5>
              <button type="button" onClick={() => onDeleteDate(i)}>
                <FaTrash className={`text-red-500 text-xs`} />
              </button>
            </li>
          )
        )}
      </ul>

      <Modal
        width={520}
        title={`Add Event Schedule`}
        onOk={handleOk}
        open={isModalOpen}
        onCancel={toggleModal}
      >
        <div className={`flex gap-2 items-end justify-between`}>
          <div className={`w-full`}>
            <h3 className={`text-dark-blue font-semibold`}>Time</h3>
            <TimePicker.RangePicker
              use12Hours
              value={
                startTime && endTime
                  ? [dayjs(startTime, "HH:mm"), dayjs(endTime, "HH:mm")]
                  : null
              }
              format={"HH:mm"}
              className={`mt-2`}
              onChange={onChange}
              style={{ width: `100%`, height: 40 }}
            />
          </div>
          <div className={`w-full`}>
            <h3 className={`text-dark-blue mt-4 font-semibold`}>Date</h3>
            <DatePicker
              style={{
                height: 40,
                marginTop: 10,
                width: `100%`,
              }}
              value={date ? dayjs(date, "YYYY-MM-DD") : null}
              onChange={(_, dateString) =>
                setDateState({
                  ...dateState,
                  date: dateString as string,
                })
              }
              className={`w-full mt-2`}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const AddEventsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { validate } = useObjectValidation();
  const requirementRef = useRef<InputRef>(null);
  const [currentTab, setCurrentTab] = useState<string>(
    listingItems[0]?.key as string
  );
  const sellerPlaces = useAppSelector((state) => state.places.sellerPlaces);


  const [categoryItem, setCategoryItem] = useState<string>(
    category_items[0].key as string
  );

  const { addEventsDetails } = useAppSelector(
    (state: RootAppState) => state.events
  );
  const [requirementName, setRequirementName] = useState<string>("");
  const [requirementItems, setRequirementItems] = useState<string[]>(
    addEventsDetails.requirements
  );

  const onTabChange = (key: string) => setCurrentTab(key);
  useEffect(() => {
    dispatch(getPlaces()); // Fetch available places when the component loads
  }, [dispatch]);
  const dispatchEvent = (state: EventModel) =>
    dispatch(storeNewEventDetails(state));

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    dispatchEvent({
      ...addEventsDetails,
      [name]: value,
    });
  };

  const onCategoryItemClick: MenuProps["onClick"] = ({ key }) => {
    setCategoryItem(key);
    dispatchEvent({
      ...addEventsDetails,
      category: key,
    });
  };

  const onRadioChange = (e: RadioChangeEvent, type: string) =>
    dispatchEvent(
      type === "dateType"
        ? {
          ...addEventsDetails,
          [type]: e.target.value,
          onlineEvent: {
            ...addEventsDetails.onlineEvent,
            dateRanges: [],
          },
          onsiteEvent: {
            ...addEventsDetails.onsiteEvent,
            dateRanges: [],
          },
        }
        : { ...addEventsDetails, [type]: e.target.value }
    );

  const onCheckBoxChange = (e: any) => {
    const { name, checked } = e.target;

    const prevCategoryItems =
      addEventsDetails.category === "BUSINESS"
        ? addEventsDetails.business
        : addEventsDetails.experiential;

    const getSelectedItems = (prevValues: string[], value: string) => {
      const items = [...prevValues];

      if (prevValues.length === 0 && checked) items.push(value);
      else {
        const doesInclude = items.includes(value);
        const index = items.indexOf(value);
        !doesInclude && checked ? items.push(value) : items.splice(index, 1);
      }

      return items.filter((item: string) => item);
    };

    const categoryItems = getSelectedItems(prevCategoryItems, name);

    return dispatchEvent({
      ...addEventsDetails,
      [addEventsDetails.category === "BUSINESS" ? "business" : "experiential"]:
        categoryItems,
    });
  };

  const onRequirementItemsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setRequirementName(event.target.value);

  const addRequirement = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setRequirementItems([...requirementItems, requirementName]);
    setRequirementName("");

    setTimeout(() => {
      requirementRef.current?.focus();
    }, 0);
  };

  const onAddEvent = async () => {
    const {
      id, // Exclude this field
      photos,
      onlineEvent,
      onsiteEvent,
      individualNbr,
      individualTaxIdNbr,
      businessRegistrationNbr,
      businessTaxIdNbr,
      business,
      imageUrl,
      experiential,
      discount,
      isDiscountAvailable,
      ...rest
    } = addEventsDetails;
    const businessNatureData =
      addEventsDetails.businessNature === "INDIVIDUAL"
        ? {
          individualNbr,
          individualTaxIdNbr,
        }
        : {
          businessRegistrationNbr,
          businessTaxIdNbr,
        };

    const eventTypeData =
      addEventsDetails.eventType === "ONLINE" ? onlineEvent : onsiteEvent;

    const isDiscountAvailableInData =
      isDiscountAvailable === "yes"
        ? {
          ...rest,
          discount,
          isDiscountAvailable: true,
        }
        : {
          ...rest,
          isDiscountAvailable: false,
        };

    const data = {
      [addEventsDetails.eventType === "ONLINE" ? "onlineEvent" : "onsiteEvent"]:
        eventTypeData,
      [categoryItem.toLowerCase()]:
        categoryItem === "BUSINESS" ? business : experiential,
      ...isDiscountAvailableInData,
    };

    // const isValid = validate(data);
    const formData = new FormData();

    function appendFormData(data: any, rootKey: string = "") {
      if (data instanceof Object && !(data instanceof File)) {
        Object.entries(data).forEach(([key, value]) => {
          const formKey = rootKey ? `${rootKey}[${key}]` : key;
          appendFormData(value, formKey);
        });
      } else {
        formData.append(rootKey, String(data));
      }
    }

    addEventsDetails.photos.forEach((image: File) => {
      formData.append(`files`, image);
    });

    appendFormData({
      ...data,
      ...businessNatureData,
    });

    // if (!isValid.length) {
    const success = await dispatch(createEvent(formData));
    if (success) {
      navigate(`/app/events`);
      dispatch(storeNewEventDetails(initEventDetailsState));
    }
  }
  // };

  const {
    businessNature,
    individualNbr,
    individualTaxIdNbr,
    businessRegistrationNbr,
    businessTaxIdNbr,
  } = addEventsDetails;

  return (
    <div className="" >
      <div
        className={` flex gap-4 items-start justify-center listing-details-tabs mt-8 mb-8 md:mb-0`}
      >
        {/* <div
          className={`w-[15%] flex flex-col gap-8 items-start justify-center`}
        >
          <div
            className={`relative hidden md:flex flex-col gap-6 items-start justify-center overlay`}
          >
            <Tabs
              tabPosition={`right`}
              defaultActiveKey="1"
              items={listingItems}
              onChange={onTabChange}
              activeKey={currentTab}
              indicator={{ size: (origin) => origin + 6, align: `center` }}
            />
          </div>
        </div> */}
        <div className={`absolute top-35 left-0 hidden md:flex`}>
          <div
            className={` `}
          >
            <Tabs
              tabPosition={`right`}
              defaultActiveKey="1"
              items={listingItems}
              onChange={onTabChange}
              indicator={{ size: (origin) => origin + 6, align: `center` }}
              activeKey={currentTab}
            />
          </div>
        </div>
        <div className={`md:w-[85%] w-full`}>
          {currentTab === "event" && (
            <Tab>
              <TabIntro
                title={`Select Type`}
                intro={`Your Event should be of the below type.`}
              />
              <div className="border-2 border-fade-white p-4 rounded-lg">
                <h3 className="text-dark-blue mb-3 font-semibold">Select Property</h3>
                <Select
                  className="w-full"
                  placeholder="Select a property"
                  value={addEventsDetails.id || undefined}
                  onChange={(value) =>
                    dispatchEvent({
                      ...addEventsDetails,
                      id: value, // Store selected place ID
                    })
                  }
                >
                  {sellerPlaces.map((place) => (
                    <Select.Option key={place.id} value={place.id}>
                      {place.title}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <RadioBox
                items={select_events}
                onChange={(e: RadioChangeEvent) =>
                  onRadioChange(e, "eventType")
                }
                value={addEventsDetails.eventType}
              />
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                backDisabled={true}
                onClickNext={() => {
                  onTabChange(`location`);
                }}
              />
            </Tab>
          )}

          {/* Location */}
          {currentTab === "location" && (
            <Tab>
              <TabIntro
                title={`Specify your Events location`}
                intro={`Let's get started by specifying the location where you want to host your event.`}
              />

              <div
                className={`grid grid-rows-1 md:grid-cols-2 gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}
              >
                <DashboardInput
                  name={`location`}
                  title="Location"
                  placeholder="Enter location"
                  value={String(addEventsDetails.location)}
                  onChange={onChangeHandler}
                />
                {addEventsDetails.eventType === "ONSITE" && (
                  <div className={`flex gap-4 w-full`}>
                    <DashboardInput
                      name={`latitude`}
                      title="Latitude"
                      onChange={onChangeHandler}
                      placeholder="Enter latitude"
                      value={String(addEventsDetails.onsiteEvent.latitude)}
                    />
                    <DashboardInput
                      name={`longitude`}
                      title="Longitude"
                      onChange={onChangeHandler}
                      placeholder="Enter longitude"
                      value={String(addEventsDetails.onsiteEvent.longitude)}
                    />
                  </div>
                )}
              </div>
              <SearchMap
                mapDetails={(data) => {
                  const {
                    address,
                    geometry: { lat: latitude, lng: longitude },
                  } = data;

                  dispatchEvent({
                    ...addEventsDetails,
                    location: address,
                    onsiteEvent: {
                      ...addEventsDetails.onsiteEvent,
                      latitude,
                      longitude,
                    },
                  });
                }}
              />
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => onTabChange(`event`)}
                onClickNext={() => {
                  if (!addEventsDetails?.location)
                    return message.error(`Mark a location`);

                  onTabChange(`details`);
                }}
              />
            </Tab>
          )}

          {currentTab === "details" && (
            <Tab>
              <TabIntro
                title={`Details`}
                intro={`Let guests know more about the event.`}
              />
              <div className={`border-2 border-fade-white p-4 rounded-lg`}>
                <DashboardInput
                  name="name"
                  title="Name"
                  placeholder="Enter Name"
                  value={addEventsDetails.name}
                  onChange={onChangeHandler}
                />

                <ImageUploader
                  className={`mt-4`}
                  imageFiles={addEventsDetails.photos}
                  onImagesSelected={({ files }) =>
                    dispatchEvent({
                      ...addEventsDetails,
                      photos: files,
                    })
                  }
                />
              </div>

              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => onTabChange(`location`)}
                onClickNext={() => {
                  if (!addEventsDetails?.name)
                    return message.error(`Enter Name`);

                  if (!addEventsDetails?.photos.length)
                    return message.error(`Add Photos`);

                  if (addEventsDetails.photos.length !== 5) {
                    return message.error(`Please upload exactly 5 images.`);
                  }

                  onTabChange(`business`);
                }}
              />
            </Tab>
          )}

          {/* Business */}
          {currentTab === "business" && (
            <Tab>
              <TabIntro
                title={`Tell us about your business`}
                intro={`Share some details about your business.`}
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
                formType="events"
                getBusinessData={(value) => {
                  const {
                    businessNature,
                    individualNbr,
                    individualTaxIdNbr,
                    businessRegistrationNbr,
                    businessTaxIdNbr,
                  } = value;

                  dispatchEvent({
                    ...addEventsDetails,
                    businessNature:
                      businessNature === "INDIVIDUAL"
                        ? "INDIVIDUAL"
                        : "BUSINESS",
                    individualNbr,
                    individualTaxIdNbr,
                    businessRegistrationNbr,
                    businessTaxIdNbr,
                  });
                }}
              />
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => onTabChange(`details`)}
                onClickNext={() => onTabChange(`category`)}
              />
            </Tab>
          )}

          {/* Category */}
          {currentTab === "category" && (
            <Tab>
              <TabIntro
                title={`Select sub category and skill level`}
                intro="Include details about your listing to help guests find the right
        fit."
              />
              <div className={`xl:flex items-start justify-start xl:gap-40 mt-8 w-full`}>
                <div className={`h-60 w-fit`}>
                  <h3 className={`text-dark-blue mb-2 font-semibold`}>
                    Select Category
                  </h3>
                  <Dropdown
                    menu={{
                      selectable: true,
                      items: category_items,
                      defaultSelectedKeys: ["0"],
                      onClick: onCategoryItemClick,
                    }}
                    trigger={["click"]}
                    className={`w-60`}
                  >
                    <Button
                      title={categoryItem}
                      iconPlacement="right"
                      icon={
                        <MdKeyboardArrowDown
                          className={`text-primary text-xl group-hover:text-white`}
                        />
                      }
                    />
                  </Dropdown>

                  {categoryItem === "BUSINESS" && (
                    <div className={`flex gap-2 flex-col mt-6`}>
                      {business_checkboxes.map(({ label }, i: number) => (
                        <Checkbox
                          name={label}
                          checked={addEventsDetails.business.includes(label)}
                          onChange={onCheckBoxChange}
                          key={`${label}_${i}`}
                        >
                          {label}
                        </Checkbox>
                      ))}
                    </div>
                  )}

                  {categoryItem === "EXPERIENTIAL" && (
                    <div className={`flex gap-2 flex-col mt-6`}>
                      {experiential_checkboxes.map(({ label }, i: number) => (
                        <Checkbox
                          name={label}
                          checked={addEventsDetails.experiential.includes(
                            label
                          )}
                          onChange={onCheckBoxChange}
                          key={`${label}_${i}`}
                        >
                          {label}
                        </Checkbox>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`border-2 w-fit border-fade-white p-4 rounded-lg`}>
                  <h3 className={`text-dark-blue mb-3 font-semibold`}>
                    Hot Skill Level
                  </h3>
                  <RadioBox
                    items={category_skills}
                    onChange={(e: RadioChangeEvent) =>
                      onRadioChange(e, "hostSkillLevel")
                    }
                    value={addEventsDetails.hostSkillLevel}
                  />
                </div>
              </div>

              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => onTabChange(`business`)}
                onClickNext={() => {
                  if (!addEventsDetails?.category)
                    return message.error(`Select category`);

                  if (!addEventsDetails?.hostSkillLevel)
                    return message.error(`Choose a hostSkill`);

                  onTabChange(`information`);
                }}
              />
            </Tab>
          )}

          {/* Information */}
          {currentTab === "information" && (
            <Tab>
              <TabIntro
                title="Provide neccessary information about event"
                intro="Let the guests know about your event information."
              />

              <div className={`xl:grid md:grid-rows-1 xl:grid-cols-3 flex flex-col gap-4`}>
                <div className={`border-2 border-fade-white p-4 rounded-lg`}>
                  <div className={`flex flex-col items-center justify-between`}>
                    <div className={` w-full`}>
                      <h3 className={`text-dark-blue mb-3 font-semibold`}>
                        Events Duration
                      </h3>
                      <div className={`flex gap-2 flex-col mt-4`}>
                        <RadioBox
                          items={events_duration}
                          onChange={(e: RadioChangeEvent) =>
                            onRadioChange(e, "dateType")
                          }
                          value={addEventsDetails.dateType}
                        />
                      </div>
                    </div>
                    <DashboardInput
                      className={`mt-4 w-40`}
                      name={`nbrOfDays`}
                      onChange={onChangeHandler}
                      title="Number of Days"
                      placeholder="Enter days"
                      value={String(addEventsDetails.nbrOfDays)}
                    />
                  </div>
                  <EventDate
                    data={addEventsDetails}
                    dispatch={dispatchEvent}
                    dateType={addEventsDetails.dateType}
                  />

                  <DashboardInput
                    className={`mt-4`}
                    name={`hoursPerDay`}
                    onChange={onChangeHandler}
                    title="Event Hours Per Day"
                    placeholder="Enter Hours Per Day"
                    value={String(addEventsDetails.hoursPerDay)}
                  />
                </div>
                <div
                  className={`flex flex-col gap-4 items-start justify-start border-2 border-fade-white p-4 rounded-lg w-full`}
                >
                  <DashboardInput
                    name={`noOfPromotionDays`}
                    title="No of Promotional Days"
                    placeholder="Enter Promotional Days"
                    value={String(addEventsDetails.noOfPromotionDays)}
                    onChange={onChangeHandler}
                  />
                  <DashboardInput
                    name={`maxAttendances`}
                    title="Max Attendances"
                    placeholder="Enter Max Attendances"
                    value={String(addEventsDetails.maxAttendances)}
                    onChange={onChangeHandler}
                  />
                  <DashboardInput
                    name={`highlight`}
                    onChange={onChangeHandler}
                    title="Highlight"
                    placeholder="Enter highlight"
                    value={String(addEventsDetails.highlight)}
                  />
                </div>
                <div
                  className={`flex flex-col gap-4 items-start justify-start border-2 border-fade-white p-4 rounded-lg w-full`}
                >
                  <DashboardInput
                    name="price"
                    title="Price"
                    placeholder="Enter Price"
                    value={String(addEventsDetails.price)}
                    onChange={onChangeHandler}
                  />

                  <div
                    className={` border-2 border-fade-white p-4 rounded-lg w-full`}
                  >
                    <h3 className={`text-dark-blue font-semibold`}>
                      Discount Available
                    </h3>
                    <div className={`flex  flex-col gap-6  mt-2 w-full`}>
                      <RadioBox
                        items={discount}
                        onChange={(e: RadioChangeEvent) =>
                          onRadioChange(e, "isDiscountAvailable")
                        }
                        value={addEventsDetails.isDiscountAvailable}
                      />
                      {addEventsDetails.isDiscountAvailable === "yes" && (
                        <DashboardInput
                          name={`discount`}
                          title="Discount Amount"
                          placeholder="Enter discount"
                          value={String(addEventsDetails.discount)}
                          onChange={onChangeHandler}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className={`border-2 border-fade-white p-4 rounded-lg`}>
                  <h3 className={`text-dark-blue mb-3 font-semibold`}>
                    Select Language
                  </h3>
                  <Select
                    defaultValue={
                      addEventsDetails.language || languages[0].value
                    }
                    style={{ width: `100%`, height: 40 }}
                    onChange={(value: string) =>
                      dispatchEvent({
                        ...addEventsDetails,
                        language: value,
                      })
                    }
                    options={languages}
                    className={`border-2 border-fade-white rounded mb-3`}
                  />
                  <h3 className={`text-dark-blue mb-3 font-semibold`}>
                    Select Currency
                  </h3>
                  <Select
                    defaultValue={
                      addEventsDetails.currency || currencies[0].value
                    }
                    style={{ width: `100%` }}
                    onChange={(value: string) =>
                      dispatchEvent({
                        ...addEventsDetails,
                        currency: value,
                      })
                    }
                    options={currencies}
                    className={`border-2 border-fade-white rounded mb-3`}
                  />
                </div>
                <div
                  className={`flex flex-col col-span-2 gap-4 items-start justify-start border-2 border-fade-white p-4 rounded-lg w-full`}
                >
                  <div
                    className={`flex gap-4 justify-between items-center w-full`}
                  >
                    <div className={`w-full`}>
                      <h3 className={`text-dark-blue text-base font-semibold`}>
                        {`Requirements`}
                      </h3>
                      <div
                        className={`border-2 border-fade-white w-full mt-2 rounded-lg`}
                      >
                        <Select
                          mode="multiple"
                          style={{ height: 40, width: "100%" }}
                          placeholder="Choose requirements"
                          onChange={(value) =>
                            dispatchEvent({
                              ...addEventsDetails,
                              requirements: value,
                            })
                          }
                          dropdownRender={(menu) => (
                            <>
                              {menu}
                              <Divider style={{ margin: "8px 0" }} />
                              <Space
                                style={{
                                  padding: "0 8px 4px",
                                  width: "100%",
                                }}
                                className={`w-full event-information-space-box`}
                              >
                                <Input
                                  style={{
                                    padding: "8px 12px",
                                    width: "100%",
                                  }}
                                  placeholder="Please add requirementItems"
                                  ref={requirementRef}
                                  value={requirementName}
                                  onChange={onRequirementItemsChange}
                                  onKeyDown={(e) => e.stopPropagation()}
                                />
                                <AntdButton
                                  type="text"
                                  icon={<PlusOutlined />}
                                  onClick={addRequirement}
                                  className={`text-white bg-primary`}
                                >
                                  Add item
                                </AntdButton>
                              </Space>
                            </>
                          )}
                          options={requirementItems.map((item) => ({
                            label: item,
                            value: item,
                          }))}
                        />
                      </div>
                    </div>
                    {addEventsDetails.eventType === "ONSITE" && (
                      <div className={`w-full`}>
                        <h3
                          className={`text-dark-blue text-base font-semibold`}
                        >{`Transfer Service`}</h3>
                        <Select
                          defaultValue="NOT INCLUDED"
                          style={{ width: `100%`, height: 40 }}
                          onChange={(value) =>
                            dispatchEvent({
                              ...addEventsDetails,
                              onsiteEvent: {
                                ...addEventsDetails.onsiteEvent,
                                transferService: value,
                              },
                            })
                          }
                          className={`border border-fade-white rounded-lg mt-2`}
                          options={[
                            { value: "NOT_INCLUDED", label: "NOT INCLUDED" },
                            { value: "INCLUDED", label: "INCLUDED" },
                            { value: "EXTRA_COST", label: "EXTRA COST" },
                          ]}
                        />
                      </div>
                    )}
                  </div>
                  {addEventsDetails.eventType === "ONLINE" ? (
                    <div
                      className={`flex flex-col md:flex-row gap-4 justify-between items-center w-full`}
                    >
                      <DashboardInput
                        name={`platform`}
                        title="Platform"
                        placeholder="Enter platform name"
                        value={String(addEventsDetails.onlineEvent.platform)}
                        onChange={({ target: { value } }: any) =>
                          dispatchEvent({
                            ...addEventsDetails,
                            onlineEvent: {
                              ...addEventsDetails.onlineEvent,
                              platform: value,
                            },
                          })
                        }
                      />
                      <DashboardInput
                        name={`link`}
                        title="Link"
                        placeholder="Enter link"
                        value={String(addEventsDetails.onlineEvent.link)}
                        onChange={({ target: { value } }: any) =>
                          dispatchEvent({
                            ...addEventsDetails,
                            onlineEvent: {
                              ...addEventsDetails.onlineEvent,
                              link: value,
                            },
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex gap-4 justify-between items-center w-full`}
                    >
                      <div className={`w-full`}>
                        <h3
                          className={`text-dark-blue text-base font-semibold`}
                        >{`Private Group Hosting`}</h3>
                        <Select
                          defaultValue="NOT AVAILABLE"
                          style={{ width: `100%`, height: 50 }}
                          onChange={(value) =>
                            dispatchEvent({
                              ...addEventsDetails,
                              onsiteEvent: {
                                ...addEventsDetails.onsiteEvent,
                                privateGroupHosting: value,
                              },
                            })
                          }
                          className={`border border-fade-white rounded-lg mt-2`}
                          options={[
                            { value: "NOT_AVAILABLE", label: "NOT AVAILABLE" },
                            { value: "COMPLEMENTARY", label: "COMPLEMENTARY" },
                            { value: "EXTRA_COST", label: "EXTRA COST" },
                          ]}
                        />
                      </div>
                      <DashboardInput
                        name={`privateGroupHostingCharge`}
                        title="Private Group Hosting Charge"
                        placeholder="Enter hosting charge"
                        value={String(
                          addEventsDetails.onsiteEvent.privateGroupHostingCharge
                        )}
                        onChange={({ target: { value } }: any) =>
                          dispatchEvent({
                            ...addEventsDetails,
                            onsiteEvent: {
                              ...addEventsDetails.onsiteEvent,
                              privateGroupHostingCharge: value,
                            },
                          })
                        }
                      />
                      <DashboardInput
                        name={`extraAmount`}
                        title="Extra Amount"
                        placeholder="Enter extra amount"
                        value={String(addEventsDetails.onsiteEvent.extraAmount)}
                        onChange={({ target: { value } }: any) =>
                          dispatchEvent({
                            ...addEventsDetails,
                            onsiteEvent: {
                              ...addEventsDetails.onsiteEvent,
                              extraAmount: value,
                            },
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={`grid grid-rows-1 md:grid-cols-2 gap-4 mt-6`}>
                <div
                  className={`flex flex-col gap-4 border-2 border-fade-white p-4 rounded-lg`}
                >
                  <DashboardInput
                    name={`guestInformation`}
                    title="Guest Information"
                    placeholder="Enter Guest Information"
                    value={String(addEventsDetails.guestInformation)}
                    onChange={onChangeHandler}
                  />
                  <DashboardInput
                    name={`hostInformation`}
                    title="Host Information"
                    placeholder="Enter Host Information"
                    value={String(addEventsDetails.hostInformation)}
                    onChange={onChangeHandler}
                  />
                  <DashboardInput
                    name={`specialInterest`}
                    title="Special Interest"
                    placeholder="Enter Special Interest"
                    value={String(addEventsDetails.specialInterest)}
                    onChange={onChangeHandler}
                  />
                </div>
                <div
                  className={`flex flex-col gap-4 border-2 border-fade-white p-4 rounded-lg`}
                >
                  <DashboardInput
                    name={`healthAndWellness`}
                    title="Health and Wellness"
                    placeholder="Enter Health and Wellness"
                    value={String(addEventsDetails.healthAndWellness)}
                    onChange={onChangeHandler}
                  />
                  <DashboardInput
                    name={`cancellationPolicy`}
                    title="Cancellation Policy"
                    placeholder="Enter Cancellation Policy"
                    value={String(addEventsDetails.cancellationPolicy)}
                    onChange={onChangeHandler}
                  />
                  <DashboardInput
                    name={`otherInformation`}
                    title="Other Information"
                    placeholder="Enter Other information"
                    value={String(addEventsDetails.otherInformation)}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />

              <TabButtons
                nextTite="Save"
                onClickBack={() => onTabChange(`category`)}
                onClickNext={onAddEvent}
              />
            </Tab>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEventsPage;
