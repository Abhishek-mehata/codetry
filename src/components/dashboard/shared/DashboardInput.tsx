
import { Input } from "antd";
import { FC } from "react";
import "../../../../src/index.css"
const { TextArea } = Input;

interface Props {
  name?: string;
  title?: string;
  value?: string;
  subTitle?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type?: "text" | "textarea" | "password"; // Renamed from "input" to "type"
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  rows?:number;
}

const DashboardInput: FC<Props> = ({
  name,
  title,
  value,
  subTitle,
  className,
  type = "text", // ✅ Default type is now "text"
  maxLength,
  minLength,
  placeholder,
  onChange,
  disabled = false,
  onBlur,
  error,
  rows = 6
}) => (
  <div className={`${className} w-full`}>
    {title && <h3 className="text-dark-blue text-base font-semibold md:text-nowrap text-wrap ">{title}</h3>}
    {subTitle && <h5 className="text-gray text-sm mt-1">{subTitle}</h5>}

    <div className={`border border-fade-white rounded-lg ${title?.length ? "mt-2" : ""} w-full`}>
      {type === "textarea" ? (
        <TextArea
          rows={rows}
          name={name}
          value={value}
          maxLength={maxLength}
          className={`p-4 w-full border-light-primary border ${error ? "border-red-500" : ""}`}
          onChange={onChange}
          onBlur={onBlur}
          minLength={minLength}
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <Input
          name={name}
          type={type} //  Ant Design expects "type", not "input"
          value={value}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          className={`popins p-4 w-full border-light-primary border font-normal ${error ? "border-red-500" : ""}`}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
    </div>

    {maxLength && (
      <h5 className="text-sm text-dark-gray mt-2">
        {minLength ? `Minimum ${minLength} characters | ` : ""}Maximum {maxLength} characters
      </h5>
    )}

    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default DashboardInput;
