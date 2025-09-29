import { FC } from "react";
import { Avatar, Divider, Input } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiForkKnife } from "react-icons/pi";
import { IoIosLaptop } from "react-icons/io";
import { WiTime3 } from "react-icons/wi";
import { LuUsers } from "react-icons/lu";
import { TiStar } from "react-icons/ti";
import { Button } from "../../../components";
import { IoCheckmark } from "react-icons/io5";

const { TextArea } = Input;

const Title: FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => (
  <h2 className={`text-dark-blue text-2xl font-semibold ${className}`}>
    {label}
  </h2>
);

const SubTitle: FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => (
  <h3 className={`text-lg text-dark-blue font-bold ${className}`}>{label}</h3>
);

const Text: FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => <h4 className={`text-dark-gray max-w-[34ch] ${className}`}>{label}</h4>;

const ReservationDetailsPage: FC = () => {
  return (
    <div className={`bg-white p-8`}>
      <div
        className={`flex w-full border-2 overflow-hidden border-primary rounded-lg mx-auto`}
      >
        <figure className={`w-2/5`}>
          <img
            src={`https://images.unsplash.com/photo-1718040506078-5a7b90746511?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            className={`object-cover object-center bg-center h-72 w-full`}
          />
        </figure>
        <div className={`flex flex-col gap-3 p-6 w-3/5`}>
          <div className={`flex items-center justify-between`}>
            <h3 className={`text-lg text-dark-blue font-bold`}>
              Pasta making and Wine tasting
            </h3>
          </div>
          <div className={`flex items-center justify-between`}>
            <div className={`flex gap-3 flex-col`}>
              <div className={`flex gap-2 items-center`}>
                <PiForkKnife className={`text-dark-gray`} />
                <Text label={`Cooking`} />
              </div>
              <div className={`flex gap-2 items-center`}>
                <HiOutlineLocationMarker className={`text-dark-gray`} />
                <h4
                  className={`text-dark-gray`}
                >{`Khumjung, Nepal WRX5+6XQ, EBC Path, Khumjung 56000, Nepal WRX5+6XQ, EBC Path, Khumjung 56000, Nepal`}</h4>
              </div>
              <div className={`flex gap-2 items-center`}>
                <div className={`flex gap-2 items-center`}>
                  <IoIosLaptop className={`text-dark-gray`} />
                  <h4 className={`text-dark-gray`}>Zoom</h4>
                </div>
                <div className={`flex gap-2 items-center`}>
                  <WiTime3 className={`text-dark-gray`} />
                  <h4 className={`text-dark-gray`}>2.5 hours</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`p-6 text-end`}>
          <button className={`flex gap-2`}>
            <IoCheckmark className={`text-2xl text-primary`} />
            <span className={`text-base font-semibold capitalize text-primary`}>
              {`Accept`}
            </span>
          </button>
          <h4 className={`text-dark-gray text-xl capitalize font-bold mt-4`}>
            {`$${200}`}
          </h4>
          <span
            className={`mt-2 text-dark-gray text-base font-medium`}
          >{`night`}</span>
        </div>
      </div>
      <div className={`flex items-start mt-12`}>
        <div className={`w-1/4`}>
          <Title label={`Reservation details`} />
        </div>
        <div className={`w-[30%]`}>
          <SubTitle label={`Status`} />
          <div className={`flex gap-2 items-center mt-2`}>
            <div className={`flex gap-2 items-center`}>
              <IoIosLaptop className={`text-primary`} />
              <h4 className={`text-primary`}>Upcoming</h4>
            </div>
            <Text label={`in 10 days`} />
          </div>
          <SubTitle label={`Duration`} className={`mt-4`} />
          <Text label={`2 nights`} className={`mt-2`} />
          <Text
            label={`This is a random text to check if the auto-layout works well.`}
          />
        </div>
        <div className={`w-[30%]`}>
          <SubTitle label={`Check-in`} />
          <h4 className={`text-dark-gray mt-2`}>{``}</h4>
          <Text label={`21-Oct-2022 14:00`} className={`mt-2`} />
          <SubTitle label={`Check-out`} className={`mt-4`} />
          <Text label={`23-Oct-2022 12:00`} className={`mt-2`} />
        </div>
      </div>
      <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
      <div className={`flex items-start`}>
        <div className={`w-1/4`}>
          <Title label={`Additional info`} />
        </div>
        <div className={`w-[30%]`}>
          <SubTitle label={`Reference number`} />
          <Text label={`111000223451N`} className={`mt-2`} />
          <Text
            label={`ask the reference number from the guest before check-in`}
          />
        </div>
        <div className={`w-[30%]`}>
          <SubTitle label={`Check-in`} />
          <Text label={`No special requirements`} className={`mt-2`} />
        </div>
      </div>
      <Divider className={`h-0.2 w-full bg-light-gray mt-8`} />
      <div className={`flex tems-start mt-12`}>
        <div className={`w-1/4`}>
          <Title label={`Your Host`} />
        </div>
        <div className={`w-[30%]`}>
          <div className={`flex gap-2`}>
            <Avatar
              src={`https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
              style={{ verticalAlign: "middle", height: 80, width: 80 }}
              size="large"
            />
            <div className={`flex flex-col gap-2 items-start justify-center`}>
              <h4 className={`text-dark-blue text-lg font-bold`}>
                Diwash Tiwari
              </h4>
              <div className={`flex gap-3`}>
                <div className={`flex gap-2 items-center`}>
                  <LuUsers className={`text-dark-gray text-lg`} />
                  <h4 className={`text-black`}>12 hostings</h4>
                </div>
                <div className={`flex gap-2 items-center`}>
                  <TiStar className={`text-dark-gray text-lg`} />
                  <h4 className={`text-black`}>4.2</h4>
                </div>
              </div>
            </div>
          </div>
          <div className={`border border-primary p-2 mt-4 rounded`}>
            <TextArea
              rows={6}
              variant="borderless"
              className={`text-sm text-black`}
            />
          </div>
          <div className={`mt-4`}>
            <Button title="Send" variant="filled" className={`block ml-auto`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsPage;
