// export default RoomForm;
// This File is for creating a room
import { FC, useEffect, useState } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage, FieldProps } from "formik";
import { Select, Input, InputNumber, Upload, Switch, Form as AntForm, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Loader } from "../..";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { getPlaces, getPlaceRooms, createRoom } from "../../../redux/actions/places";
import "../../../index.css";
import * as Yup from 'yup';

const TransferServiceOptions = ["NOT_INCLUDED", "INCLUDED", "EXTRA_COST"] as const;
const RoomTypeOptions = ["SINGLE", "DOUBLE", "SUITE", "DELUXE"] as const;
const BedTypeOptions = ["SINGLE_BED", "DOUBLE_BED", "QUEEN_BED", "KING_BED", "SOFA_BED"] as const;
const BookingPolicyOptions = ["FLEXIBLE", "MODERATE", "STRICT"] as const;

const BedTypeOccupancyMap: Record<string, number> = {
  SINGLE_BED: 1,
  SOFA_BED: 1,
  DOUBLE_BED: 2,
  KING_BED: 2,
  QUEEN_BED: 2,
};

const validationSchema = Yup.object().shape({
  place_id: Yup.number().required('Property is required').min(1, 'Select a valid property'),
  title: Yup.string().required('Title is required'),
  price: Yup.number().required('Price is required').min(3, 'Price must be greater than $3'),
  stock: Yup.number().required('Stock is required').min(0, 'Stock cannot be negative'),
  room_type: Yup.string().required('Room type is required'),
  transferService: Yup.string().required('Transfer service is required'),
  policyName: Yup.string().required('Booking policy is required'),
  beds: Yup.array().of(
    Yup.object().shape({
      bed_type: Yup.string().required('Bed type is required'),
      amount: Yup.number()
        .required('Amount is required')
        .min(1, 'At least 1 beds required')
    })
  ).min(1, 'At least one bed is required'),
  images: Yup.array().min(1, 'At least one image is required').max(3, 'Maximum 3 images allowed'),
  // Discount is optional (no validation)
});

const AddRoomForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sellerPlaces } = useAppSelector((state: RootAppState) => state.places);
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get("placeId");

  // Local state for occupancy error
  const [occupancyError, setOccupancyError] = useState<string | null>(null);

  const [initialValues] = useState({
    place_id: placeId ? Number(placeId) : 0,
    title: "",
    price: 0,
    stock: 0,
    room_type: "",
    beds: [{ bed_type: "", amount: 1 }],
    isDiscountAvailable: false,
    discount: 0,
    transferService: "",
    extraAmount: 0,
    policyName: "",
    images: [] as File[],
  });

  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        // Calculate total occupancy
        const occupancy = values.beds.reduce((total, bed) => {
          const bedTypeKey = Object.keys(BedTypeOccupancyMap).find(
            (key) => key === bed.bed_type || BedTypeOccupancyMap[key] && key.replace(/_/g, ' ').toLowerCase() === bed.bed_type
          );
          const perBed = bedTypeKey ? BedTypeOccupancyMap[bedTypeKey] : 1;
          return total + (Number(bed.amount) * perBed);
        }, 0);
        if (occupancy > 8) {
          message.error("8 max people (occupancy). Room not created.");
          setSubmitting(false);
          return;
        }
        // Prepare the JSON body that matches the expected API format
        const roomData = {
          place_id: values.place_id,
          title: values.title,
          price: values.price,
          stock: values.stock,
          room_type: values.room_type,
          beds: values.beds,
          isDiscountAvailable: values.isDiscountAvailable,
          discount: values.discount,
          transferService: values.transferService,
          extraAmount: values.extraAmount,
          policyName: values.policyName,
          images: values.images, // Add images to the data being sent
          occupancy, // Add calculated occupancy
        };

        console.log(roomData,"room Data");
        try {
          await dispatch(createRoom(roomData));
          message.success("Room created successfully!");
          dispatch(getPlaceRooms(values.place_id));

          // Check if this was an incomplete stay completion
          const urlParams = new URLSearchParams(window.location.search);
          const isIncomplete = urlParams.get('incomplete');

          if (isIncomplete === 'true') {
            // Redirect to stays page after completing the stay
            navigate("/app/stays");
          } else {
            // Normal room creation flow
            navigate("/app/rooms");
          }
        } catch (error) {
          message.error("Operation failed!");
          console.error("Error:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => {
        // Calculate total occupancy
        const occupancy = values.beds.reduce((total, bed) => {
          const bedTypeKey = Object.keys(BedTypeOccupancyMap).find(
            (key) => key === bed.bed_type || BedTypeOccupancyMap[key] && key.replace(/_/g, ' ').toLowerCase() === bed.bed_type
          );
          const perBed = bedTypeKey ? BedTypeOccupancyMap[bedTypeKey] : 1;
          return total + (Number(bed.amount) * perBed);
        }, 0);

        // For error message
        const bedsError = occupancyError;
        return (
          isSubmitting ? (
            <Loader loading={isSubmitting} />
          ) : (
            <AntForm
              layout="vertical"
              onSubmitCapture={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <h1 className="font-bold text-3xl mb-3 text-center">
                Create a Room
              </h1>
              {searchParams.get('incomplete') === 'true' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-center">
                    <strong>Complete Your Stay:</strong> Please add at least one room to complete your stay listing.
                    You cannot navigate to other pages until you add a room.
                  </p>
                </div>
              )}

              <Form>
                <AntForm.Item label="Select Property">
                  <Select
                    className="w-full form-border-color rounded-md"
                    placeholder="NO stays"
                    value={values.place_id}
                    onChange={(value) => setFieldValue("place_id", value)}
                  >
                    {(sellerPlaces as Array<{ id: number; title: string }>).map((place) => (
                      <Select.Option key={place.id} value={place.id}>
                        {place.title}
                      </Select.Option>
                    ))}
                  </Select>
                  <ErrorMessage name="place_id" component="div" className="error text-red-500" />
                </AntForm.Item>

                <AntForm.Item label="Title">
                  <Field as={Input} name="title" className=" form-border-color" />
                  <ErrorMessage name="title" component="div" className="error text-red-500" />
                </AntForm.Item>

                <AntForm.Item label="Price">
                  <InputNumber
                    className="form-border-color"
                    value={values.price}
                    onChange={(value) => setFieldValue("price", value)}
                  />
                  <ErrorMessage name="price" component="div" className="error text-red-500" />
                </AntForm.Item>

                <AntForm.Item label="Stock">
                  <InputNumber
                    className=" form-border-color"
                    value={values.stock}
                    onChange={(value) => setFieldValue("stock", value)}
                  />
                  <ErrorMessage name="stock" component="div" className="error text-red-500" />
                </AntForm.Item>

                <AntForm.Item label="Transfer Service">
                  <Field name="transferService">
                    {({ field, form }: FieldProps) => (
                      <Select
                        {...field}
                        className="w-full  form-border-color rounded-md"
                        placeholder="Select Transfer Service"
                        value={field.value}
                        onChange={(value) => form.setFieldValue(field.name, value)}
                      >
                        <Select.Option value="" disabled>
                          Select Transfer Service
                        </Select.Option>
                        {TransferServiceOptions.map((option) => (
                          <Select.Option key={option} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage name="transferService" component="div" className="error text-red-500" />
                </AntForm.Item>

                {values.transferService === "EXTRA_COST" && (
                  <AntForm.Item label="Extra Amount">
                    <InputNumber
                      className="form-border-color"
                      value={values.extraAmount}
                      onChange={value => setFieldValue("extraAmount", value)}
                    />
                    <ErrorMessage name="extraAmount" component="div" className="error text-red-500" />
                  </AntForm.Item>
                )}

                <AntForm.Item label="Booking Policy">
                  <Field name="policyName">
                    {({ field, form }: FieldProps) => (
                      <Select
                        {...field}
                        className="w-full form-border-color rounded-md"
                        placeholder="Select Booking Policy"
                        value={field.value}
                        onChange={(value) => form.setFieldValue(field.name, value)}
                      >
                        <Select.Option value="" disabled>
                          Select Booking Policy
                        </Select.Option>
                        {BookingPolicyOptions.map((option) => (
                          <Select.Option key={option} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage name="policyName" component="div" className="error text-red-500" />
                </AntForm.Item>

                <AntForm.Item label="Room Type">
                  <Field name="room_type">
                    {({ field, form }: FieldProps) => (
                      <Select
                        {...field}
                        className="w-full  form-border-color rounded-md"
                        placeholder="Select Room Type"
                        onChange={(value) => form.setFieldValue(field.name, value)}
                      >
                        <Select.Option value="" disabled>
                          Select Room Type
                        </Select.Option>
                        {RoomTypeOptions.map((option) => (
                          <Select.Option key={option} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage name="room_type" component="div" className="error text-red-500" />
                </AntForm.Item>

                {/* Discount Field */}
                <AntForm.Item label="Is Discount Available?">
                  <Switch
                    checked={values.isDiscountAvailable}
                    onChange={(checked) =>
                      setFieldValue("isDiscountAvailable", checked)
                    }
                  />
                </AntForm.Item>

                {values.isDiscountAvailable && (
                  <AntForm.Item label="Discount">
                    <Field name="discount">
                      {({ field, form }: FieldProps) => (
                        <InputNumber
                          {...field}
                          className="form-border-color"
                          value={field.value}
                          onChange={(value) =>
                            form.setFieldValue("discount", value || 0)
                          }
                        />
                      )}
                    </Field>
                  </AntForm.Item>
                )}

                <AntForm.Item label="Upload Images (Max 3)">
                  <Upload
                    multiple
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={({ fileList }) => {
                      if (fileList.length > 3) {
                        message.error("You can only upload up to 3 images.");
                        return;
                      }
                      setFieldValue(
                        "images",
                        fileList.map((file) => file.originFileObj as File)
                      );
                    }}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      title="Select Images"
                      className="shadow-none"
                    />
                  </Upload>
                  <ErrorMessage name="images" component="div" className="error text-red-500" />
                </AntForm.Item>

                <FieldArray name="beds">
                  {({ push, remove }) => (
                    <>
                      {values.beds.map((_, index) => {
                        // No per-bed max needed, only total occupancy enforced
                        return (
                          <div key={index} className="flex gap-3 items-center">
                            <AntForm.Item className="w-32" label="Bed Type">
                              <Field name={`beds.${index}.bed_type`}>

                                {({ field, form }: FieldProps) => (
                                  <Select
                                    {...field}
                                    className="w-full  form-border-color rounded-md capitalize"
                                    placeholder="Select Bed Type"
                                    onChange={(value) =>
                                      form.setFieldValue(
                                        `beds.${index}.bed_type`,
                                        value.replace(/_/g, ' ').toLowerCase()
                                      )
                                    }
                                  >
                                    <Select.Option value="" disabled>
                                      Select Bed Type
                                    </Select.Option>
                                    {BedTypeOptions.map((option) => (
                                      <Select.Option key={option} value={option} className="capitalize">
                                        {option.replace(/_/g, ' ').toLowerCase()}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                )}
                              </Field>
                              <ErrorMessage name={`beds.${index}.bed_type`} component="div" className="text-red-500" />
                            </AntForm.Item>
                            <AntForm.Item label="Number of Beds" className="">
                              <Field name={`beds.${index}.amount`}>
                                {({ field, form }: FieldProps) => (
                                  <InputNumber
                                    {...field}
                                    className=" form-border-color"
                                    value={field.value}
                                    min={1}
                                    max={99}
                                    onChange={(value) => {
                                      // Calculate what the new occupancy would be if this value is set
                                      const newBeds = values.beds.map((bed, i) =>
                                        i === index ? { ...bed, amount: value || 1 } : bed
                                      );
                                      const newOccupancy = newBeds.reduce((total, bed) => {
                                        const bedTypeKey = Object.keys(BedTypeOccupancyMap).find(
                                          (key) => key === bed.bed_type || BedTypeOccupancyMap[key] && key.replace(/_/g, ' ').toLowerCase() === bed.bed_type
                                        );
                                        const perBed = bedTypeKey ? BedTypeOccupancyMap[bedTypeKey] : 1;
                                        return total + (Number(bed.amount) * perBed);
                                      }, 0);
                                      if (newOccupancy > 8) {
                                        setOccupancyError("8 max people (occupancy).");
                                        // Do not update the value
                                      } else {
                                        setOccupancyError(null);
                                        form.setFieldValue(`beds.${index}.amount`, value || 1);
                                      }
                                    }}
                                  />
                                )}
                              </Field>
                            </AntForm.Item>

                            {values.beds.length > 1 && (
                              <button
                                type="button"
                                className=" text-[13px] text-[#8214ff] rounded-md p-1 border-b border-r"
                                onClick={() => remove(index)}
                              >
                                Remove Bed
                              </button>
                            )}
                            <ErrorMessage name={`beds.${index}.amount`} component="div" className="block text-red-500" />
                          </div>
                        );
                      })}
                      {bedsError && <div className="text-red-500 text-sm mb-2">{bedsError}</div>}
                      <Button
                        onClick={() => push({ bed_type: "", amount: 1 })}
                        title="+ Add Bed"
                        className="shadow-none mr-5 mt-3 px-[39px]"
                      />
                    </>
                  )}
                </FieldArray>


                <Button
                  className="shadow-none  px-[49px]"
                  type="submit"
                  title="Submit"
                  disabled={isSubmitting || occupancy > 8 || !!occupancyError}
                />
              </Form>
            </AntForm>)
        );
      }}
    </Formik>
  );
};

export default AddRoomForm;
