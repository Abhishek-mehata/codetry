// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useCallback, useEffect, useState } from "react";
// import { Button, DashboardInput } from "../../components";
// import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
// import { RootAppState } from "../../redux/store";
// import { GoVerified, GoUnverified } from "react-icons/go";
// import { Svg } from "../../assets";
// import { Divider, Modal, Spin, Tooltip, message } from "antd";
// import { UserModel } from "../../types/user";
// import { updateUser } from "../../redux/actions/user";
// import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
// import { MdEdit } from "react-icons/md";

// const initState: UserModel = {
//   id: 0,
//   firstName: "",
//   lastName: "",
//   email: "",
//   phoneNumber: "",
//   country: "",
//   role: "SELLER",
//   isSeller: false,
//   isEmailConfirmed: false,
//   emailVerifyToken: "",
//   passwordResetToken: "",
//   isPhoneNumberConfirmed: false,
//   isCountryConfirmed: false,
//   status: "ACTIVE",
//   createdAt: "",
//   updatedAt: "",
// };

// const InputStatus = ({ status }: { status: "verified" | "not verified" }) => (
//   <div
//     className={`absolute top-1/2 -translate-y-1/2 right-2 ${
//       status === "verified" ? "bg-success/20" : "bg-danger/20"
//     } p-2 rounded cursor-pointer`}
//   >
//     <Tooltip title={status}>
//       {status === "verified" ? (
//         <GoVerified className={`text-success`} />
//       ) : (
//         <GoUnverified className={`text-danger`} />
//       )}
//     </Tooltip>
//   </div>
// );

// const ProfilePage = () => {
//   const dispatch = useAppDispatch();
//   const [isUpdating, setIsUpdating] = useState<boolean>(false);
//   const [formState, setFormState] = useState<UserModel>(initState);
//   const { user } = useAppSelector((state: RootAppState) => state.auth);
//   const [PNumber, setPNumber] = useState<any>(user.phoneNumber);
//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const [selectedCountry, setSelectedCountry] = useState<string>("NP");

//   const formattedNumber = formatPhoneNumberIntl(PNumber);

//   const updateFormState = useCallback(() => {
//     setFormState(user);
//   }, [user]);

//   useEffect(() => {
//     updateFormState();
//   }, [user, updateFormState]);

//   const submitUserData = async () => {
//     try {
//       const { firstName, lastName, phoneNumber } = formState;

//       if (!firstName?.trim().length) {
//         message.error(`Please enter first name`);
//         return;
//       }

//       if (!lastName?.trim().length) {
//         message.error(`Please enter last name`);
//         return;
//       }

//       setIsUpdating(true);
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       await dispatch(
//         updateUser({
//           firstName,
//           lastName,
//           phoneNumber,
//           selectedCountry,
//         })
//       );

//       setIsUpdating(false);
//     } catch (error: any) {
//       setIsUpdating(false);
//       message.error(error.response.data?.message || "Something went wrong");
//     }
//   };

//   // const updateCountry = () => {
//   //   dispatch(sendWhatsAppCode());
//   // };

//   const onChangeHandler = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormState({ ...formState, [name]: value });
//   };

//   const toggleModal = () => setOpenModal(!openModal);

//   return (
//     <div>
//       <h1 className={`text-2xl text-dark-blue font-semibold`}>{`Profile`}</h1>
//       <div
//         className={`flex justify-between items-start h-full gap-12 w-full mt-6`}
//       >
//         <div className={`w-1/2`}>
//           <img
//             src={Svg.journey}
//             className={`h-80 w-full`}
//             alt={`journey graphics`}
//           />
//         </div>
//         <div className={`flex gap-4 flex-col w-1/2`}>
//           <div className={`bg-white rounded p-4`}>
//             <div className={`grid gap-3 grid-flow-row grid-cols-2`}>
//               <DashboardInput
//                 name="firstName"
//                 onChange={onChangeHandler}
//                 value={formState.firstName}
//                 placeholder="Enter First Name"
//               />
//               <DashboardInput
//                 name="lastName"
//                 value={formState.lastName}
//                 onChange={onChangeHandler}
//                 placeholder="Enter Last Name"
//               />
//               <div className={`relative`}>
//                 <DashboardInput name="email" value={formState.email} disabled />
//                 <InputStatus
//                   status={
//                     formState?.isEmailConfirmed ? "verified" : "not verified"
//                   }
//                 />
//               </div>
//               <DashboardInput
//                 name="role"
//                 value={`Role: ${formState.role}`}
//                 disabled
//               />
//               <div className={`relative w-full`}>
//                 <DashboardInput
//                   disabled
//                   name="phoneNumber"
//                   value={formattedNumber || formState?.phoneNumber}
//                   onChange={onChangeHandler}
//                   placeholder="Enter Phone Number"
//                 />
//                 <button
//                   type="button"
//                   onClick={toggleModal}
//                   className={`absolute top-1/2 -translate-y-1/2 right-12 p-2 rounded bg-fade-white shadow-dark-blue cursor-pointer`}
//                 >
//                   <MdEdit className={`text-md text-dark-blue`} />
//                 </button>
//                 <InputStatus
//                   status={
//                     formState?.isPhoneNumberConfirmed
//                       ? "verified"
//                       : "not verified"
//                   }
//                 />
//               </div>
//               {formState.isCountryConfirmed && (
//                 <div className={`relative w-full`}>
//                   <DashboardInput
//                     name="country"
//                     value={formState?.country}
//                     onChange={onChangeHandler}
//                     placeholder="Enter Country Name"
//                   />
//                   <InputStatus
//                     status={
//                       formState?.isCountryConfirmed
//                         ? "verified"
//                         : "not verified"
//                     }
//                   />
//                 </div>
//               )}
//             </div>
//             <Divider className={`h-0.2 w-full bg-light-gray my-4`} />
//             <div className={`flex items-center justify-end`}>
//               {!isUpdating ? (
//                 <Button
//                   title={`Update`}
//                   variant="filled"
//                   onClick={submitUserData}
//                 />
//               ) : (
//                 <div className={`p-3 rounded shadow-lg`}>
//                   <Spin />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal
//         open={openModal}
//         closeIcon={null}
//         onCancel={() => {
//           toggleModal();
//           setPNumber("");
//         }}
//         onOk={() => {
//           toggleModal();
//           setPNumber("");
//           setFormState({ ...formState, phoneNumber: formattedNumber });
//         }}
//       >
//         <PhoneInput
//           defaultCountry={"NP"}
//           onChange={setPNumber}
//           value={formattedNumber}
//           country={selectedCountry}
//           placeholder="Enter phone number"
//           countryCallingCodeEditable={false}
//           onCountryChange={(country: any) => setSelectedCountry(country)}
//           className={`phoneInput border border-fade-white rounded-lg py-3 px-4`}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default ProfilePage;


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { Button, DashboardInput } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { RootAppState } from "../../redux/store";
import { GoVerified, GoUnverified } from "react-icons/go";
import { Svg } from "../../assets";
import { Divider, Modal, Spin, Tooltip, message } from "antd";
import { UserModel } from "../../types/user";
// import { updateUser, sendWhatsAppCode } from "../../redux/actions/user"; // New action to send code
import { updateUser } from "../../redux/actions/user"; // New action to send code
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import { MdEdit } from "react-icons/md";
// import { useNavigate } from "react-router-dom";  

// const initState: UserModel = {
//   id: 0,
//   firstName: "",
//   lastName: "",
//   email: "",
//   phoneNumber: "",
//   country: "",
//   role: "SELLER",
//   isSeller: false,
//   isEmailConfirmed: false,
//   emailVerifyToken: "",
//   passwordResetToken: "",
//   isPhoneNumberConfirmed: false,
//   isCountryConfirmed: false,
//   status: "ACTIVE",
//   createdAt: "",
//   updatedAt: "",
// };
const initState: UserModel = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  country: "",
  role: "SELLER",
  isSeller: false,
  isEmailConfirmed: false,
  emailVerifyToken: "",
  passwordResetToken: "",
  isPhoneNumberConfirmed: false,
  isCountryConfirmed: false,
  status: "ACTIVE",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  password: "", // Ensure password is always present
};
const InputStatus = ({ status }: { status: "verified" | "not verified" }) => (
  <div
    className={`absolute top-1/2 -translate-y-1/2 right-2 ${status === "verified" ? "bg-success/20" : "bg-danger/20"} p-2 rounded cursor-pointer`}
  >
    <Tooltip title={status}>
      {status === "verified" ? <GoVerified className="text-success" /> : <GoUnverified className="text-danger" />}
    </Tooltip>
  </div>
);

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();  // For navigation to OTP page
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [formState, setFormState] = useState<UserModel>(initState);
  const { user } = useAppSelector((state: RootAppState) => state.auth);
  const [PNumber, setPNumber] = useState<string | undefined>(user.phoneNumber);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("NP");

  const formattedNumber = PNumber ? formatPhoneNumberIntl(PNumber) : "";

  const updateFormState = useCallback(() => {
    setFormState(user);
  }, [user]);

  useEffect(() => {
    updateFormState();
  }, [user, updateFormState]);

  const submitUserData = async () => {
    try {
      const { firstName, lastName, phoneNumber } = formState;

      if (!firstName?.trim().length) {
        message.error("Please enter first name");
        return;
      }

      if (!lastName?.trim().length) {
        message.error("Please enter last name");
        return;
      }

      setIsUpdating(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await dispatch(
        updateUser({
          firstName,
          lastName,
          phoneNumber,
          selectedCountry,
        })
      );

      setIsUpdating(false);
    } catch (error: any) {
      setIsUpdating(false);
      message.error(error.response.data?.message || "Something went wrong");
    }
  };

  // Handle phone number input change
  const handlePhoneChange = (value: string | undefined) => {
    setPNumber(value);
  };

  // Send WhatsApp verification code (calling backend)
  const sendVerificationCode = async () => {
    try {
      if (!PNumber) {
        message.error("Please enter a valid phone number.");
        return;
      }
  
      setIsUpdating(true);
  
      const countryCode = selectedCountry; // Assuming `selectedCountry` holds the country value
      await dispatch(updateUser({ phoneNumber: PNumber, country: countryCode  }));

      // Send the phone number and country to the backend
      console.log("Sending data:", { phoneNumber: PNumber, country: countryCode }); // Log data being sent
  
      // await dispatch(sendWhatsAppCode({ phoneNumber: PNumber, country: countryCode }));
  
      setIsUpdating(false);
      // message.success("Verification code sent successfully!");
  
      // navigate("/confirm-code", { state: { phoneNumber: PNumber } });
    } catch (error: any) {
      setIsUpdating(false);
      // message.error(error.response?.data?.message || "Failed to send verification code.");
    }
  };
  

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      <h1 className=" text-2xl text-dark-blue font-semibold">Profile</h1>
      <div className="flex flex-col md:flex-row justify-between items-start h-full md:gap-12 w-full mt-6">
        <div className="md:w-1/2">
          <img src={Svg.journey} className="md:h-80 h-60 w-full" alt="journey graphics" />
        </div>
        <div className="flex gap-4 flex-col w-full md:w-1/2">
          <div className="bg-white rounded p-4 ">
            <div className="grid gap-3 grid-flow-row  ">
              <DashboardInput name="firstName" onChange={onChangeHandler} value={formState.firstName} placeholder="Enter First Name" />
              <DashboardInput name="lastName" value={formState.lastName} onChange={onChangeHandler} placeholder="Enter Last Name" />
              <div className="relative">
                <DashboardInput name="email" value={formState.email} />
                <InputStatus status={formState?.isEmailConfirmed ? "verified" : "not verified"} />
              </div>
              <DashboardInput name="role" value={`Role: ${formState.role}`} />
              <div className="relative w-full">
                <DashboardInput name="phoneNumber" value={formattedNumber || formState?.phoneNumber} onChange={onChangeHandler} placeholder="Enter Phone Number" />
                <button type="button" onClick={() => setOpenModal(true)} className="absolute top-1/2 -translate-y-1/2 right-12 p-2 rounded bg-fade-white shadow-dark-blue cursor-pointer">
                  <MdEdit className="text-md text-dark-blue" />
                </button>
                <InputStatus status={formState?.isPhoneNumberConfirmed ? "verified" : "not verified"} />
              </div>
              {formState.isCountryConfirmed && (
                <div className="relative w-full">
                  <DashboardInput name="country" value={formState?.country} onChange={onChangeHandler} placeholder="Enter Country Name" />
                  <InputStatus status={formState?.isCountryConfirmed ? "verified" : "not verified"} />
                </div>
              )}
            </div>
            <Divider className="h-0.2 w-full bg-light-gray my-4" />
            <div className="flex items-center justify-center md:justify-end">
              {!isUpdating ? (
                <Button title="Update" variant="filled" onClick={submitUserData} />
              ) : (
                <div className="p-3 rounded shadow-lg">
                  <Spin />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal open={openModal} closeIcon={null} onCancel={() => { setOpenModal(false); }} onOk={sendVerificationCode}>
        <PhoneInput
          defaultCountry="NP"
          value={PNumber}
          onChange={handlePhoneChange}
          placeholder="Enter phone number"
          countryCallingCodeEditable={false}
          onCountryChange={(country: any) => setSelectedCountry(country)}
          className="phoneInput border border-fade-white rounded-lg py-3 px-4"
        />
      </Modal>
    </div>
  );
};

export default ProfilePage;
