import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, DatePicker, Upload, Button, Radio, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const amenities = [
  "Essentials", "TV", "Cable TV", "Air Conditioning", "Heating", "Kitchen", "Internet",
  "Gym", "Elevator in Building", "Indoor Fireplace", "Buzzer/Wireless Intercom", "Doorman",
  "Shampoo", "Wireless Internet", "Hot Tub", "Washer", "Pool", "Dryer", "Breakfast",
  "Free Parking on Premises", "Family/Kid Friendly", "Smoking Allowed", "Suitable for Events",
  "Pets Allowed", "Pets live on this property", "Wheelchair Accessible"
];

const safetyAmenities = [
  "Smoke Detector", "Carbon Monoxide Detector", "First Aid Kit", "Safety Card", "Fire Extinguisher"
];

const AddPropertyForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        city: "",
        title: "",
        propertyDescription: "",
        checkIn: null,
        checkOut: null,
        multipleImages: [],
        thumbnailImage: null,
        transportationService: "doesntInclude",
        commonAmenities: [],
        safetyAmenities: []
      }}
      onSubmit={(values) => {
        console.log("Form submitted:", values);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="p-5 bg-white rounded-lg shadow-md w-1/2 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add New Property</h2>

          <div className="mb-3">
            <label className="block mb-1">City</label>
            <Field name="city" as={Input} placeholder="Enter city" />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Title</label>
            <Field name="title" as={Input} placeholder="Enter property title" />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Property Description</label>
            <Field name="propertyDescription" as={Input.TextArea} placeholder="Enter description" />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Check-in</label>
            <DatePicker
              onChange={(date) => setFieldValue("checkIn", date)}
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Check-out</label>
            <DatePicker
              onChange={(date) => setFieldValue("checkOut", date)}
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Transportation Service</label>
            <Field name="transportationService">
              {({ field }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: (e: React.FocusEvent<HTMLInputElement>) => void } }) => (
                <Radio.Group
                  {...field}
                  onChange={(e) => setFieldValue("transportationService", e.target.value)}
                >
                  <Radio value="doesntInclude">Doesn't Include</Radio>
                  <Radio value="included">Included</Radio>
                </Radio.Group>
              )}
            </Field>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Common Amenities</label>
            <div className="">
              <Checkbox.Group
                options={amenities}
                onChange={(checkedValues) => setFieldValue("commonAmenities", checkedValues)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Safety Amenities</label>
            <div className="">
              <Checkbox.Group
                options={safetyAmenities}
                onChange={(checkedValues) => setFieldValue("safetyAmenities", checkedValues)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Multiple Images</label>
            <Upload
              multiple
              beforeUpload={(file) => {
                setFieldValue("multipleImages", (prev: File[] = []) => [...prev, file]);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Thumbnail Image</label>
            <Upload
              beforeUpload={(file) => {
                setFieldValue("thumbnailImage", file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
            </Upload>
          </div>

          <Button type="primary" htmlType="submit" className="w-full mt-4">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPropertyForm;
