import { FC, useEffect, useState } from "react";
import { DashboardInput } from "../../..";

interface FormModel {
  country: string;
  city: string;
  province: string;
  street: string;
  postalCode: string;
}

interface Props {
  data?: (data: FormModel) => void;
}

const LocationDetailsForm: FC<Props> = ({ data }) => {
  const [formState, setFormState] = useState<FormModel>({
    country: "",
    city: "",
    province: "",
    street: "",
    postalCode: "",
  });

  useEffect(() => {
    if (data) {
      data(formState);
    }
  }, [formState]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className={`grid gap-4 grid-rows-1 grid-cols-2`}>
      <DashboardInput
        name="country"
        onChange={onChangeHandler}
        placeholder="Enter Country Name"
      />
      <DashboardInput
        name="city"
        placeholder="Enter City"
        onChange={onChangeHandler}
      />
      <DashboardInput
        name="province"
        placeholder="Enter Province"
        onChange={onChangeHandler}
      />

      <DashboardInput
        name="street"
        placeholder="Enter Street"
        onChange={onChangeHandler}
      />
      <DashboardInput
        name="postalCode"
        placeholder="Enter Postal Code"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default LocationDetailsForm;
