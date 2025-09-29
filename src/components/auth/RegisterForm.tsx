import { FC, useState } from "react";
import {
  Form,
  Button,
  Checkbox,
  FormProps,
  Input,
  // Divider,
  message,
} from "antd";
import {
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import zxcvbn from "zxcvbn";
// import { Logo } from "../../assets";
import type { CheckboxProps } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { MdMailOutline } from "react-icons/md";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/auth";

type FieldType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  remember?: string;
};

// const socialLinks = [
//   {
//     name: "facebook",
//     href: "https://",
//     icon: Logo.facebook_color,
//   },
//   {
//     name: "google",
//     href: "https://",
//     icon: Logo.google,
//   },
//   {
//     name: "instagram",
//     href: "https://",
//     icon: Logo.instagram_color,
//   },
//   {
//     name: "twitter",
//     href: "https://",
//     icon: Logo.twitter_color,
//   },
//   {
//     name: "whatsapp",
//     href: "https://",
//     icon: Logo.whatsapp_color,
//   },
//   {
//     name: "mail",
//     href: "https://",
//     icon: Logo.mail_color,
//   },
// ];

const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [remember, setRemember] = useState<boolean>(false);
  const [showRememberError, setShowRememberError] = useState<boolean>(false);
  const [passwordScore, setPasswordScore] = useState<number>(0);

  const checkStrength = (value: string) => {
    if (!value) return setPasswordScore(0);
    setPasswordScore(zxcvbn(value).score + 1);
  };

  // const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  //   if (!remember && passwordScore !== 0) return;
  //   dispatch(signup(values));

  //   navigate(`/auth/login`);
  // };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!remember) {
      setShowRememberError(true);
      return;
    } else {
      setShowRememberError(false);
    }
    if (passwordScore !== 0) {
      dispatch(signup(values, navigate)); // Pass navigate for redirection
    }
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    message.error(`Failed: ${errorInfo}`);
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    setRemember(e.target.checked);
    if (e.target.checked) {
      setShowRememberError(false);
    }
  };
    


  const [btnEmail, setBtnEmail] = useState(false);
  const [email, setEmail] = useState(false);
  const handleChnageEmail = (val: string) => {
    if (val.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmail(false);
      setBtnEmail(true);
    } else if (val.length === 0) {
      setEmail(true);
      setBtnEmail(false);
    } else {
      setEmail(true);
    }
  };

  const validateEmail = () => {
    return email ? (
      <p style={{ color: "red" }}>Please enter a valid Email!</p>
    ) : (
      ""
    );
  };


  const [btnPass, setBtnPass] = useState(false);
  const [pass, setPass] = useState(false);
  const handleChnagePassword = (val: string) => {
    if (val.length > 4) {
      setPass(false);
      setBtnPass(true);
    } else if (val.length === 0) {
      setPass(true);
      setBtnPass(false);
    } else {
      setPass(true);
    }
  };

  const validatePassword = () => {
    return pass ? (
      <p style={{ color: "red" }}>Password must be at least 5 characters!</p>
    ) : (
      ""
    );
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      className={`w-full`}
      style={{ maxWidth: 440 }}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      <Form.Item<FieldType>
        name="firstName"
        // rules={[{ required: true, message: "Please input your First Name!" }]}
      >
        <Input
          size="large"
          id="firstName"
          name="firstName"
          value={`Diwash`}
          required={true}
          placeholder="First Name"
          prefix={<UserOutlined className={`text-gray`} />}
          className={`p-3 hover:border-primary focus-within:border-primary`}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="lastName"
        // rules={[{ required: true, message: "Please input your Last Name!" }]}
      >
        <Input
          size="large"
          id="lastName"
          value={`Tiwari`}
          name="lastName"
          placeholder="Last Name"
          required={true}
          prefix={<UserOutlined className={`text-gray`} />}
          className={`p-3 hover:border-primary focus-within:border-primary`}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="email"
        // rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          size="large"
          id="email"
          name="email"
          placeholder="Your Email"
          value={`tdiwash12@gmail.com`}
          prefix={<MdMailOutline className={`text-gray`} />}
          className={`p-3 hover:border-primary focus-within:border-primary`}
          onChange={(e) => handleChnageEmail(e.target.value)}
        />
      </Form.Item>

      {email ? <div className={` -mt-5 h-8`}>{validateEmail()}</div> : null}

      <Form.Item<FieldType>
        name="password"
        // rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          id="password"
          name="password"
          placeholder="Password"
          value={`meroP@ssword`}
          // onChange={(e) => checkStrength(e.target.value)}
          onChange={(e) => {
            checkStrength(e.target.value);
            handleChnagePassword(e.target.value);
          }}
          prefix={<LockOutlined className={`text-gray`} />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className={`p-3 hover:border-primary focus-within:border-primary`}
        />
      </Form.Item>

      {pass ? <div className={`-mt-5 h-8`}>{validatePassword()}</div> : null}

      <div className="flex flex-col w-full -mx-1 mt-4 mb-10">
        <span className={`text-sm mb-3 font-medium text-dark-blue`}>
          Password Strength
        </span>
        <div className={`flex items-center justify-between`}>
          {[...Array(5)].map((_, i) => (
            <div className="w-1/5 px-1" key={i}>
              <div
                className={`h-2 rounded-xl bg-slate-300 transition-colors ${
                  i < passwordScore
                    ? passwordScore <= 2
                      ? "!bg-red-400"
                      : passwordScore <= 4
                      ? "!bg-yellow-400"
                      : "!bg-primary"
                    : "bg-gray-200"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <Form.Item<FieldType>>
        <Checkbox
          onChange={onChange}
          style={
            showRememberError
              ? { boxShadow: '1px 1px 2px 0px red', borderRadius: '0px' }
              : {}
          }
        >
          <p className={`text-xs text-gray font-normal`}>
            {`By creating an account, you agree to our `}
            <NavLink
              to={`/terms-and-conditions`}
              className={`text-primary font-bold`}
            >
              Term and Conditions
            </NavLink>
          </p>
        </Checkbox>
        {showRememberError && (
          <div className="mt-1">
            <span style={{ color: 'red', fontSize: '12px' }}>
              Please agree to Terms and Conditions
            </span>
          </div>
        )}
      </Form.Item>

      <Button
        onClick={() => {
          if (btnEmail === false) {
            setEmail(true);
          }
          if (btnPass === false) {
            setPass(true);
          }
        }}
        htmlType="submit"
        className={`bg-primary p-2 h-auto rounded-lg text-white text-base font-semibold w-full`}
      >
        Register
      </Button>

      <div className={`flex gap-1 justify-center items-center mt-3 mb-6`}>
        <span className={`text-sm font-medium text-gray`}>
          Have an account?
        </span>
        <NavLink
          to={`/auth/login`}
          className={`text-sm font-semibold text-primary`}
        >
          Sign In
        </NavLink>
      </div>
      {/* <Divider className={`h-0.5 w-full bg-fade-white`}>
        <h4 className={`text-base text-light-gray font-bold bg-white px-2`}>
          Connect with
        </h4>
      </Divider> */}
      {/* <ul className={`flex gap-4 items-center justify-center mt-6`}>
        {socialLinks.map(({ icon, name, href }, i) => (
          <li key={i}>
            <a href={href}>
              <img src={icon} alt={`${name} logo`} className={`w-6`} />
            </a>
          </li>
        ))}
      </ul> */}
    </Form>
  );
};

export default RegisterForm;
