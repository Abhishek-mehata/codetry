import { FC, useState, useEffect } from "react";
import { Form, Button, FormProps, Input, message } from "antd";
import {
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
// import type { CheckboxProps } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { login } from "../../../redux/actions/auth";

type FieldType = {
  email: string;
  password: string;
  remember: string;
};

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  // const [remember, setRemember] = useState<boolean>(false);
  // console.log(remember)
  const navigate = useNavigate();
  const isAdmin = useSelector(
    (state: RootAppState) => state.auth.isAdmin
  );

  useEffect(() => {
    if (isAdmin) {
      navigate(`/admin/dashboard`);
    }
  }, [isAdmin, navigate]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { email, password } = values;
     dispatch(login(email, password));

  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    message.error(`Failed: ${errorInfo}`);
  };

  // const onChange: CheckboxProps["onChange"] = (e) =>
  //   setRemember(e.target.checked);


  // For email and password validation
  const [btnEmail, setBtnEmail] = useState(false);
  const [email, setEmail] = useState(false);
  const handleChnageEmail = (val: string) => {
    // if (val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
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
      <p className="text-red-400">Please enter a valid Email!</p>
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
      <p className="text-red-400">Password must be at least 5 characters!</p>
    ) : (
      ""
    );
  };

  return (
    <Form
      name="basic"
      style={{ maxWidth: 440 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={`w-full`}
    >
      <Form.Item<FieldType>
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          size="large"
          id="email"
          name="email"
          placeholder="Email"
          prefix={<UserOutlined className={`text-gray`} />}
          className={`p-3 hover:border-primary focus-within:border-primary`}
          onChange={(e) => handleChnageEmail(e.target.value)}
        />
      </Form.Item>

      {email ? <div className={`-mt-5 h-8`}>{validateEmail()}</div> : null}

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          id="password"
          name="password"
          placeholder="Password"
          prefix={<LockOutlined className={`text-gray`} />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className={`p-3 hover:border-primary focus-within:border-primary required`}
          onChange={(e) => handleChnagePassword(e.target.value)}
        />
      </Form.Item>

      {pass ? <div className={`-mt-5 h-8`}>{validatePassword()}</div> : null}

      {/* <Form.Item<FieldType> name="remember">
        <Checkbox onChange={onChange}>
          <p className={`text-xs text-gray font-normal`}>Remember me</p>
        </Checkbox>
      </Form.Item> */}

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
        Log In
      </Button>
    </Form>
  );
};

export default LoginForm;
