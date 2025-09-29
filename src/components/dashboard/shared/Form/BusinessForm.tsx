import { Dropdown, MenuProps } from "antd";
import { ChangeEvent, useEffect, useState, forwardRef, useImperativeHandle } from "react";
// import {
//   business_offer,
//   business_offer_experience_type,
// } from "../../../../lib/constants/stays";
import DashboardInput from "../DashboardInput";
// import RadioBox from "../RadioBox";
import {
  businessEvent,
  businessOffer,
} from "../../../../lib/constants/dashboard";
import { MdKeyboardArrowDown } from "react-icons/md";
import { business_items } from "../../../../lib/constants/events";
import { Button } from "../../..";

type BusinessNatureType = "INDIVIDUAL" | "BUSINESS";
type BusinessOfferType = "accomodation" | "experience";
type BusinessEventType = "ONLINE" | "ONSITE";

interface FormModal {
  businessNature: BusinessNatureType;
  individualNbr: string;
  individualTaxIdNbr: string;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
  businessOffer: 1 | 2;
  businessEvent: 1 | 2;
}

const formInitState: FormModal = {
  businessNature: "INDIVIDUAL",
  individualNbr: "",
  individualTaxIdNbr: "",
  businessRegistrationNbr: "",
  businessTaxIdNbr: "",
  businessOffer: 1,
  businessEvent: 1,
};

type PlacesType = {
  businessNature: BusinessNatureType;
  individualNbr: string;
  individualTaxIdNbr: string;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
};

type EventsType = {
  businessNature: BusinessNatureType;
  businessOffer: BusinessOfferType;
  individualNbr: string;
  individualTaxIdNbr: string;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
  eventType: BusinessEventType;
};

interface Props {
  formType?: "places" | "events";
  businessData: PlacesType | EventsType;
  getBusinessData?: (data: PlacesType | EventsType) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export interface BusinessFormRef {
  validate: () => boolean;
}

const BusinessForm = forwardRef<BusinessFormRef, Props>(({
  businessData,
  getBusinessData,
  formType = "places",
  onValidationChange,
}, ref) => {
  const [formState, setFormState] = useState<FormModal>(formInitState);
  const [businessItem, setBusinessItem] = useState<string>(
    businessData.businessNature
  );
  const [errors, setErrors] = useState<{
    businessRegistrationNbr?: string;
    businessTaxIdNbr?: string;
  }>({});

  // Validation function - will be called when user tries to navigate
  const validateForm = () => {
    const newErrors: {
      businessRegistrationNbr?: string;
      businessTaxIdNbr?: string;
    } = {};

    if (formState.businessNature === "BUSINESS") {
      if (!formState.businessRegistrationNbr.trim()) {
        newErrors.businessRegistrationNbr = "Company Registration Number is required";
      }
      if (!formState.businessTaxIdNbr.trim()) {
        newErrors.businessTaxIdNbr = "Company Tax ID Number is required";
      }
    }

    setErrors(newErrors);
    
    // Check if form is valid
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange?.(isValid);
    
    return isValid;
  };

  // Expose validation method to parent component
  useImperativeHandle(ref, () => ({
    validate: validateForm
  }));

  useEffect(() => {
    setFormState({
      businessNature: businessData.businessNature,
      individualNbr: businessData.individualNbr,
      individualTaxIdNbr: businessData.individualTaxIdNbr,
      businessRegistrationNbr: businessData.businessRegistrationNbr,
      businessTaxIdNbr: businessData.businessTaxIdNbr,
      businessOffer: 1,
      businessEvent: 1,
    });
  }, []);

  // Expose validation function to parent component
  useEffect(() => {
    if (onValidationChange) {
      // Set initial validation state
      const isValid = formState.businessNature === "INDIVIDUAL" || 
        (formState.businessNature === "BUSINESS" && 
         Boolean(formState.businessRegistrationNbr.trim()) && 
         Boolean(formState.businessTaxIdNbr.trim()));
      onValidationChange(isValid);
    }
  }, [formState, onValidationChange]);

  useEffect(() => {
    if (getBusinessData) {
      let data: Partial<PlacesType & EventsType> = {
        businessNature: formState.businessNature,
        individualNbr: formState.individualNbr,
        individualTaxIdNbr: formState.individualTaxIdNbr,
        businessRegistrationNbr: formState.businessRegistrationNbr,
        businessTaxIdNbr: formState.businessTaxIdNbr,
      };

      if (formType === "events") {
        data = {
          ...data,
          businessOffer: businessOffer[formState.businessOffer],
          eventType: businessEvent[formState.businessEvent],
        } as EventsType;
      }

      getBusinessData(
        formType === "places" ? (data as PlacesType) : (data as EventsType)
      );
    }
  }, [formState]);

  const onChangehandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const onBussinessItemClick: MenuProps["onClick"] = ({ key }) => {
    setBusinessItem(key);
    setFormState({
      ...formState,
      businessNature: key as BusinessNatureType,
    });
    // Clear errors when switching business nature
    setErrors({});
  };

  return (
    <div className={`w-full`}>
      <div className={`mt-8 rounded-lg`}>
        <div className={`border border-light-gray p-4 rounded-lg`}>
          <h3 className={`text-dark-blue mb-2 font-semibold`}>
            Select Business Nature
          </h3>
          <Dropdown
            menu={{
              selectable: true,
              items: business_items,
              defaultSelectedKeys: [
                businessData.businessNature.toLocaleLowerCase(),
              ],
              onClick: onBussinessItemClick,
            }}
            trigger={["click"]}
            className={`w-44`}
          >
            <Button
              title={businessItem === "INDIVIDUAL" ? "Individual" : "Company"}
              iconPlacement="right"
              icon={
                <MdKeyboardArrowDown
                  className={`text-primary text-xl group-hover:text-white`}
                />
              }
            />
          </Dropdown>
        </div>
        <div className={`mt-4 border border-light-gray p-4 rounded-lg`}>
          <div className={`md:flex md:gap-4 md:flex-row flex flex-col gap-3`}>
            <DashboardInput
              name={
                formState.businessNature === "INDIVIDUAL"
                  ? `individualNbr`
                  : `businessRegistrationNbr`
              }
              title={
                formState.businessNature === "INDIVIDUAL"
                  ? `Individual Number`
                  : `Company Registration Number *`
              }
              placeholder="Enter Number"
              onChange={onChangehandler}
              value={
                formState.businessNature === "INDIVIDUAL"
                  ? formState.individualNbr
                  : formState.businessRegistrationNbr
              }
              error={errors.businessRegistrationNbr}
            />
            <DashboardInput
              name={
                formState.businessNature === "INDIVIDUAL"
                  ? `individualTaxIdNbr`
                  : `businessTaxIdNbr`
              }
              title={
                formState.businessNature === "INDIVIDUAL"
                  ? `Individual Tax Id Number`
                  : `Company Tax Id Number *`
              }
              value={
                formState.businessNature === "INDIVIDUAL"
                  ? formState.individualTaxIdNbr
                  : formState.businessTaxIdNbr
              }
              placeholder="Enter Number"
              onChange={onChangehandler}
              error={errors.businessTaxIdNbr}
            />
          </div>
        </div>
      </div>

      {/* {formType == "events" && (
        <div
          className={`grid grid-rows-1 grid-cols-2 gap-4 mt-8 border-2 border-fade-white p-4 rounded-lg`}
        >
          <div className={`border-2 border-fade-white p-4 rounded-lg`}>
            <h3 className={`text-dark-blue mb-3 font-semibold`}>
              I'm offering a...
            </h3>
            <RadioBox
              items={business_offer}
              onChange={(e: RadioChangeEvent) =>
                onRadioChange(e, "businessOffer")
              }
              value={formState.businessOffer}
            />
          </div>

          {formState.businessOffer === 2 && (
            <div className={`border-2 border-fade-white p-4 rounded-lg`}>
              <h3 className={`text-dark-blue mb-3 font-semibold`}>
                Would be...
              </h3>
              <RadioBox
                items={business_offer_experience_type}
                onChange={(e: RadioChangeEvent) =>
                  onRadioChange(e, "businessEvent")
                }
                value={formState.businessEvent}
              />
            </div>
          )}
        </div>
      )} */}
    </div>
  );
});

export default BusinessForm;