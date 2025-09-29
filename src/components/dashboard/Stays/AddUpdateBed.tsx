import { Dropdown, Space, Input } from "antd";
import { FC, useState, useEffect } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { bedTypes } from "../../../lib/constants/dashboard";
import { BedModel } from "../../../types/places";
import { DownOutlined } from "@ant-design/icons";

interface BedProps {
  method?: "add" | "update";
  data?: BedModel;
  bedData: (value: BedModel, index: number) => void;
  onRemove: (index: number) => void;
  index: number;
}

const AddUpdateBed: FC<BedProps> = ({
  method = "add",
  data,
  bedData,
  onRemove,
  index,
}) => {
  const [state, setState] = useState<BedModel>({
    bed_type: bedTypes[0].label,
    amount: 1,
  });

  useEffect(() => {
    if (method === "update" && data) {
      setState(data);
    }
  }, []);

  useEffect(() => {
    bedData(state, index);
  }, [state]);

  const changeQuantity = (method: "plus" | "minus") =>
    setState({
      ...state,
      amount:
        state.amount === 1 && method === "minus"
          ? 1
          : method === "minus"
          ? state.amount - 1
          : state.amount + 1,
    });

  return (
    <div className={`flex flex-col gap-3 justify-between items-start w-full`}>
      <div className={`flex justify-between items-center w-full`}>
        <h4 className={`text-dark-gray text-md font-semibold`}>{`Bed ${
          index + 1
        }`}</h4>
        <button
          type="button"
          className={`text-primary`}
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      </div>

      <div className={`flex gap-2 justify-between items-start w-full`}>
        <div className={`border border-fade-white rounded-lg py-3 px-4 w-full`}>
          <h5 className={`text-light-gray mb-1`}>Bed Type</h5>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: bedTypes,
              onClick: ({ key }) =>
                setState({
                  ...state,
                  bed_type: key,
                }),
            }}
            className={`cursor-pointer`}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space className={`flex items-center justify-between w-full`}>
                <h5 className={`text-dark-gray capitalize`}>
                  {state.bed_type}
                </h5>
                <DownOutlined className={`text-dark-gray text-sm`} />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div
          className={`relative border border-fade-white rounded-lg py-3 px-4 w-72`}
        >
          <h5 className={`text-dark-gray`}>Quantity</h5>
          <Input
            variant="borderless"
            className={`mt-1 p-0`}
            value={state.amount}
            placeholder="Enter quantity"
          />
          <div className={`absolute right-2 bottom-0`}>
            <button type="button" onClick={() => changeQuantity("plus")}>
              <CiCirclePlus className={`text-3xl text-gray`} />
            </button>
            <button type="button" onClick={() => changeQuantity("minus")}>
              <CiCircleMinus className={`text-3xl text-gray`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateBed;
