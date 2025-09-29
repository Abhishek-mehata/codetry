import { NavLink } from "react-router-dom";
// import { Svg } from "../../../../assets";
import { FC } from "react";
import { Place } from "../../../../types/places";
import { ImageAPI } from "../../../../api";
import { Link } from "react-router-dom";
import { getCurrencySymbol } from "../../../../utils/currencySymbols";
// import { getCurrencySymbol } from "../../../../utils/currencySymbols";

const PlaceCard: FC<{ data: Place }> = ({ data }) => {
  const {
    id,
    title,
    subtitle,
    rating,
    cover_image,
    city,
    country
  } = data;

  const imageUrl =
  cover_image?.url ||
  (Array.isArray(data?.images) && data.images.length > 0 ? data.images[0].url : undefined) ||
  (cover_image?.file_key ? `${ImageAPI}/${cover_image.file_key}` : undefined) ||
  "/fallback-image.jpg";
  return (

    <NavLink
      to={`/stays/${id}`}
      className="w-full bg-white shadow-lg rounded-lg overflow-hidden smooth hover:scale-105"
    >
      <img
        src={imageUrl}
        alt={cover_image?.original_name || "Place cover image"}
        className="h-[200px] max-h-[200px] w-full object-cover"
      />
      <div className="p-4">
        <Link to={`/stays/${data.id}`}>
          <h3 className="text-lg font-medium text-primary">{title.length > 25 ? title?.slice(0, 25) + "..." : title}</h3>
        </Link>
        <p className="text-sm font-medium text-dark-purple">
          {city}, {country}
        </p>
        <p className="text-sm font-normal text-gray">
          {subtitle && subtitle?.length > 60 ? subtitle?.slice(0, 60) + "..." : subtitle}
        </p>
        <p className="text-base text-gray-800 mt-3 flex justify-between items-end">
          <span className="text-purple-700 font-semibold">
            ★
            <span className="text-dark-blue font-semibold"> {rating || 0}</span>
            <span className="text-gray font-normal"> (0)</span>
          </span>
          
          {
            data?.lowestRoomPrice && (
              <span className="text-dark-blue text-lg font-semibold">
                {getCurrencySymbol(data?.currency || "USD")} {data?.lowestRoomPrice} <span className="text-gray font-normal text-sm"> /night</span>
              </span>
            )
          }
        </p>
      </div>
    </NavLink>
  );
};

export default PlaceCard;
