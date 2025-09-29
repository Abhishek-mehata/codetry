import { Icon } from "leaflet";
import { FC, useEffect, useState } from "react";
import { Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Images, Svg } from "../../assets";
import Button from "../shared/Button";
import { message } from "antd";
import { continents } from "../../lib/constants/stays";
import Map from "./Map";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { RootAppState } from "../../redux/store";
import { setMapMarkedLocation } from "../../redux/reducers/places";
import { MarkedLocation } from "../../types/places";

type LatLng = {
  lat: number;
  lng: number;
};

const customIcon = new Icon({
  iconUrl: Svg.marker,
  iconSize: [50, 50],
});

const LocationMarker: FC<{
  position: LatLng;
  mapUserMarkedLocation: MarkedLocation;
  markerDetails?: (data: MarkedLocation) => void;
}> = ({ position, markerDetails, mapUserMarkedLocation }) => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const [coordinates, setCoordinates] = useState<LatLng>(position);

  useEffect(() => {
    if (map && position.lat !== undefined && position.lng !== undefined) {
      setCoordinates(position);
      map.setView([position.lat, position.lng]);
    }
  }, [map, position]);

  useEffect(() => {
    if (markerDetails) {
      markerDetails(mapUserMarkedLocation);
    }
  }, []);

  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;

    if (![lat, lng].includes(0)) {
      setCoordinates({
        lat,
        lng,
      });
      getPlaceDetails(lat, lng);
      map.setView([lat, lng], map.getZoom());
    }
  });

  const getPlaceDetails = async (lat: number, lng: number) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${
      import.meta.env.VITE_OPENCAGE_API_KEY
    }`;

    try {
      const response = await axios.get(url);

      const {
        components: { continent, country, city, state, county, postcode },
        geometry: { lat, lng },
        formatted,
      } = response.data.results[0];

      const getAddress = (): string => {
        if (typeof formatted !== "string") {
          throw new TypeError("formatted should be a string");
        }

        if (!formatted.includes(",")) return formatted;

        return formatted.split(",")[0].trim() === "unnamed road"
          ? formatted.split(",").slice(1).join(",").trim()
          : formatted;
      };

      const data = {
        continent,
        country,
        city: city || "",
        district: county || (getAddress() as string).split(",")[0],
        state,
        address: getAddress(),
        postalCode: postcode || 0,
        geometry: { lat, lng },
      };

      if (response.data.results && response.data.results.length > 0) {
        dispatch(setMapMarkedLocation(data));
      } else {
        message.error("No details available for this location.");
      }
    } catch (error) {
      message.error(`Error : ${error}`);
    }
  };

  return coordinates === null ? null : (
    <Marker position={coordinates} icon={customIcon}>
      <Popup>
        <div className={`w-60 rounded overflow-hidden`}>
          <div
            className={`w-fit`}
          >{`You clicked at ${coordinates.lat}, ${coordinates.lng}`}</div>
          <figure className={`mt-2`}>
            <img
              className={`object-cover object-center`}
              src={Images.download_bg}
            />
          </figure>
        </div>
      </Popup>
    </Marker>
  );
};

interface MapProps {
  showContinent?: boolean;
  mapDetails: (data: MarkedLocation) => void;
}

const SearchMap: FC<MapProps> = ({ mapDetails, showContinent = true }) => {
  const provider = new OpenStreetMapProvider();
  const [location, setLocation] = useState<string>("");

  const {
    mapMarkedLocation,
    addPlaceDetails: { latitude, longitude },
  } = useAppSelector((state: RootAppState) => state.places);

  const [position, setPosition] = useState<LatLng>(continents[1].coordinates);

  useEffect(() => {
    setPosition(
      latitude === 0 && longitude === 0
        ? continents[1].coordinates
        : {
            lat: latitude,
            lng: longitude,
          }
    );
  }, [latitude,longitude]);

  const searchLocation = async () => {
    const results = await provider.search({ query: location });
    if (results.length > 0) {
      const { x, y } = results[0];

      setPosition({
        lat: y,
        lng: x,
      });
      setLocation("");
    } else {
      message.error(`Location not found`);
    }
  };

  return (
    <div className={`relative w-full h-full`}>
      {mapMarkedLocation?.address && (
        <div>
          <h3 className={`text-dark-blue text-lg font-semibold`}>
            You entered:
          </h3>
          <div
            className={`flex flex-col items-start justify-center gap-1 mt-2`}
          >
            <h4 className={`text-primary text-md font-medium`}>
              {mapMarkedLocation?.address}
            </h4>
          </div>
        </div>
      )}
      <h5 className={`text-dark-gray mt-6`}>
        If needed, drag the map pin to adust it’s location.
      </h5>
      {showContinent && (
        // <div className={`flex justify-center items-center gap-4 my-4 h-10`}>
        <div
          className={` md:flex md:flex-wrap flex flex-col md:flex-row gap-3 md:justify-start md:items-center md:gap-4 my-4`}
        >
          {continents.map(({ title, coordinates }, i) => (
            <Button
              key={`${title}_${i}`}
              title={title}
              variant={coordinates === position ? `filled` : `outline`}
              onClick={() => setPosition(coordinates)}
            />
          ))}
        </div>
      )}

      <div className={`relative h-96 border-dashed border-2 border-primary`}>
        <div
          className={`flex items-start justify-end absolute z-[999] top-0 left-0 right-0 bottom-0 h-20 w-full`}
        >
          <div className={` flex flex-col md:flex-row mt-1 mr-1  `}>
            <input
              type="text"
              value={location}
              placeholder="Enter location"
              onChange={(e) => setLocation(e.target.value)}
              className={`p-2 text-dark-blue border-0 focus-visible:border-0 rounded md:mr-2 w-40 md:w-full`}
            />
            <Button
              title={`Search`}
              variant="filled"
              onClick={searchLocation}
            />
          </div>
        </div>
        <Map center={[position.lat, position.lng]}>
          <LocationMarker
            position={position}
            mapUserMarkedLocation={mapMarkedLocation}
            markerDetails={(data) => {
              mapDetails(data);
            }}
          />
        </Map>
      </div>
    </div>
  );
};

export default SearchMap;
