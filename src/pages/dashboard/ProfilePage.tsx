/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { Button, DashboardInput } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { RootAppState } from "../../redux/store";
import { GoVerified, GoUnverified } from "react-icons/go";
import { Svg } from "../../assets";
import { Modal, Spin, Tooltip, message } from "antd";
import { UserModel } from "../../types/user";
import { updateUser } from "../../redux/actions/user";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import { MdEdit } from "react-icons/md";
import { isValidPhoneNumber, parsePhoneNumber, CountryCode } from "libphonenumber-js";
import "../../../src/index.css";


const initState: UserModel = {
  id: 0,
  profilePicture: "",
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
  password: "",
  // Bank details
  accountHolderName: "",
  accountNumber: "",
  address: "",
  bankname: "",
  ibannumber: "",
  ifsccode: "",
  swiftcode: "",
  paypalEmail: "",
};

const InputStatus = ({ status }: { status: "verified" | "not verified" }) => (
  <div
    className={`absolute top-2/3 -translate-y-1/2 right-2 ${status === "verified" ? "bg-success/20" : "bg-danger/20"
      } p-2 rounded cursor-pointer`}
  >
    <Tooltip title={status}>
      {status === "verified" ? (
        <GoVerified className="text-success" />
      ) : (
        <GoUnverified className="text-danger" />
      )}
    </Tooltip>
  </div>
);

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [formState, setFormState] = useState<UserModel>(initState);
  const { user } = useAppSelector((state: RootAppState) => state.auth);
  console.log(user.role, "usereeee");
  const [PNumber, setPNumber] = useState<string | undefined>(user.phoneNumber);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | undefined>("NP");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);


  const formattedNumber = PNumber ? formatPhoneNumberIntl(PNumber) : "";

  const updateFormState = useCallback(() => {
    setFormState(user);
    const defaultCountry: CountryCode = (user.country as CountryCode) || "NP";
    if (user.phoneNumber && !validatePhoneNumber(user.phoneNumber, defaultCountry)) {
      setPNumber(undefined);
    } else {
      setPNumber(user.phoneNumber);
    }
    setSelectedCountry(defaultCountry);
  }, [user]);

  useEffect(() => {
    updateFormState();
  }, [user, updateFormState]);

  const validatePhoneNumber = (phone: string | undefined, country: CountryCode | undefined): boolean => {
    if (!phone || !country) return false;
    try {
      const phoneNumber = parsePhoneNumber(phone, country);
      return phoneNumber ? isValidPhoneNumber(phone, country) : false;
    } catch (error) {
      return false;
    }
  };

  const submitUserData = async () => {
    try {
      const { firstName, lastName, phoneNumber, accountHolderName, accountNumber, address, bankname } = formState;

      if (!firstName?.trim().length) return message.error("Please enter first name");
      if (!lastName?.trim().length) return message.error("Please enter last name");
      if (user.role === "SELLER") {
        if (!accountHolderName?.trim().length) return message.error("Please enter Account Holder Name");
        if (!accountNumber?.trim().length) return message.error("Please enter Account Number");
        if (!address?.trim().length) return message.error("Please enter Address");
        if (!bankname?.trim().length) return message.error("Please enter Bank Name");
      }
      if (phoneNumber && !validatePhoneNumber(phoneNumber, selectedCountry)) {
        return message.error("Please enter a valid phone number");
      }

      setIsUpdating(true);

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      if (user.role === "SELLER") {
        formData.append("accountHolderName", formState.accountHolderName || "");
        formData.append("accountNumber", formState.accountNumber || "");
        formData.append("address", formState.address || "");
        formData.append("bankname", formState.bankname || "");
        formData.append("ibannumber", formState.ibannumber || "");
        formData.append("ifsccode", formState.ifsccode || "");
        formData.append("swiftcode", formState.swiftcode || "");
        formData.append("paypalEmail", formState.paypalEmail || "");
      }

      if (selectedImageFile) {
        formData.append("file", selectedImageFile); // ⬅ your backend field name here
      }

      await dispatch(updateUser(formData));

      setIsUpdating(false);
      message.success("Profile updated successfully!");
    } catch (error: any) {
      setIsUpdating(false);
      message.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPNumber(value);
    setFormState({ ...formState, phoneNumber: value || "" });
  };

  const sendVerificationCode = async () => {
    try {
      if (!PNumber || !selectedCountry || !validatePhoneNumber(PNumber, selectedCountry)) {
        message.error("Please enter a valid phone number for the selected country.");
        return;
      }

      setIsUpdating(true);

      await dispatch(updateUser({ phoneNumber: PNumber, country: selectedCountry }));

      console.log("Sending data:", { phoneNumber: PNumber, country: selectedCountry });

      setIsUpdating(false);
      // message.success("Verification code sent successfully!");
    } catch (error: any) {
      setIsUpdating(false);
      message.error(error.response?.data?.message || "Failed to send verification code.");
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      <h1 className="text-2xl text-dark-blue font-semibold">Profile</h1>
      <div className="flex flex-col-reverse  md:flex-row justify-between items-stretch md:items-center h-full md:gap-12 w-full mt-6">
        <div className="flex gap-4 flex-col w-full md:w-1/2">
          <div className="bg-white rounded p-4 ps-0">
            {/* Change Profile Pciture Start */}
            <div>
              <div className="flex items-center gap-2 p-2 mb-3">
                <figure className="w-20 h-20 rounded-full overflow-hidden shrink-0">
                  {formState.profilePicture ? (
                    <img className="object-cover h-full w-full" src={formState.profilePicture} alt="Profile" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </figure>
                <input
                  className="border rounded-lg border-primary p-4 w-full"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedImageFile(file);
                      // Show preview
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormState((prev) => ({ ...prev, profilePicture: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <label className="mb-2 block text-gray" htmlFor="firstName">
                First Name
              </label>
              <DashboardInput
                className="mb-3"
                name="firstName"
                onChange={onChangeHandler}
                value={formState.firstName}
                placeholder="Enter First Name"
              />
              <label className="mb-2 block text-gray" htmlFor="lastName">
                Last Name
              </label>
              <DashboardInput
                className="mb-3"
                name="lastName"
                value={formState.lastName}
                onChange={onChangeHandler}
                placeholder="Enter Last Name"
              />
              <div className="relative">
                <label className="mb-2 block text-gray" htmlFor="email">
                  Email
                </label>
                <DashboardInput className="mb-3" name="email" value={formState.email} />
                <InputStatus status={formState?.isEmailConfirmed ? "verified" : "not verified"} />
              </div>
              <label className="mb-2 block text-gray" htmlFor="role">
                Role
              </label>
              <DashboardInput className="mb-3" name="role" value={`Role: ${formState.role}`} />
              <div className="relative w-full">
                <label className="mb-2 block text-gray" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <DashboardInput
                  className="mb-3"
                  name="phoneNumber"
                  value={formattedNumber || formState?.phoneNumber}
                  onChange={onChangeHandler}
                  placeholder="Enter Phone Number"
                />
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="absolute top-2/3 -translate-y-1/2 right-12 p-2 rounded bg-fade-white shadow-dark-blue cursor-pointer"
                >
                  <MdEdit className="text-md text-dark-blue" />
                </button>
                <InputStatus status={formState?.isPhoneNumberConfirmed ? "verified" : "not verified"} />
              </div>
              {formState.isCountryConfirmed && (
                <div className="relative w-full">
                  <label className="mb-2 block text-gray" htmlFor="country">
                    Country
                  </label>
                  <DashboardInput
                    className="mb-3"
                    name="country"
                    value={formState?.country}
                    onChange={onChangeHandler}
                    placeholder="Enter Country Name"
                  />
                  <InputStatus status={formState?.isCountryConfirmed ? "verified" : "not verified"} />
                </div>
              )}

            </div>
            {/* Change Profile Pciture Start */}

            <div className="flex items-center justify-center md:justify-end mt-4">
              {!isUpdating ? (
                <Button
                  className="w-full"
                  title="Update"
                  variant="filled"
                  onClick={submitUserData}
                />
              ) : (
                <div className="p-3 rounded shadow-lg">
                  <Spin />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {user.role === "SELLER" ? (
            <div className="">
              <h2 className="text-lg font-semibold mb-4 text-dark-blue">Bank Details</h2>
              <label className="mb-2 block text-gray" htmlFor="accountHolderName">
                Account Holder Name <span className="text-danger">*</span>
              </label>
              <DashboardInput
                className="mb-3"
                name="accountHolderName"
                value={formState.accountHolderName}
                onChange={onChangeHandler}
                placeholder="Enter Account Holder Name"
              />
              <label className="mb-2 block text-gray" htmlFor="accountNumber">
                Account Number <span className="text-danger">*</span>
              </label>
              <DashboardInput
                className="mb-3"
                name="accountNumber"
                value={formState.accountNumber}
                onChange={onChangeHandler}
                placeholder="Enter Account Number"
              />
              <label className="mb-2 block text-gray" htmlFor="address">
                Address <span className="text-danger">*</span>
              </label>
              <DashboardInput
                className="mb-3"
                name="address"
                value={formState.address}
                onChange={onChangeHandler}
                placeholder="Enter Address"
              />
              <label className="mb-2 block text-gray" htmlFor="bankname">
                Bank Name <span className="text-danger">*</span>
              </label>
              <DashboardInput
                className="mb-3"
                name="bankname"
                value={formState.bankname}
                onChange={onChangeHandler}
                placeholder="Enter Bank Name"
              />
              <label className="mb-2 block text-gray" htmlFor="ibannumber">
                IBAN Number
              </label>
              <DashboardInput
                className="mb-3"
                name="ibannumber"
                value={formState.ibannumber}
                onChange={onChangeHandler}
                placeholder="Enter IBAN Number (optional)"
              />
              <label className="mb-2 block text-gray" htmlFor="ifsccode">
                IFSC Code
              </label>
              <DashboardInput
                className="mb-3"
                name="ifsccode"
                value={formState.ifsccode}
                onChange={onChangeHandler}
                placeholder="Enter IFSC Code (optional)"
              />
              <label className="mb-2 block text-gray" htmlFor="swiftcode">
                SWIFT Code
              </label>
              <DashboardInput
                className="mb-3"
                name="swiftcode"
                value={formState.swiftcode}
                onChange={onChangeHandler}
                placeholder="Enter SWIFT Code (optional)"
              />
              <label className="mb-2 block text-gray" htmlFor="paypalEmail">
                PayPal Email
              </label>
              <DashboardInput
                className="mb-3"
                name="paypalEmail"
                value={formState.paypalEmail}
                onChange={onChangeHandler}
                placeholder="Enter PayPal Email (optional)"
              />
            </div>
          ) :
            <img src={Svg.journey} className="md:h-80 h-60 w-full" alt="journey graphics" />
          }
        </div>
      </div>

      <Modal
        open={openModal}
        closeIcon={null}
        onCancel={() => setOpenModal(false)}
        onOk={sendVerificationCode}
      >
        <PhoneInput
          defaultCountry={"NP" as CountryCode} // Explicitly cast to CountryCode
          value={PNumber}
          onChange={handlePhoneChange}
          placeholder="Enter phone number"
          countryCallingCodeEditable={false}
          onCountryChange={(country: CountryCode | undefined) => setSelectedCountry(country || "NP")}
          className="phoneInput border border-fade-white rounded-lg py-3 px-4"
        />
      </Modal>
    </div>
  );
};

export default ProfilePage;