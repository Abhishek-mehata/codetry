import { Radio, RadioChangeEvent, Space } from "antd";
import { FC } from "react";

interface DataItems {
  label: string;
  key: string;
}

interface Props {
  items: DataItems[];
  value?: string | number;
  onChange?: (e: RadioChangeEvent) => void;
}

const RadioBox: FC<Props> = ({ items, value, onChange }) => {
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        {items.map(({ label, key }: DataItems, i: number) => (
          <Radio key={i} name={key} value={key} className={`text-base`}>
            {label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default RadioBox;
