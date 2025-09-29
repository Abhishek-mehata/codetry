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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FC, ReactNode, useRef, useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  RadioBox,
  TabButtons,
  SearchMap,
  DashboardInput,
  ImageUploader,
  Button,
  BusinessForm,
  Loader,
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
  // initEventDetailsState,
  initEventDatePicker,
  initEventDetailsState,
} from "../../../../lib/constants/events";
import { storeNewEventDetails } from "../../../../redux/reducers/events";
import { RootAppState } from "../../../../redux/store";
import { DateRangeModel, EventModel } from "../../../../types/event";
import { getEventsById, updateEvent } from "../../../../redux/actions/events";
import { PlusOutlined } from "@ant-design/icons";
import { FaTrash } from "react-icons/fa6";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import type { InputRef, TimeRangePickerProps } from "antd";
import { validateMinimumPrice, getMinimumPrice } from "../../../../utils/currencyConversion";

const Tab: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`bg-white p-6 rounded ${className}`}>
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
      ? data?.onlineEvent?.dateRanges
      : data?.onsiteEvent?.dateRanges;

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
        className={`flex flex-col  items-center gap-2 justify-between ${eventDateRanges?.length && "mb-4"}`}
      >
        <h3 className={`text-dark-blue font-semibold`}>Date Range</h3>
        {dateType === "SINGLE" && eventDateRanges?.length === 0 && (
          <Button onClick={toggleModal} title="Add Date" />
        )}

        {dateType === "MULTIPLE" && (
          <Button onClick={toggleModal} title="Add Date" />
        )}
      </div>

      <ul className={`flex flex-col gap-2`}>
        {eventDateRanges?.map(
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
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              className={`w-full mt-2`}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const EditEventPage = () => {
  // const navigate = useNavigate();
  const { id: eventId } = useParams();
  const dispatch = useAppDispatch();
  const requirementRef = useRef<InputRef>(null);
  const [currentTab, setCurrentTab] = useState<string>(
    listingItems[0]?.key as string
  );
  const [loading, setLoading] = useState(true);
  console.log(loading, "loading");
  const [submitting, setSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<Array<{ url: string; original_name: string; id: string }>>([]);
  const [deletingImages, setDeletingImages] = useState<string[]>([]);

  const [categoryItem, setCategoryItem] = useState<string>(
    category_items[0].key as string
  );
// what is your name my name is 
  const addEventsDetails = useAppSelector(
    (state: RootAppState) => (state.events as any)?.addEventsDetails || {}
  );
  console.log(addEventsDetails, "addEventsDetailsssss");

  const eventLongitude = addEventsDetails?.onsiteEvent?.longitude !== 0 ? String(addEventsDetails?.onsiteEvent?.longitude) : String(addEventsDetails?.OnsiteEvent?.longitude)
  const eventLatitude = addEventsDetails?.onsiteEvent?.latitude !== 0 ? String(addEventsDetails?.onsiteEvent?.latitude) : String(addEventsDetails?.OnsiteEvent?.latitude)

  const [requirementName, setRequirementName] = useState<string>("");
  const [requirementItems, setRequirementItems] = useState<string[]>(
    addEventsDetails.requirements
  );

  // Add state for Other Information
  const [otherInformationName, setOtherInformationName] = useState<string>("");
  const [otherInformationItems, setOtherInformationItems] = useState<string[]>(
    addEventsDetails.otherInformation && typeof addEventsDetails.otherInformation === 'string' && addEventsDetails.otherInformation.length > 0
      // @ts-expect-error: otherInformation may not always be a string, but we handle it safely here
      ? addEventsDetails.otherInformation.split(',').map(s => s.trim())
      : []
  );

  // Error states for validation
  const [priceError, setPriceError] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");

  // Store the original event data for diffing
  const originalEventRef = useRef<any>(null);

  const onTabChange = (key: string) => setCurrentTab(key);

  useEffect(() => {
    let isMounted = true;
    
    if (eventId) {
      setLoading(true);
      dispatch(getEventsById(eventId))
        .then((res: any) => {
          if (!isMounted) return; // Don't update state if component unmounted
          
          // Extract images from response and store them separately
          const eventData = res?.data || res || {};
          const apiImages = eventData.files || [];
          setExistingImages(apiImages.map((img: any) => ({
            url: img.url,
            original_name: img.original_name || 'image',
            id: img.id
          })));
          // Set the original event data for diffing
          // Use the same structure as updatePayload for accurate diffing
          const processedEventData = {
            name: eventData.name,
            highlight: eventData.highlight,
            price: eventData.price,
            discount: eventData.discount,
            currency: eventData.currency,
            category: eventData.category,
            eventType: eventData.eventType,
            dateType: eventData.dateType,
            nbrOfDays: eventData.nbrOfDays,
            hoursPerDay: eventData.hoursPerDay,
            maxAttendances: eventData.maxAttendances,
            language: eventData.language,
            isDiscountAvailable: eventData.isDiscountAvailable,
            status: eventData.status,
            location: eventData.location,
            requirements: eventData.requirements,
            guestInformation: eventData.guestInformation,
            hostInformation: eventData.hostInformation,
            cancellationPolicy: eventData.cancellationPolicy,
            hostSkillLevel: eventData.hostSkillLevel,
            otherInformation: eventData.otherInformation,
            healthAndWellness: eventData.healthAndWellness,
            specialInterest: eventData.specialInterest,
            noOfPromotionDays: eventData.noOfPromotionDays,
            businessNature: eventData.businessNature,
            individualNbr: eventData.individualNbr,
            individualTaxIdNbr: eventData.individualTaxIdNbr,
            businessRegistrationNbr: eventData.businessRegistrationNbr,
            businessTaxIdNbr: eventData.businessTaxIdNbr,
            business: eventData.business,
            experiential: eventData.experiential,
            // Ensure photos is always undefined when loading from API
            photos: undefined,
            ...(eventData.eventType === "ONLINE" ? {
              onlineEvent: {
                dateRanges: eventData.onlineEvent?.dateRanges,
                platform: eventData.onlineEvent?.platform,
                link: eventData.onlineEvent?.link,
              }
            } : {
              onsiteEvent: {
                dateRanges: eventData.onsiteEvent?.dateRanges,
                extraAmount: eventData.onsiteEvent?.extraAmount,
                privateGroupHosting: eventData.onsiteEvent?.privateGroupHosting,
                privateGroupHostingCharge: eventData.onsiteEvent?.privateGroupHostingCharge,
                transferService: eventData.onsiteEvent?.transferService,
                latitude: eventData.onsiteEvent?.latitude,
                longitude: eventData.onsiteEvent?.longitude,
              }
            })
          };
          originalEventRef.current = processedEventData;
          // Clear photos in Redux to avoid invalid objects
          dispatch(storeNewEventDetails({ ...initEventDetailsState, ...processedEventData, photos: [] }));
          setLoading(false);
        })
        .catch((error: any) => {
          if (!isMounted) return; // Don't update state if component unmounted
          console.error('Error fetching event:', error);
          message.error('Failed to load event data. Please try again.');
          setLoading(false);
        });
    } else {
      // If no eventId, set loading to false immediately
      setLoading(false);
    }

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [eventId]); // Removed dispatch from dependency array

  // Update requirementItems when addEventsDetails changes
  useEffect(() => {
    setRequirementItems(addEventsDetails.requirements);
  }, [addEventsDetails.requirements]);

  const dispatchEvent = (state: EventModel) => {
    return dispatch(storeNewEventDetails(state));
  };

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
      category: key as "BUSINESS" | "EXPERIENTIAL",
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
            // Explicitly preserve latitude and longitude
            latitude: addEventsDetails.onsiteEvent.latitude,
            longitude: addEventsDetails.onsiteEvent.longitude,
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

  const onOtherInformationItemsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOtherInformationName(event.target.value);

  // Function to validate price based on selected currency
  const validatePrice = (price: number, currency: string) => {
    if (price <= 0) {
      setPriceError("Price must be greater than $3");
      return false;
    }
    
    const validation = validateMinimumPrice(price, currency);
    if (!validation.isValid) {
      const minimumPrice = getMinimumPrice(currency);
      setPriceError(`Price must be at least ${minimumPrice.toFixed(2)} ${currency.toUpperCase()} (equivalent to $3 USD)`);
      return false;
    }
    
    setPriceError("");
    return true;
  };

  // Function to validate title length
  const validateTitle = (title: string) => {
    if (title.length > 22) {
      setTitleError("Title must not exceed 22 characters");
      return false;
    }
    
    setTitleError("");
    return true;
  };

  const addRequirement = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const newRequirements = [...requirementItems, requirementName];
    setRequirementItems(newRequirements);

    // Also update Redux state
    dispatchEvent({
      ...addEventsDetails,
      requirements: newRequirements,
    });

    setRequirementName("");

    setTimeout(() => {
      requirementRef.current?.focus();
    }, 0);
  };

  const addOtherInformation = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setOtherInformationItems([...otherInformationItems, otherInformationName]);
    setOtherInformationName("");
  };


  const handleExistingImagesChange = async (images: Array<{ url: string; original_name: string; id: string }>) => {
    // Find which images were deleted
    const currentIds = images.map(img => img.id);
    const originalIds = existingImages.map(img => img.id);
    const deletedIds = originalIds.filter(id => !currentIds.includes(id));

    if (deletedIds.length > 0) {
      setDeletingImages(deletedIds);

      try {
        // For now, just update the state - you might want to add delete image API call
        setExistingImages(images);
        message.success(`${deletedIds.length} image(s) deleted successfully`);
      } catch (error) {
        message.error('Failed to delete some images. Please try again.');
        // Revert the UI state if deletion failed
        setExistingImages(existingImages);
      } finally {
        setDeletingImages([]);
      }
    } else {
      // No images were deleted, just update the state
      setExistingImages(images);
    }
  };

  // Utility function to get the diff between two objects (shallow and nested)
  function getDiff(original: any, updated: any) {
    const diff: any = {};
    for (const key in updated) {
      if (typeof updated[key] === "object" && updated[key] !== null && original[key]) {
        if (Array.isArray(updated[key]) && Array.isArray(original[key])) {
          if (JSON.stringify(updated[key]) !== JSON.stringify(original[key])) {
            diff[key] = updated[key];
          }
        } else {
          // For nested objects, do a deep diff
          const nestedDiff = getDiff(original[key], updated[key]);
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        }
      } else if (updated[key] !== original[key]) {
        diff[key] = updated[key];
      }
    }
    return diff;
  }

  const onUpdateEvent = async () => {
    // Final validation check before submission
    if (!validateTitle(addEventsDetails.name)) {
      message.error("Title must not exceed 22 characters");
      return;
    }
    
    if (!validatePrice(addEventsDetails.price, addEventsDetails.currency)) {
      message.error("Price must be more than $3 or its equivalent.");
      return;
    }

    // Create payload structure as expected by the API
    const updatePayload = {
      name: addEventsDetails.name,
      highlight: addEventsDetails.highlight,
      price: addEventsDetails.price,
      discount: addEventsDetails.discount,
      currency: addEventsDetails.currency,
      category: addEventsDetails.category,
      eventType: addEventsDetails.eventType,
      dateType: addEventsDetails.dateType,
      nbrOfDays: addEventsDetails.nbrOfDays,
      hoursPerDay: addEventsDetails.hoursPerDay,
      maxAttendances: addEventsDetails.maxAttendances,
      language: addEventsDetails.language,
      isDiscountAvailable: addEventsDetails.isDiscountAvailable === "yes",
      status: addEventsDetails.status,
      location: addEventsDetails.location,
      // Convert requirements to comma-separated string if it's an array
      requirements: Array.isArray(addEventsDetails.requirements) ? addEventsDetails.requirements.join(', ') : addEventsDetails.requirements,
      guestInformation: addEventsDetails.guestInformation,
      hostInformation: addEventsDetails.hostInformation,
      cancellationPolicy: addEventsDetails.cancellationPolicy,
      hostSkillLevel: addEventsDetails.hostSkillLevel,
      otherInformation: addEventsDetails.otherInformation,
      healthAndWellness: addEventsDetails.healthAndWellness,
      specialInterest: addEventsDetails.specialInterest,
      noOfPromotionDays: addEventsDetails.noOfPromotionDays,
      businessNature: addEventsDetails.businessNature,
      individualNbr: addEventsDetails.individualNbr,
      individualTaxIdNbr: addEventsDetails.individualTaxIdNbr,
      businessRegistrationNbr: addEventsDetails.businessRegistrationNbr,
      businessTaxIdNbr: addEventsDetails.businessTaxIdNbr,
      business: addEventsDetails.business,
      experiential: addEventsDetails.experiential,
      // Event type specific data
      ...(addEventsDetails.eventType === "ONLINE" ? {
        onlineEvent: {
          dateRanges: addEventsDetails.onlineEvent.dateRanges,
          platform: addEventsDetails.onlineEvent.platform,
          link: addEventsDetails.onlineEvent.link,
        }
      } : {
        onsiteEvent: {
          dateRanges: addEventsDetails?.onsiteEvent?.dateRanges,
          extraAmount: addEventsDetails?.onsiteEvent?.extraAmount,
          privateGroupHosting: addEventsDetails?.onsiteEvent?.privateGroupHosting,
          privateGroupHostingCharge: addEventsDetails?.onsiteEvent?.privateGroupHostingCharge,
          transferService: addEventsDetails?.onsiteEvent?.transferService,
          latitude: addEventsDetails?.onsiteEvent?.latitude,
          longitude: addEventsDetails?.onsiteEvent?.longitude,
        }
      })
    };

    // Only send changed fields
    const original = originalEventRef.current;
    const diffPayload = getDiff(original, updatePayload);
    // Always send new images as 'files' if present (and are File objects)
    if (
      addEventsDetails.photos &&
      Array.isArray(addEventsDetails.photos) &&
      addEventsDetails.photos.length > 0 &&
      addEventsDetails.photos[0] instanceof File
    ) {
      diffPayload.files = addEventsDetails.photos;
      if (diffPayload.photos) delete diffPayload.photos;
    }
    console.log('DIFF PAYLOAD:', diffPayload);
    if (Object.keys(diffPayload).length === 0) {
      message.info("No changes to update.");
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(updateEvent(diffPayload, eventId?.toString() || ""));
    } finally {
      setSubmitting(false);
    }
  };

  const {
    businessNature,
    individualNbr,
    individualTaxIdNbr,
    businessRegistrationNbr,
    businessTaxIdNbr,
  } = addEventsDetails;



  if (loading) return <Loader loading={loading} />;
  if (submitting) return <Loader loading={submitting} />;

  return (
    <div className="" >
      <div
        className={` flex gap-4 items-start justify-center listing-details-tabs mt-8 mb-8 md:mb-0`}
      >
        <div className={`absolute top-35 left-0 hidden md:flex`}>
          <div>
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
              {eventId ? (
                // Edit mode - show read-only event type
                <div className="border-2 border-fade-white p-4 rounded-lg">
                  <h3 className="text-dark-blue font-semibold mb-2">Event Type</h3>
                  <p className="text-gray-600">
                    {addEventsDetails.eventType === "ONLINE" ? "Online Event" : "Onsite Event"}
                  </p>
                </div>
              ) : (
                // Create mode - show radio buttons
                <RadioBox
                  items={select_events}
                  onChange={(e: RadioChangeEvent) =>
                    onRadioChange(e, "eventType")
                  }
                  value={addEventsDetails.eventType}
                />
              )}
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

              {addEventsDetails.location &&
                <div
                  className={`grid grid-rows-1 md:grid-cols-2 gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}>
                  <>
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
                          name={`onsiteEvent.latitude`}
                          title="Latitude"
                          onChange={({ target: { value } }: any) =>
                            dispatchEvent({
                              ...addEventsDetails,
                              onsiteEvent: {
                                ...addEventsDetails.onsiteEvent,
                                latitude: parseFloat(value) || 0,
                              },
                            })
                          }
                          placeholder="Enter latitude"
                          value={eventLatitude}
                        />
                        <DashboardInput
                          name={`onsiteEvent.longitude`}
                          title="Longitude"
                          onChange={({ target: { value } }: any) =>
                            dispatchEvent({
                              ...addEventsDetails,
                              onsiteEvent: {
                                ...addEventsDetails.onsiteEvent,
                                longitude: parseFloat(value) || 0,
                              },
                            })
                          }
                          placeholder="Enter longitude"
                          value={eventLongitude}
                        />
                      </div>
                    )}
                  </>
                </div>
              }
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
              <div className={`rounded-lg`}>
                <DashboardInput
                  name="name"
                  title="Name"
                  placeholder="Enter Name"
                  value={addEventsDetails.name}
                  onChange={(e) => {
                    onChangeHandler(e);
                    // Validate title length when it changes
                    validateTitle(e.target.value);
                  }}
                  error={titleError}
                  subTitle={`${addEventsDetails.name?.length || 0}/22 characters`}
                />
                <div className="mt-4">
                  <DashboardInput
                    name={`specialInterest`}
                    title="Subtitle"
                    placeholder="Enter subtitle"
                    type="textarea"
                    rows={3}
                    minLength={30}
                    maxLength={70}
                    value={String(addEventsDetails.specialInterest)}
                    subTitle={`Make it shorter and clear. (${addEventsDetails.specialInterest?.length || 0}/70 characters)`}
                    onChange={onChangeHandler}
                    error={addEventsDetails.specialInterest && addEventsDetails.specialInterest.length < 30 ? "Subtitle must be at least 30 characters long." : undefined}
                  />
                </div>
                <div className="mt-4">
                  <DashboardInput
                    name={`healthAndWellness`}
                    title="Description"
                    placeholder="Enter Description"
                    type="textarea"
                    minLength={400}
                    maxLength={800}
                    value={String(addEventsDetails.healthAndWellness)}
                    subTitle={`Describe what makes your event unique. (${addEventsDetails.healthAndWellness?.length || 0}/800 characters)`}
                    onChange={onChangeHandler}
                    error={addEventsDetails.healthAndWellness && addEventsDetails.healthAndWellness.length < 400 ? "Description must be at least 400 characters long." : undefined}
                  />
                </div>
                <ImageUploader
                  className={`mt-4`}
                  imageFiles={Array.isArray(addEventsDetails.photos) && addEventsDetails.photos.length > 0 && addEventsDetails.photos[0] instanceof File ? addEventsDetails.photos : []}
                  existingImages={existingImages}
                  onImagesSelected={({ files }) =>
                    dispatchEvent({
                      ...addEventsDetails,
                      photos: files,
                    })
                  }
                  onExistingImagesChange={handleExistingImagesChange}
                  deletingImages={deletingImages}
                />
              </div>

              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => onTabChange(`location`)}
                onClickNext={() => {
                  if (!addEventsDetails?.name)
                    return message.error(`Enter Name`);
                  if (!validateTitle(addEventsDetails.name))
                    return message.error(`Title must not exceed 22 characters`);

                  // In edit mode, we can have existing images OR new photos
                  const hasImages = addEventsDetails?.photos.length > 0 || existingImages.length > 0;
                  if (!hasImages)
                    return message.error(`Add Photos`);

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
                  {/* <DashboardInput
                    name={`highlight`}
                    onChange={onChangeHandler}
                    title="Highlight"
                    placeholder="Enter highlight"
                    value={String(addEventsDetails.highlight)}
                  /> */}
                </div>
                <div
                  className={`flex flex-col gap-4 items-start justify-start border-2 border-fade-white p-4 rounded-lg w-full`}
                >
                  <DashboardInput
                    name="price"
                    title="Price"
                    placeholder="Enter Price"
                    value={String(addEventsDetails.price)}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      onChangeHandler(e);
                      // Validate price when it changes
                      validatePrice(value, addEventsDetails.currency);
                    }}
                    error={priceError}
                    subTitle={`Minimum price: ${getMinimumPrice(addEventsDetails.currency).toFixed(2)} ${addEventsDetails.currency.toUpperCase()} (equivalent to $3 USD)`}
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
                    value={
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
                    value={
                      addEventsDetails.currency || currencies[0].value
                    }
                    style={{ width: `100%` }}
                    onChange={(value: string) => {
                      dispatchEvent({
                        ...addEventsDetails,
                        currency: value,
                      });
                      // Re-validate price when currency changes
                      if (addEventsDetails.price > 0) {
                        validatePrice(addEventsDetails.price, value);
                      }
                    }}
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
                        {`Essential Items`}
                      </h3>
                      <div
                        className={`border-2 border-fade-white w-full mt-2 rounded-lg`}
                      >
                        <Select
                          mode="multiple"
                          style={{ height: 40, width: "100%" }}
                          placeholder="Choose requirements"
                          value={addEventsDetails.requirements}
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
                      {/* Replace DashboardInput for Other Information with a Select like requirements */}
                      <h3 className={`text-dark-blue text-base font-semibold mt-2`}>
                        {`What's Included`}
                      </h3>
                      <div
                        className={`border border-light-gray w-full mt-2 rounded-lg`}
                      >

                        <Select
                          mode="multiple"
                          style={{ height: 40, width: "100%" }}
                          placeholder="Choose other information"

                          value={addEventsDetails.otherInformation ? addEventsDetails.
                            // @ts-expect-error: otherInformation may not always be a string, but we handle it safely here
                            otherInformation.split(',').map(s => s.trim()) : []}
                          onChange={(value) => {
                            dispatchEvent({
                              ...addEventsDetails,
                              otherInformation: value.join(', '),
                            });
                          }}
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
                                  placeholder="Please add other information"
                                  value={otherInformationName}
                                  onChange={onOtherInformationItemsChange}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  maxLength={40}
                                />
                                <AntdButton
                                  type="text"
                                  icon={<PlusOutlined />}
                                  onClick={addOtherInformation}
                                  className={`text-white bg-primary`}
                                >
                                  Add item
                                </AntdButton>
                              </Space>
                            </>
                          )}
                          options={otherInformationItems.map((item) => ({
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
                          value={addEventsDetails?.onsiteEvent?.transferService || "NOT_INCLUDED"}
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
                    // <div
                    //   className={`flex flex-col md:flex-row gap-4 justify-between items-center w-full`}
                    // >
                    //   <DashboardInput
                    //     name={`platform`}
                    //     title="Platform"
                    //     placeholder="Enter platform name"
                    //     value={String(addEventsDetails.onlineEvent?.platform || "")}
                    //     onChange={({ target: { value } }: any) =>
                    //       dispatchEvent({
                    //         ...addEventsDetails,
                    //         onlineEvent: {
                    //           ...addEventsDetails.onlineEvent,
                    //           platform: value,
                    //         },
                    //       })
                    //     }
                    //   />
                    //   <DashboardInput
                    //     name={`link`}
                    //     title="Link"
                    //     placeholder="Enter link"
                    //     value={String(addEventsDetails.onlineEvent?.link || "")}
                    //     onChange={({ target: { value } }: any) =>
                    //       dispatchEvent({
                    //         ...addEventsDetails,
                    //         onlineEvent: {
                    //           ...addEventsDetails.onlineEvent,
                    //           link: value,
                    //         },
                    //       })
                    //     }
                    //   />
                    // </div>
                    <></>
                  ) : (
                    <div
                      className={`flex gap-4 justify-between items-center w-full`}
                    >
                      <div className={`w-full`}>
                        <h3
                          className={`text-dark-blue text-base font-semibold`}
                        >{`Private Group Hosting`}</h3>
                        <Select
                          value={addEventsDetails?.onsiteEvent?.privateGroupHosting || "NOT_AVAILABLE"}
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
                          addEventsDetails?.onsiteEvent?.privateGroupHostingCharge
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
                        value={String(addEventsDetails?.onsiteEvent?.extraAmount)}
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
                    value={String(addEventsDetails?.guestInformation)}
                    onChange={onChangeHandler}
                  />
                  <DashboardInput
                    name={`hostInformation`}
                    title="Important Information"
                    placeholder="Enter Host Information"
                    value={String(addEventsDetails?.hostInformation)}
                    onChange={onChangeHandler}
                  />
                </div>
                <div
                  className={`flex flex-col gap-4 border-2 border-fade-white p-4 rounded-lg`}
                >
                  <div className="w-full mt-4">
                    <h3 className="text-dark-blue mb-2 font-semibold">Highlight</h3>
                    <ReactQuill
                      theme="snow"
                      value={addEventsDetails.highlight || ""}
                      onChange={(value: string) =>
                        dispatchEvent({
                          ...addEventsDetails,
                          highlight: value,
                        })
                      }
                      placeholder="Enter highlight"
                      className="bg-white rounded"
                    />
                  </div>
                  <DashboardInput
                    name={`cancellationPolicy`}
                    title="Cancellation Policy"
                    placeholder="Enter Cancellation Policy"
                    value={String(addEventsDetails?.cancellationPolicy)}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />

              <TabButtons
                nextTite="Update"
                onClickBack={() => onTabChange(`category`)}
                onClickNext={onUpdateEvent}
              />
            </Tab>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;