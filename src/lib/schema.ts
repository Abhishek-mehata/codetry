// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as Yup from "yup";

// export const createStaySchema = Yup.object().shape({
//   city: Yup.string().required("Required"),
//   street: Yup.string().required("Required"),
//   postal_code: Yup.string().required("Required"),
//   province: Yup.string().required("Required"),
//   businessNature: Yup.string().required("Required"),
//   individualTaxIdNbr: Yup.string(),
//   individualNbr: Yup.string(),
//   businessTaxIdNbr: Yup.string(),
//   businessRegistrationNbr: Yup.string(),
//   // isDiscountAvailable: Yup.boolean(),
//   // discount: Yup.number(),
//   // transferService: Yup.string().required("Required"),
//   title: Yup.string().required("Required"),
//   description: Yup.string().required("Required"),
// });

// export const businessValidation = Yup.object({
//   businessNature: Yup.string().oneOf(["BUSINESS", "INDIVIDUAL"]).required("Required"),
// });

// export const locationValidation = Yup.object({
//   city: Yup.string().required("Required!"),
//   street: Yup.string().required("Required!"),
//   postal_code: Yup.string().required("Required!"),
//   province: Yup.string().required("Required!"),
// });

// export const categoryValidation = Yup.object({
//   category: Yup.string().required("Required!"),
//   onsiteEvent: Yup.object().when(["category"], {
//     is: (category: string) => category === "ONSITE",
//     then: Yup.object({
//       category: Yup.string().required("Required for onsite event!"),
//       // Other validations for onsiteEvent
//     }),
//     otherwise: Yup.object().strip(), // Strip the field if not an onsite event
//   }),
//   // .oneOf(["BUSINESS", "EXPERIMENTAL"])
//   onlineEvent: Yup.object().when(["category"], {
//     is: (category: string) => category === "ONLINE",
//     then: Yup.object({
//       category: Yup.string().required("Required for online event!"),
//       // Other validations for onlineEvent
//     }),
//     otherwise: Yup.object().strip(), // Strip the field if not an online event
//   }),
// });

// export const informationValidation = Yup.object({
//   title: Yup.string().required("Required!"),
//   description: Yup.string().required("Required!"),
//   // transferService: Yup.string().required("Required!"),
//   // isDiscountAvailable: Yup.boolean(),
//   // discount: Yup.string().when("isDiscountAvailable", {
//   //   is: true,
//   //   then: (schema) => schema.required("Required when discount is available"),
//   //   otherwise: (schema) => schema.optional(),
//   // }),
//   files: Yup.array(Yup.mixed())
//     .min(1, "Please atleast upload one image for customers to see")
//     .required("Please atleast upload one image for customers to see"),
// });

// export const SelectETypeValidation = Yup.object({
//   eventType: Yup.string().required("Required!"),
// });
