/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { FC} from "react";
import { EventModel } from "../../../../types/event";
import { getCurrencySymbol } from "../../../../utils/currencySymbols";
import useExtractCityCountry from "../../../../hooks/useExtractCityCountry";

const EventCard: FC<{ data: EventModel }> = ({ data }) => {
  const { id, name, location, eventType, price, language, files, currency, photos } =
    data as any;
  const {city,country} = useExtractCityCountry(location);
  return (
    <NavLink
      to={`/events/${id}`}
      className={`w-full bg-white shadow-lg rounded-lg overflow-hidden smooth hover:scale-105`}
    >
      {/* <img
        src={`${ImageAPI}/${files[0].file_key}`}
        alt=""
        className={` max-h-[200px] w-full object-cover`}
      /> */}
      {files?.length > 0 || photos.length > 0 ? (
        <img
          src={files[0]?.url || photos[0]}
          alt={files[0]?.original_name || "Event Image"}
          className="h-[200px] w-full object-cover"
        />
      ) : (
        <div className="h-[200px] w-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className={`p-4`}>
        <div className={`text-lg flex items-center justify-between`}>
          <h2
            className={`truncate text-primary font-medium`}
          >{name}</h2>
          <span
            className={`text-gray font-medium`}
          >
            {eventType.toLowerCase()}
          </span>
        </div>
        <span
          className={`text-sm font-medium text-dark-blue break-words overflow-hidden custom-clamp mb-2`}
        >{city}, {country}</span>
        <p
          className={`text-ellipsis text-[13px] font-medium text-gray capitalize`}
        >{`Language: ${language}`}</p>


        <p className="text-base text-gray-800 mt-3 flex justify-between items-end">
          <span className="text-purple-700 font-semibold">
            ★
            <span className="text-dark-blue font-semibold"> {0}</span>
            <span className="text-gray font-normal"> (0)</span>
          </span>

          <span className={`text-ellipsis text-dark-blue font-semibold text-lg`}>
            {`${getCurrencySymbol(currency)} ${price}`}
            <span className={`text-gray text-sm font-normal`}> {eventType === "ONSITE" ? "/person" : "/device"}</span>
          </span>
        </p>
      </div>
    </NavLink>
  );
};

export default EventCard;
