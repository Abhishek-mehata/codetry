import { FC, ReactNode, useEffect, useState } from "react";
import { Divider, Tabs, message, Checkbox } from "antd";
import {
  BusinessForm,
  DashboardInput,
  ImageUploader,
  Loader,
  SearchMap,
  TabButtons,
  TabIntro,
} from "../../../../components";
import { staysItems } from "../../../../lib/constants/stays";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useTypedSelectors";
import { storeNewPlaceDetails } from "../../../../redux/reducers/places";
import { RootAppState } from "../../../../redux/store";
import { useObjectValidation } from "../../../../hooks";
import { useParams } from "react-router-dom";
import { getPlaceById, updateStay, deletePlaceImage } from "../../../../redux/actions/places";

const Tab: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`bg-white p-6 rounded shadow-md ${className}`}>{children}</div>
);

const StaysEditPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { addPlaceDetails } = useAppSelector((state: RootAppState) => state.places);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<Array<{ url: string; original_name: string; id: string }>>([]);
  const [deletingImages, setDeletingImages] = useState<string[]>([]);
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
  const { validate } = useObjectValidation();
  const [currentTab, setCurrentTab] = useState<string>(staysItems[0]?.key as string);

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(getPlaceById(Number(id))).then((res: { amenities?: string[]; safetyAmenities?: string[]; images?: { url: string; original_name?: string; id: string }[] }) => {
        // Extract images from response and store them separately
        const apiImages = res.images || [];
        setExistingImages(apiImages.map(img => ({
          url: img.url,
          original_name: img.original_name || 'image',
          id: img.id
        })));
        
        // Store other data in addPlaceDetails (excluding images)
        const { images, ...otherData } = res;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        void images; // Suppress unused variable warning
        
        // Spread otherData first so API data overrides defaults
        dispatch(storeNewPlaceDetails({
          ...addPlaceDetails, // Start with default values
          ...otherData, // Override with API data
          images: addPlaceDetails.images, // Keep existing images array for new uploads
        }));
        
        setSelectedAmenities(res.amenities || []);
        setSelectedSafetyAmenities(res.safetyAmenities || []);
        setLoading(false);
      });
    }
  }, [id, dispatch]);

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

  const handleExistingImagesChange = async (images: Array<{ url: string; original_name: string; id: string }>) => {
    // Find which images were deleted
    const currentIds = images.map(img => img.id);
    const originalIds = existingImages.map(img => img.id);
    const deletedIds = originalIds.filter(id => !currentIds.includes(id));
    
    if (deletedIds.length > 0) {
      setDeletingImages(deletedIds);
      
      try {
        // Delete each image from the backend
        for (const imageId of deletedIds) {
          if (id) {
            await dispatch(deletePlaceImage(id, imageId));
          }
        }
        
        // Update the state after successful deletion
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

  const updatePlaceHandler = () => {
    const { images, ...rest } = addPlaceDetails; // Exclude images from the main data
    
    // For updates, we only need to validate that we have at least one image
    // and that the basic required fields are present
    const hasImages = existingImages.length > 0 || images.length > 0;
    
    // Only validate essential fields for updates
    const essentialFields = {
      title: rest.title,
      description: rest.description,
      // Only validate location if it's being changed (not empty/0)
      ...(rest.latitude !== 0 && rest.longitude !== 0 && {
        latitude: rest.latitude,
        longitude: rest.longitude
      }),
      ...(rest.street && { street: rest.street }),
      ...(rest.city && { city: rest.city }),
      ...(rest.province && { province: rest.province }),
      ...(rest.country && { country: rest.country })
    };
  
    const isValid = validate(essentialFields);
    
    if (!isValid.length && hasImages) {
      setSubmitting(true);
      const formData = new FormData();
      
      // Only send specific known fields that the backend expects
      const allowedFields = [
        'title', 'description', 'subtitle', 'street', 'city', 'province', 
        'postal_code', 'country', 'latitude', 'longitude', 'businessNature',
        'individualNbr', 'individualTaxIdNbr', 'businessRegistrationNbr', 
        'businessTaxIdNbr', 'place_type', 'booking_policy', 'listing_status'
      ];
      
      // Add only allowed fields
      allowedFields.forEach(field => {
        const value = rest[field as keyof typeof rest];
        if (value !== undefined && value !== null && value !== '') {
          formData.append(field, String(value));
        }
      });
      
      // Add amenities and safety amenities as JSON strings
      if (addPlaceDetails.amenities && addPlaceDetails.amenities.length > 0) {
        formData.append("amenities", JSON.stringify(addPlaceDetails.amenities));
      }
      if (addPlaceDetails.safetyAmenities && addPlaceDetails.safetyAmenities.length > 0) {
        formData.append("safetyAmenities", JSON.stringify(addPlaceDetails.safetyAmenities));
      }
      
      // Add new uploaded images
      images
        .filter((image): image is File => image instanceof File)
        .forEach((image) => {
          formData.append(`images`, image);
        });
      
      if (id) {
        dispatch(updateStay(formData, id.toString())).finally(() => {
          setSubmitting(false);
          // Clear new images after successful update
          dispatch(storeNewPlaceDetails({
            ...addPlaceDetails,
            images: []
          }));
        });
      }
    } else if (!hasImages) {
      message.error("Please upload at least one image");
    } else {
      message.error("Please fill in all required fields");
    }
  };

  const onTabChange = (key: string) => setCurrentTab(key);
  const { businessNature } = addPlaceDetails;

  if (loading) return <Loader loading={loading} />;
  if (submitting) return <Loader loading={submitting} />;
  return (
    <div className=" flex justify-center md:justify-normal md:flex-none" >
      <div className={`flex gap-4 items-start justify-center listing-details-tabs mt-8`}>
        <div className={`w-1/5 hidden  md:flex flex-col gap-8 items-start justify-center `}>
          <div className={` relative md:flex md:flex-col md:gap-6 md:items-start md:justify-center `}>
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
        <div className={`md:w-4/5 w-full overflow-x-hidden `}>
          {/* Location */}
          {currentTab === "location" && (
            <Tab>
              <TabIntro
                title={`Edit your Stay location`}
                intro={`Update the location where you host your event.`}
              />
              <div className={`md:grid md:grid-rows-1 md:grid-cols-3 flex flex-col gap-4 border-2 border-fade-white p-4 mb-4 rounded-lg w-full`}>
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
                  if (!addPlaceDetails?.country)
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
                title={`Edit your business details`}
                intro="Update details about your business and the type of listing you want to host."
              />
              <BusinessForm
                businessData={{
                  ...addPlaceDetails,
                  businessNature: businessNature === "INDIVIDUAL" ? "INDIVIDUAL" : "BUSINESS"
                }}
                getBusinessData={(data) => {
                  const business = {
                    ...addPlaceDetails,
                    ...data,
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
                title={`Edit your listing details`}
                intro={`Update details about your listing to help guests find the right fit.`}
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
                    value={selectedAmenities}
                    onChange={onAmenitiesChange}
                    className="md:grid md:grid-cols-2 md:gap-2 flex flex-col gap-2 mt-2"
                  />
                  <h3 className="text-dark-blue text-base font-semibold mt-6">
                    Safety Amenities
                  </h3>
                  <Checkbox.Group
                    options={allSafetyAmenities}
                    value={selectedSafetyAmenities}
                    onChange={onSafetyAmenitiesChange}
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
                    existingImages={existingImages}
                    onImagesSelected={({ files }) =>
                      dispatch(
                        storeNewPlaceDetails({
                          ...addPlaceDetails,
                          images: files,
                        })
                      )
                    }
                    onExistingImagesChange={handleExistingImagesChange}
                    deletingImages={deletingImages}
                  />
                </div>
              </div>
              <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
              <TabButtons
                nextTite="Save"
                onClickBack={() => onTabChange(`business`)}
                onClickNext={() => updatePlaceHandler()}
                loading={submitting}
                nextDisabled={submitting}
              />
            </Tab>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaysEditPage;