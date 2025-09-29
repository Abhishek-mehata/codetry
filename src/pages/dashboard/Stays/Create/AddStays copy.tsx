// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { FC, ReactNode, useState } from "react";
// import { Divider, Tabs, message } from "antd";
// import {
//   BusinessForm,
//   DashboardInput,
//   ImageUploader,
//   SearchMap,
//   TabButtons,
//   TabIntro,
// } from "../../../../components";
// import { placeInitState, staysItems } from "../../../../lib/constants/stays";
// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../../hooks/useTypedSelectors";
// import { storeNewPlaceDetails } from "../../../../redux/reducers/places";
// import { RootAppState } from "../../../../redux/store";
// import { useObjectValidation } from "../../../../hooks";
// // import { useNavigate } from "react-router-dom";
// import { createPlace } from "../../../../redux/actions/places";
// import { useNavigate } from "react-router-dom";


// const Tab: FC<{ children: ReactNode; className?: string }> = ({
//   children,
//   className,
// }) => (
//   <div className={`bg-white p-6 rounded shadow-md ${className}`}>
//     {children}
//   </div>
// );

// const AddStaysPage = () => {
//   // const navigate = useNavigate();
//   const dispatch = useAppDispatch()
//   const navigate = useNavigate(); //  Get navigate function

//   const { validate } = useObjectValidation();
//   const [currentTab, setCurrentTab] = useState<string>(
//     staysItems[0]?.key as string
//   );
//   const { mapMarkedLocation, addPlaceDetails } = useAppSelector(
//     (state: RootAppState) => state.places
//   );

//   const onChangeHandler = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     dispatch(
//       storeNewPlaceDetails({
//         ...addPlaceDetails,
//         [name]: value,
//       })
//     );
//   };

//   const addPalce = () => {
//     const {
//       individualNbr,
//       individualTaxIdNbr,
//       businessRegistrationNbr,
//       businessTaxIdNbr,
//       ...rest
//     } = addPlaceDetails;

//     // if (addPlaceDetails.description.length <= 400)
//     //   return message.error(`Description must be at least 400 characters`);

//     const isValid = validate(rest);

//     // if (addPlaceDetails.images.length !== 5) {
//     //   return message.error(`Please upload exactly 5 images.`);
//     // }

//     if (!isValid.length) {
//       // const data = {
//       //   ...rest,
//       // };

//       const formData = new FormData();

//       Object.entries(addPlaceDetails).forEach(([key, value]) => {
//         if (typeof value === "string" || typeof value === "number") {
//           if (String(value).length > 0) {
//             formData.set(key, String(value));
//           }
//         }
//       });

//       addPlaceDetails.images.forEach((image: File) => {
//         formData.append(`photos`, image);
//       });

//       dispatch(createPlace(formData,navigate));
//       dispatch(storeNewPlaceDetails(placeInitState));
//       // navigate(`/app/stays`);
//     }
//   };

//   const onTabChange = (key: string) => setCurrentTab(key);

//   const {
//     businessNature,
//     individualNbr,
//     individualTaxIdNbr,
//     businessRegistrationNbr,
//     businessTaxIdNbr,
//   } = addPlaceDetails;

//   return (
//     <div>
//       <div
//         className={`flex gap-4 items-start justify-center listing-details-tabs mt-8`}
//       >
//         <div className={`w-1/5 flex flex-col gap-8 items-start justify-center`}>
//           <div
//             className={`relative flex flex-col gap-6 items-start justify-center overlay`}
//           >
//             <Tabs
//               tabPosition={`right`}
//               defaultActiveKey="1"
//               items={staysItems}
//               onChange={onTabChange}
//               indicator={{ size: (origin) => origin + 6, align: `center` }}
//               activeKey={currentTab}
//             />
//           </div>
//         </div>
//         <div className={`w-4/5`}>
//           {/* Location */}
//           {currentTab === "location" && (
//             <Tab>
//               <TabIntro
//                 title={`Specify your Stay location`}
//                 intro={`Let's get started by specifying the location where you want to host your event.`}
//               />
//               <div
//                 className={`grid grid-rows-1 grid-cols-3 gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}
//               >
//                 <DashboardInput
//                   name={`country`}
//                   title="Country"
//                   placeholder="Enter Country"
//                   value={String(addPlaceDetails.country)}
//                   onChange={onChangeHandler}
//                 />
//                 <DashboardInput
//                   name={`city`}
//                   title="City"
//                   placeholder="Enter City"
//                   value={String(addPlaceDetails.city)}
//                   onChange={onChangeHandler}
//                 />
//                 <DashboardInput
//                   name={`street`}
//                   onChange={onChangeHandler}
//                   title="Street"
//                   placeholder="Enter street"
//                   value={String(addPlaceDetails.street)}
//                 />
//                 <DashboardInput
//                   name={`province`}
//                   title="Province"
//                   placeholder="Enter province"
//                   value={String(addPlaceDetails.province)}
//                   onChange={onChangeHandler}
//                 />
//                 <DashboardInput
//                   name={`postal_code`}
//                   title="Postal code"
//                   placeholder="Enter postal code"
//                   value={String(addPlaceDetails.postal_code)}
//                   onChange={onChangeHandler}
//                 />
//                 <div className={`flex gap-2`}>
//                   <DashboardInput
//                     name={`latitude`}
//                     title="Latitude"
//                     onChange={onChangeHandler}
//                     placeholder="Enter latitude"
//                     value={String(addPlaceDetails.latitude)}
//                   />
//                   <DashboardInput
//                     name={`longitude`}
//                     title="Longitude"
//                     onChange={onChangeHandler}
//                     placeholder="Enter longitude"
//                     value={String(addPlaceDetails.longitude)}
//                   />
//                 </div>
//               </div>
//               <SearchMap
//                 mapDetails={(data) => {
//                   const {
//                     country,
//                     city,
//                     address,
//                     geometry: { lat: latitude, lng: longitude },
//                     postalCode,
//                     state,
//                   } = data;

//                   const location = {
//                     ...addPlaceDetails,
//                     city,
//                     country,
//                     latitude,
//                     longitude,
//                     street: address,
//                     province: state,
//                     postal_code: String(postalCode),
//                   };

//                   dispatch(storeNewPlaceDetails(location));
//                 }}
//               />
//               <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
//               <TabButtons
//                 backDisabled={true}
//                 onClickNext={() => {
//                   if (!mapMarkedLocation?.country)
//                     return message.error(`Mark a location`);

//                   onTabChange(`business`);
//                 }}
//               />
//             </Tab>
//           )}

//           {/* business */}
//           {currentTab === "business" && (
//             <Tab>
//               <TabIntro
//                 title={`Tell us about your business`}
//                 intro="Share some details about your business and the type of listing you want to host."
//               />

//               <BusinessForm
//                 businessData={{
//                   businessNature:
//                     businessNature === "INDIVIDUAL" ? "INDIVIDUAL" : "BUSINESS",
//                   individualNbr,
//                   individualTaxIdNbr,
//                   businessRegistrationNbr,
//                   businessTaxIdNbr,
//                 }}
//                 getBusinessData={({
//                   businessNature,
//                   individualNbr,
//                   individualTaxIdNbr,
//                   businessRegistrationNbr,
//                   businessTaxIdNbr,
//                 }) => {
//                   const business = {
//                     ...addPlaceDetails,
//                     businessNature,
//                     individualNbr,
//                     individualTaxIdNbr,
//                     businessRegistrationNbr,
//                     businessTaxIdNbr,
//                   };

//                   dispatch(storeNewPlaceDetails(business));
//                 }}
//               />

//               <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
//               <TabButtons
//                 onClickBack={() => onTabChange(`location`)}
//                 onClickNext={() => onTabChange(`details`)}
//               />
//             </Tab>
//           )}

//           {/* Details */}
//           {currentTab === "details" && (
//             <Tab>
//               <TabIntro
//                 title={`Provide details about your listing`}
//                 intro={`Include details about your listing to help guests find the right fit.`}
//               />

//               <div className={`flex gap-10 h-auto w-full`}>
//                 <div className={`w-2/4`}>
//                   <DashboardInput
//                     title={`Title`}
//                     value={addPlaceDetails.title}
//                     subTitle={`Make it short and clear. It will appear on search results.`}
//                     placeholder="exp: Romantic Spanish villa - 5 min from the beach"
//                     onChange={(e) =>
//                       dispatch(
//                         storeNewPlaceDetails({
//                           ...addPlaceDetails,
//                           title: e.target.value,
//                         })
//                       )
//                     }
//                   />

//                   <DashboardInput
//                     title={`Sub Title`}
//                     className={`mt-6`}
//                     value={addPlaceDetails.subtitle}
//                     subTitle={`Make it shorter and clear.`}
//                     placeholder="exp: Romantic Spanish villa"
//                     onChange={(e) =>
//                       dispatch(
//                         storeNewPlaceDetails({
//                           ...addPlaceDetails,
//                           subtitle: e.target.value,
//                         })
//                       )
//                     }
//                   />

//                   <DashboardInput
//                     title={`Description`}
//                     className={`mt-6`}
//                     type="text"
//                     minLength={400}
//                     maxLength={800}
//                     value={addPlaceDetails.description}
//                     subTitle={`Describe what makes your space unique.`}
//                     placeholder="exp: Romantic Spanish villa - 5 min from the beach"
//                     onChange={(e) =>
//                       dispatch(
//                         storeNewPlaceDetails({
//                           ...addPlaceDetails,
//                           description: e.target.value,
//                         })
//                       )
//                     }
//                   />
//                 </div>
//                 <div className={`w-2/4`}>
//                   <h3 className={`text-dark-blue text-base font-semibold`}>
//                     Photos
//                   </h3>
//                   <h5 className={`text-gray text-sm mt-1`}>
//                     Add photos to show off your space, especially when guests
//                     are staying.
//                   </h5>
//                   <ImageUploader
//                     className={`mt-12`}
//                     imageFiles={addPlaceDetails.images}
//                     onImagesSelected={({ files }) =>
//                       dispatch(
//                         storeNewPlaceDetails({
//                           ...addPlaceDetails,
//                           images: files,
//                         })
//                       )
//                     }
//                   />
//                 </div>
//               </div>

//               <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
//               <TabButtons
//                 nextTite="Save"
//                 onClickBack={() => onTabChange(`business`)}
//                 onClickNext={() => addPalce()}
//               />
//             </Tab>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddStaysPage;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactNode, useState } from "react";
import { Divider, Tabs, message,Checkbox } from "antd";
import {
  BusinessForm,
  DashboardInput,
  ImageUploader,
  SearchMap,
  TabButtons,
  TabIntro,
} from "../../../../components";
import { placeInitState, staysItems } from "../../../../lib/constants/stays";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useTypedSelectors";
import { storeNewPlaceDetails } from "../../../../redux/reducers/places";
import { RootAppState } from "../../../../redux/store";
import { useObjectValidation } from "../../../../hooks";
// import { useNavigate } from "react-router-dom";
import { createPlace } from "../../../../redux/actions/places";
import { useNavigate } from "react-router-dom";


const Tab: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`bg-white p-6 rounded shadow-md ${className}`}>
    {children}
  </div>
);

const AddStaysPage = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const navigate = useNavigate(); //  Get navigate function
  const { mapMarkedLocation, addPlaceDetails } = useAppSelector(
    (state: RootAppState) => state.places
  );
  const allAmenities = [
    "Essentials", "TV", "Cable TV", "Air Conditioning", "Heating", "Kitchen",
    "Internet", "Gym", "Elevator in Building", "Indoor Fireplace", "Buzzer/Wireless Intercom",
    "Doorman", "Shampoo", "Wireless Internet", "Hot Tub", "Washer", "Pool", "Dryer",
    "Breakfast", "Free Parking on Premises", "Family/Kid Friendly", "Smoking Allowed",
    "Suitable for Events", "Pets Allowed", "Pets live on this property", "Wheelchair Accessible"
  ];
  
  const allSafetyAmenities = [
    "Smoke Detector", "Carbon Monoxide Detector", "First Aid Kit", "Safety Card", "Fire Extinguisher"
  ];
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(addPlaceDetails.amenities || []);
  const [selectedSafetyAmenities, setSelectedSafetyAmenities] = useState<string[]>(addPlaceDetails.safetyAmenities || []);
  
  const onAmenitiesChange = (checkedValues: string[]) => {
    setSelectedAmenities(checkedValues);
    dispatch(
      storeNewPlaceDetails({
        ...addPlaceDetails,
        amenities: checkedValues,
      })
    );
  };

  const onSafetyAmenitiesChange = (checkedValues: string[]) => {
    setSelectedSafetyAmenities(checkedValues);
    dispatch(
      storeNewPlaceDetails({
        ...addPlaceDetails,
        safetyAmenities: checkedValues,
      })
    );
  };


  const { validate } = useObjectValidation();
  const [currentTab, setCurrentTab] = useState<string>(
    staysItems[0]?.key as string
  );
  
  // const onChangeHandler = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;

  //   dispatch(
  //     storeNewPlaceDetails({
  //       ...addPlaceDetails,
  //       [name]: value,
  //     })
  //   );
  // };
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    dispatch(
      storeNewPlaceDetails({
        ...addPlaceDetails,
        [name]: name === "latitude" || name === "longitude" ? parseFloat(value) : value,
      })
    );
  };
  const addPalce = () => {
    const {
      individualNbr,
      individualTaxIdNbr,
      businessRegistrationNbr,
      businessTaxIdNbr,
      ...rest
    } = addPlaceDetails;

    // if (addPlaceDetails.description.length <= 400)
    //   return message.error(`Description must be at least 400 characters`);

    const isValid = validate(rest);

    // if (addPlaceDetails.images.length !== 5) {
    //   return message.error(`Please upload exactly 5 images.`);
    // }

    if (!isValid.length) {
      // const data = {
      //   ...rest,
      // };

      const formData = new FormData();
      formData.append("amenities", JSON.stringify(addPlaceDetails.amenities || []));
    formData.append("safetyAmenities", JSON.stringify(addPlaceDetails.safetyAmenities || []));



      Object.entries(addPlaceDetails).forEach(([key, value]) => {
        if (typeof value === "string" || typeof value === "number") {
          if (String(value).length > 0) {
            formData.set(key, String(value));
          }
        }
      });

      addPlaceDetails.images.forEach((image: File) => {
        formData.append(`photos`, image);
      });

      dispatch(createPlace(formData,navigate));
      dispatch(storeNewPlaceDetails(placeInitState));
      // navigate(`/app/stays`);
    }
  };

  const onTabChange = (key: string) => setCurrentTab(key);

  const {
    businessNature,
    individualNbr,
    individualTaxIdNbr,
    businessRegistrationNbr,
    businessTaxIdNbr,
  } = addPlaceDetails;

  return (
    <div className=" flex  justify-center md:justify-normal md:flex-none" >
      <div
        className={` flex gap-4 items-start justify-center listing-details-tabs mt-8`}
      >
        <div className={`w-1/5 hidden  md:flex flex-col gap-8 items-start justify-center `}>
          <div
            className={` relative md:flex md:flex-col md:gap-6 md:items-start md:justify-center `}
          >
            <Tabs
              tabPosition={`right`}
              defaultActiveKey="1"
              items={staysItems}
              onChange={onTabChange}
              indicator={{ size: (origin) => origin + 6, align: `center` }}
              activeKey={currentTab}
            />
          </div>
        </div>
        {/* <div className={`absolute top-35 left-0 hidden md:flex`}>
          <div
            className={` `}
          >
            <Tabs
              tabPosition={`right`}
              defaultActiveKey="1"
              items={staysItems}
              onChange={onTabChange}
              indicator={{ size: (origin) => origin + 6, align: `center` }}
              activeKey={currentTab}
            />
          </div>
        </div> */}
        <div className={`md:w-4/5 w-full overflow-x-hidden `}>
          {/* Location */}
          {currentTab === "location" && (
            <Tab>
              <TabIntro
                title={`Specify your Stay location`}
                intro={`Let's get started by specifying the location where you want to host your event.`}
              />
              <div
                // className={`grid grid-rows-1 grid-cols-3 gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}X
                className={`md:grid md:grid-rows-1 md:grid-cols-3 flex flex-col gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}
              >
                <DashboardInput
                  name={`country`}
                  title="Country"
                  placeholder="Enter Country"
                  value={String(addPlaceDetails.country)}
                  onChange={onChangeHandler}
                />
                <DashboardInput
                  name={`city`}
                  title="City"
                  placeholder="Enter City"
                  value={String(addPlaceDetails.city)}
                  onChange={onChangeHandler}
                />
                <DashboardInput
                  name={`street`}
                  onChange={onChangeHandler}
                  title="Street"
                  placeholder="Enter street"
                  value={String(addPlaceDetails.street)}
                />
                <DashboardInput
                  name={`province`}
                  title="Province"
                  placeholder="Enter province"
                  value={String(addPlaceDetails.province)}
                  onChange={onChangeHandler}
                />
                <DashboardInput
                  name={`postal_code`}
                  title="Postal code"
                  placeholder="Enter postal code"
                  value={String(addPlaceDetails.postal_code)}
                  onChange={onChangeHandler}
                />
                <div className={`flex gap-2 `}>
                  <DashboardInput
                    name={`latitude`}
                    title="Latitude"
                    onChange={onChangeHandler}
                    placeholder="Enter latitude"
                    value={String(addPlaceDetails.latitude)}
                  />
                  <DashboardInput
                    name={`longitude`}
                    title="Longitude"
                    onChange={onChangeHandler}
                    placeholder="Enter longitude"
                    value={String(addPlaceDetails.longitude)}
                  />
                </div>
              </div>
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
                    ...addPlaceDetails,
                    city,
                    country,
                    latitude,
                    longitude,
                    street: address,
                    province: state,
                    postal_code: String(postalCode),
                  };
                  dispatch(storeNewPlaceDetails(location));
                }}
              />
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                backDisabled={true}
                onClickNext={() => {
                  if (!mapMarkedLocation?.country)
                    return message.error(`Mark a location`);

                  onTabChange(`business`);
                }}
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
                    ...addPlaceDetails,
                    businessNature,
                    individualNbr,
                    individualTaxIdNbr,
                    businessRegistrationNbr,
                    businessTaxIdNbr,
                  };

                  dispatch(storeNewPlaceDetails(business));
                }}
              />

              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                onClickBack={() => onTabChange(`location`)}
                onClickNext={() => onTabChange(`details`)}
              />
            </Tab>
          )}

          {/* Details */}
          {currentTab === "details" && (
            <Tab>
              <TabIntro
                title={`Provide details about your listing`}
                intro={`Include details about your listing to help guests find the right fit.`}
              />

              <div className={` text-wrap md:flex md:gap-10 h-auto w-full`}>
                <div className={`md:w-2/4`}>
                  <DashboardInput
                    title={`Title`}
                    value={addPlaceDetails.title}
                    subTitle={`Make it short and clear. It will appear on search results.`}
                    placeholder="exp: Romantic Spanish villa - 5 min from the beach"
                    onChange={(e) =>
                      dispatch(
                        storeNewPlaceDetails({
                          ...addPlaceDetails,
                          title: e.target.value,
                        })
                      )
                    }
                  />
                  <h3 className="text-dark-blue text-base font-semibold mt-6">
                    Amenities
                  </h3>
                  <Checkbox.Group
                    options={allAmenities}
                    value={selectedAmenities} // ✅ Uses state
                    onChange={onAmenitiesChange} // ✅ Updates Redux store
                    className="md:grid md:grid-cols-2 md:gap-2 flex flex-col gap-2 mt-2"
                  />

                  {/* ✅ Safety Amenities Checkbox Group */}
                  <h3 className="text-dark-blue text-base font-semibold mt-6">
                    Safety Amenities
                  </h3>
                  <Checkbox.Group
                    options={allSafetyAmenities}
                    value={selectedSafetyAmenities} // ✅ Uses state
                    onChange={onSafetyAmenitiesChange} // ✅ Updates Redux store
                    className="md:grid md:grid-cols-2 md:gap-2 flex flex-col gap-2 mt-2"
                  />

                  <DashboardInput
                    title={`Sub Title`}
                    className={`mt-6`}
                    value={addPlaceDetails.subtitle}
                    subTitle={`Make it shorter and clear.`}
                    placeholder="exp: Romantic Spanish villa"
                    onChange={(e) =>
                      dispatch(
                        storeNewPlaceDetails({
                          ...addPlaceDetails,
                          subtitle: e.target.value,
                        })
                      )
                    }
                  />

                  <DashboardInput
                    title={`Description`}
                    className={`mt-6`}
                    type="text"
                    minLength={400}
                    maxLength={800}
                    value={addPlaceDetails.description}
                    subTitle={`Describe what makes your space unique.`}
                    placeholder="exp: Romantic Spanish villa - 5 min from the beach"
                    onChange={(e) =>
                      dispatch(
                        storeNewPlaceDetails({
                          ...addPlaceDetails,
                          description: e.target.value,
                        })
                      )
                    }
                  />
                </div>

                <div className={`md:w-2/4`}>
                  <h3 className={`text-dark-blue text-base font-semibold mt-5`}>
                    Photos
                  </h3>
                  <h5 className={`text-gray text-sm mt-1`}>
                    Add photos to show off your space, especially when guests
                    are staying.
                  </h5>
                  <ImageUploader
                    className={`mt-12`}
                    imageFiles={addPlaceDetails.images}
                    onImagesSelected={({ files }) =>
                      dispatch(
                        storeNewPlaceDetails({
                          ...addPlaceDetails,
                          images: files,
                        })
                      )
                    }
                  />
                </div>
              </div>

              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                nextTite="Save"
                onClickBack={() => onTabChange(`business`)}
                onClickNext={() => addPalce()}
              />
            </Tab>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStaysPage;
