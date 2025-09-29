/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";

const useObjectValidation = () => {
  let InvalidKeys: string[] = [];

  const validate = (val: any) => {
    InvalidKeys = [];

    const checkObject = (obj: any, prefix: string = ""): void => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "string" && !value.trim()) {
          InvalidKeys.push(fullKey);
        } else if (typeof value === "number" && value === 0) {
          InvalidKeys.push(fullKey);
        } else if (Array.isArray(value) && value.length === 0) {
          InvalidKeys.push(fullKey);
        } else if (value !== null && value instanceof Object) {
          checkObject(value, fullKey);
        }
      });
    };

    checkObject(val);

    InvalidKeys.forEach((key) => {
      const text: string[] = [];

      key
        .split("")
        .forEach((value, i) =>
          value === value.toUpperCase()
            ? text.push("_", value)
            : text.push(i === 0 ? value.toUpperCase() : value)
        );

      const errorKey = text.join("").replace(new RegExp("_", "g"), " ");
      message.error(
        `Please ${errorKey.includes("images") ? `Add` : `Enter`} ${errorKey}`
      );
    });

    return InvalidKeys;
  };

  return {
    validate,
  };
};

export default useObjectValidation;
