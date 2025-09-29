import { FC } from "react";
import { FiEdit } from "react-icons/fi";
import { Images, Svg } from "../../../../assets";
import { useNavigate } from "react-router-dom";
import { RoomModel } from "../../../../types/places";
import DeleteRoom from "../../../../pages/dashboard/Stays/Delete/DeleteRoom";

const RoomCard: FC<{ data?: RoomModel }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`rounded-xl shadow-xl hover:border-primary smooth overflow-hidden`}
    >
      <img
        src={Images.download_bg}
        alt=""
        className={`max-h-[200px] w-full object-cover`}
      />
      <div
        className={`flex text-start flex-col items-start justify-start p-4 gap-4`}
      >
        <h3 className={`text-lg font-medium text-dark-blue`}>{data?.title}</h3>
        <div className={`flex gap-2 items-center`}>
          <img src={Svg.bed} alt="bed icon" />
          <h3 className={`text-sm text-dark-blue font-semibold`}>{`Beds -`}</h3>
          <div className={`flex gap-2`}>
            {data?.beds.map(({ bed_type, amount }, i) => (
              <div key={i}>
                <h4 className={`text-sm text-gray font-normal capitalize`}>
                  {`${amount} ${bed_type}`}
                  {i !== data?.beds.length - 1 && <span>{`,`}</span>}
                </h4>
              </div>
            ))}
          </div>
        </div>
        <div className={`flex gap-2 items-center`}>
          <img src={Svg.boxTick} alt="bed icon" />
          <h3 className={`text-sm text-dark-blue font-semibold`}>{`Type -`}</h3>
          <h4 className={`text-sm text-gray font-normal capitalize`}>
            {data?.room_type}
          </h4>
        </div>
        <div className={`flex items-center justify-between w-full`}>
          <div className={`gap-2 items-center`}>
            <h3
              className={`text-xl font-medium text-dark-blue`}
            >{`$${data?.price}`}</h3>
            <h4 className={`text-sm text-gray font-normal`}>{`per night`}</h4>
          </div>
          <div className={`flex gap-3 items-center`}>
            <button
              type="button"
              className={`p-3 bg-white rounded-full`}
              onClick={() =>
                navigate(`/app/stays/${data?.place_id}/rooms/edit/${data?.id}`)
              }
            >
              <FiEdit className={`text-primary text-base`} />
            </button>
            {data && data.id && <DeleteRoom roomId={data?.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
