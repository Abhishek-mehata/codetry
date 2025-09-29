/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dropdown, RadioChangeEvent, Select, Space, message } from "antd";
import { FC, useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { roomTypes } from "../../../lib/constants/dashboard";
import Button from "../../shared/Button";
import TabIntro from "../shared/TabIntro";
import { MdOutlineBed } from "react-icons/md";
import { DownOutlined } from "@ant-design/icons";
import DashboardInput from "../shared/DashboardInput";
import { BedModel, RoomModel } from "../../../types/places";
import { useObjectValidation } from "../../../hooks";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { createRoom, updateRoom } from "../../../redux/actions/places";
import { AddUpdateBed, ImageUploader, RadioBox } from "../..";
import { discount } from "../../../lib/constants/events";
import { initRoomState, initBedState } from "../../../lib/constants/stays";
import { useNavigate, useParams } from "react-router";

interface Props {
  data?: RoomModel;
  roomId?: number;
  method: "add" | "update";
  roomData?: (value: RoomModel) => void;
}

const AddUpdateRoom: FC<Props> = ({ method, data, roomId, roomData }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: placeId } = useParams();
  const { validate } = useObjectValidation();
  const [roomState, setRoomState] = useState<RoomModel>({
    ...initRoomState,
    room_type: roomTypes[0].label,
  });
  const [bedState, setBedState] = useState<BedModel[]>(initRoomState.beds);

  useEffect(() => {
    if (method === "update" && data) {
      setRoomState({
        ...data,
        extraAmount: Number(data.extraAmount),
        isDiscountAvailable: data.isDiscountAvailable ? "yes" : "no",
      });
      setBedState(data.beds);
    }
  }, []);

  useEffect(() => {
    if (roomData) {
      roomData(roomState);
    }
  }, [roomState]);

  const onRadioChange = (e: RadioChangeEvent, type: string) => {
    setRoomState((prevState) => {
      return {
        ...prevState,
        [type]: e.target.value,
      };
    });
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRoomState({ ...roomState, [name]: value });
  };

  const handleSuccess = () => {
    navigate(`/app/stays/${placeId}/rooms`);
    setBedState([initBedState]);
    setRoomState(initRoomState);
  };

  const submitRoom = async () => {
    const {
      beds,
      id,
      place_id,
      price,
      stock,
      extraAmount,
      transferService,
      isDiscountAvailable,
      discount,
      ...rest
    } = roomState;

    if (isDiscountAvailable === "yes") {
      if (!discount) {
        message.error("Discount is required");
        return;
      }
    }

    if (roomState.stock === 0) {
      message.error("Stock must be more than 1");
      return;
    }

    const isValid = validate(rest);

    if (!isValid.length && placeId) {
      const data = {
        beds: bedState,
        transferService,
        place_id: Number(placeId),
        price: Number(price),
        stock: Number(stock),
        discount: isDiscountAvailable === "yes" ? Number(discount) : 0,
        isDiscountAvailable: isDiscountAvailable === "yes" ? true : false,
        ...rest,
      };

      const isExtraAmtIncluded = Number(extraAmount) === 0;

      const postData = !isExtraAmtIncluded
        ? {
            ...data,
            extraAmount: Number(extraAmount),
          }
        : data;

      if (method === "add") {
        const success = await dispatch(createRoom(postData as any));
        return success && handleSuccess();
      } else if (method === "update") {
        const { createdAt, beds, ...rest } = postData as any;

        const updateData = {
          ...rest,
          beds: beds.map(({ bed_type, amount }: BedModel) => {
            return {
              bed_type,
              amount,
            };
          }),
        };

        const success = await dispatch(
          updateRoom({...updateData,roomId},roomId as number)
          // updateRoom(roomId as number, updateData)
        );
        return success && handleSuccess();
      }
    }
  };

  return (
    <div>
      <div className={`flex items-center justify-between`}>
        <h1 className={`text-2xl text-dark-blue font-semibold`}>
          {method === "add" ? `Create A New Room Type` : roomState.title}
        </h1>
        <Button
          title={method === "add" ? `Create` : `Update`}
          variant="filled"
          onClick={submitRoom}
          icon={<MdOutlineBed className={`group-hover:text-primary`} />}
        />
      </div>
      <div className={`bg-white p-6 rounded shadow-md mt-6`}>
        <TabIntro
          title={`Basic Room information`}
          intro={`Let guests know more about the room.`}
        />
        <div className={`flex gap-6`}>
          <div className={`w-2/4`}>
            <div
              className={`border border-fade-white rounded-lg py-3 px-4 mt-2 w-full`}
            >
              <h5 className={`text-light-gray mb-1`}>Room Type</h5>
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: roomTypes,
                  onClick: ({ key }) =>
                    setRoomState({
                      ...roomState,
                      room_type: key,
                    }),
                }}
                className={`cursor-pointer`}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className={`flex items-center justify-between w-full`}>
                    <h5 className={`text-dark-gray capitalize`}>
                      {roomState?.room_type}
                    </h5>
                    <DownOutlined className={`text-dark-gray text-sm`} />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <DashboardInput
              name="title"
              title="Title"
              className={`mt-2`}
              value={roomState.title}
              placeholder="Enter Room Name"
              onChange={onChangeHandler}
            />
            {/* <DashboardInput
              name="description"
              input="textarea"
              className={`mt-2`}
              placeholder="Enter Province"
              onChange={onChangeHandler}
            /> */}
            <DashboardInput
              name="stock"
              title="Stock"
              className={`mt-2`}
              placeholder="Enter Stock"
              onChange={onChangeHandler}
              value={String(roomState.stock)}
            />
            <h3
              className={`text-dark-blue text-base font-semibold mt-4`}
            >{`Transfer Service`}</h3>
            <Select
              defaultValue="NOT INCLUDED"
              style={{ width: `100%`, height: 40 }}
              onChange={(value) =>
                setRoomState({
                  ...roomState,
                  transferService: value,
                })
              }
              className={`border border-fade-white rounded-lg mt-2`}
              options={[
                { value: "NOT_INCLUDED", label: "NOT INCLUDED" },
                { value: "INCLUDED", label: "INCLUDED" },
                { value: "EXTRA_COST", label: "EXTRA COST" },
              ]}
            />
          </div>
          <div className={`w-2/4`}>
            <h3 className={`text-dark-blue text-base font-semibold`}>Photos</h3>
            <h5 className={`text-gray text-sm mt-1`}>
              Add photos to show off your room, especially where guests are
              staying.
            </h5>
            <ImageUploader
              className={`mt-10`}
              // imageFiles={addPlaceDetails.images}
              // onImagesSelected={(files) =>
              //   dispatch(
              //     createPlace({
              //       ...addPlaceDetails,
              //       images: files,
              //     })
              //   )
              // }
            />
          </div>
        </div>
      </div>

      <div
        className={`bg-white p-6 rounded-lg border border-fade-white shadow-md mt-6`}
      >
        <TabIntro
          title={`Beds and occupancy`}
          intro={`Assign number of beds and their type.`}
        />

        {bedState.length > 0 && (
          <div className={`grid grid-flow-row grid-cols-2 gap-4 mt-6`}>
            {bedState.map((data, i: number) => (
              <AddUpdateBed
                key={i}
                index={i}
                data={data}
                method="update"
                bedData={(value: BedModel, index: number) => {
                  setBedState((prevBedState) => {
                    const updatedBedState = [...prevBedState];
                    updatedBedState[index] = value;
                    return updatedBedState;
                  });
                }}
                onRemove={(index: number) => {
                  setBedState(() => {
                    const updatedBedState = bedState.filter(
                      (_, ind) => index !== ind
                    );
                    return updatedBedState;
                  });
                }}
              />
            ))}
          </div>
        )}

        <Button
          variant="outline"
          className={`my-6`}
          onClick={() => setBedState([...bedState, initBedState])}
          icon={
            <CiSquarePlus className={`text-primary group-hover:text-white`} />
          }
          title={`Add New Bed`}
        />
      </div>
      <div
        className={`bg-white p-6 rounded-lg border border-fade-white shadow-md mt-6 w-full`}
      >
        <TabIntro
          title={`Rate details`}
          intro={`Let guests know more about the service.`}
        />

        <div className={`flex gap-6 items-start justify-center w-full`}>
          <DashboardInput
            name="price"
            title="Price"
            placeholder="Enter Price"
            value={String(roomState.price)}
            onChange={onChangeHandler}
          />

          <DashboardInput
            name="extraAmount"
            title="Extra Amount"
            placeholder="Enter extra amount"
            value={String(roomState.extraAmount)}
            onChange={onChangeHandler}
          />

          <div className={`border-2 border-fade-white p-4 rounded-lg w-full`}>
            <h3 className={`text-dark-blue mb-3 font-semibold`}>
              Discount Available
            </h3>
            <div className={`flex gap-10 items-center w-full`}>
              <RadioBox
                items={discount}
                onChange={(e: RadioChangeEvent) =>
                  onRadioChange(e, "isDiscountAvailable")
                }
                value={roomState.isDiscountAvailable}
              />
              {roomState.isDiscountAvailable === "yes" && (
                <DashboardInput
                  name={`discount`}
                  placeholder="Enter discount"
                  value={String(roomState.discount)}
                  onChange={onChangeHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateRoom;
