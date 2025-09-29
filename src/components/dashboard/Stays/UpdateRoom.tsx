
import { FC, useEffect, useState } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage, FieldProps, FormikProps } from "formik";
import { Select, Input, InputNumber, Upload, Switch, Form as AntForm, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Loader } from "../../../components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { getPlaces, getPlaceRooms, getRoom, updateRoom } from "../../../redux/actions/places";
import "../../../index.css";
import * as Yup from 'yup';

const TransferServiceOptions = ["NOT_INCLUDED", "INCLUDED", "EXTRA_COST"] as const;
const RoomTypeOptions = ["SINGLE", "DOUBLE", "SUITE", "DELUXE"] as const;
const BedTypeOptions = ["SINGLE_BED", "DOUBLE_BED", "QUEEN_BED", "KING_BED", "SOFA_BED"] as const;

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
  extraAmount: Yup.number().when('transferService', {
    is: 'EXTRA_COST',
    then: (schema) => schema.required('Extra amount is required when transfer service is extra cost').min(0, 'Extra amount cannot be negative'),
    otherwise: (schema) => schema.optional()
  }),
  discount: Yup.number().when('isDiscountAvailable', {
    is: true,
    then: (schema) => schema.required('Discount is required when discount is available').min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%'),
    otherwise: (schema) => schema.optional()
  }),
  beds: Yup.array().of(
    Yup.object().shape({
      bed_type: Yup.string().required('Bed type is required'),
      amount: Yup.number().required('Amount is required').min(1, 'At least 1 bed required')
    })
  ).min(1, 'At least one bed is required'),
  images: Yup.array().max(3, 'Maximum 3 images allowed'),
});

const UpdateRoom: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sellerPlaces } = useAppSelector((state: RootAppState) => state.places);
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get("placeId");

  const [initialValues, setInitialValues] = useState({
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
    images: [] as (File | string)[],
  });

  const [originalData, setOriginalData] = useState<typeof initialValues | null>(null);
  // Local state for occupancy error
  const [occupancyError, setOccupancyError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getPlaces());

    if (roomId && placeId) {
      const fetchRoom = async () => {
        try {
          const room = await dispatch(getRoom({ placeId: Number(placeId), roomId: Number(roomId) })).unwrap()
          // Only allowed fields for initialValues
          if (room) {
            const roomData = {
              place_id: room.place_id,
              title: room.title || "",
              price: room.price ?? 0,
              stock: room.stock ?? 0,
              room_type: room.room_type || "SINGLE",
              beds: room.beds?.length > 0 ? room.beds.map(bed => ({
                bed_type: bed.bed_type,
                amount: bed.amount
              })) : [{ bed_type: "", amount: 1 }],
              isDiscountAvailable: room.isDiscountAvailable ?? false,
              discount: room.discount ?? 0,
              transferService: room.transferService || "NOT_INCLUDED",
              extraAmount: room.extraAmount ?? 0,
              images: room.images || [],
            };
            
            setInitialValues(roomData);
            setOriginalData(roomData); // Store original data for comparison
          }
        } catch (error) {
          console.error("Failed to fetch room:", error);
        }
      };

      fetchRoom();
    }
  }, [dispatch, placeId, roomId]);

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values, "valuesss");
        
        // Ensure isDiscountAvailable is always sent with discount
        let discount = values.discount;
        let isDiscountAvailable = values.isDiscountAvailable;
        if (typeof discount === 'number' && discount > 0) {
          isDiscountAvailable = true;
        }
        if (!isDiscountAvailable) {
          discount = 0;
        }

        // Calculate total occupancy
        const occupancy = values.beds.reduce((total, bed) => {
          const bedTypeKey = Object.keys(BedTypeOccupancyMap).find(
            (key) => key === bed.bed_type || BedTypeOccupancyMap[key] && key.replace(/_/g, ' ').toLowerCase() === bed.bed_type
          );
          const perBed = bedTypeKey ? BedTypeOccupancyMap[bedTypeKey] : 1;
          return total + (Number(bed.amount) * perBed);
        }, 0);

        // Prepare the JSON body that matches the expected API format
        const roomData = {
          place_id: values.place_id,
          title: values.title,
          price: values.price,
          stock: values.stock,
          room_type: values.room_type,
          beds: values.beds,
          isDiscountAvailable: isDiscountAvailable,
          discount: discount,
          images: values.images,
          transferService: values.transferService,
          extraAmount: values.transferService === "EXTRA_COST" ? values.extraAmount : 0,
          occupancy, // Add calculated occupancy
        };


        try {
          await dispatch(updateRoom(roomData, Number(roomId), originalData));
          message.success("Room updated successfully!");
          dispatch(getPlaceRooms(values.place_id));
          navigate("/app/rooms");
        } catch (error) {
          message.error("Operation failed!");
          console.error("Error:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formikProps: FormikProps<typeof initialValues>) => {
        const { values, setFieldValue, handleSubmit, isSubmitting } = formikProps;
        // No per-bed max needed, only total occupancy enforced
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
              Edit Room
            </h1>

            <Form>
              <AntForm.Item label="Select Property">
                <Select
                  className="w-full form-border-color rounded-md"
                  placeholder="NO stays"
                  value={values.place_id}
                  onChange={(value) => setFieldValue("place_id", value)}
                >
                  {sellerPlaces.map((place) => (
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
                  <Field name="extraAmount">
                    {({ field, form }: FieldProps) => (
                      <InputNumber
                        {...field}
                        className="form-border-color"
                        value={field.value}
                        onChange={(value) =>
                          form.setFieldValue("extraAmount", value || 0)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage name="extraAmount" component="div" className="error text-red-500" />
                </AntForm.Item>
              )}
              <AntForm.Item label="Room Type">
                <Field name="room_type">
                  {({ field, form }: FieldProps) => (
                    <Select
                      {...field}
                      className="w-full  form-border-color rounded-md"
                      placeholder="Select Room Type"
                      onChange={(value) => form.setFieldValue(field.name, value)}
                    >
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
                <AntForm.Item label="Discount (%)">
                  <Field name="discount">
                    {({ field, form }: FieldProps) => (
                      <InputNumber
                        {...field}
                        className="form-border-color"
                        value={field.value}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          form.setFieldValue("discount", value || 0)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage name="discount" component="div" className="error text-red-500" />
                </AntForm.Item>
              )}

              <AntForm.Item label="Upload Images (Max 3)">
                <Upload
                  multiple
                  listType="picture"
                  beforeUpload={() => false}
                  fileList={values.images.map((image, index) => {
                    if (typeof image === 'string') {
                      // Existing image from server
                      return {
                        uid: `existing-${index}`,
                        name: `image-${index}`,
                        status: 'done' as const,
                        url: image,
                      } as UploadFile;
                    } else {
                      // New uploaded file
                      return {
                        uid: `new-${index}`,
                        name: image.name,
                        status: 'done' as const,
                        originFileObj: image,
                      } as UploadFile;
                    }
                  })}
                  onChange={({ fileList }) => {
                    if (fileList.length > 3) {
                      message.error("You can only upload up to 3 images.");
                      return;
                    }
                    setFieldValue(
                      "images",
                      fileList.map((file) => file.originFileObj || file.url)
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
                                    className="w-full  form-border-color rounded-md"
                                    placeholder="Select Bed Type"
                                    onChange={(value) =>
                                      form.setFieldValue(
                                        `beds.${index}.bed_type`,
                                        value
                                      )
                                    }
                                  >
                                    {BedTypeOptions.map((option) => (
                                      <Select.Option key={option} value={option}>
                                        {option}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                )}
                              </Field>
                              <ErrorMessage name={`beds.${index}.bed_type`} component="div" className="text-red-500" />
                            </AntForm.Item>
                            <AntForm.Item label="Amount" className="">
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
                title="Update Room"
                disabled={isSubmitting || occupancy > 8 || !!occupancyError}
              />
            </Form>
            </AntForm>
          )
        );
      }}
    </Formik>
  );
};

export default UpdateRoom; 