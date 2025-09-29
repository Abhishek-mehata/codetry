import { FC, useEffect, useState } from "react";
import Button from "../shared/Button";
import { message } from "antd";
import { continents } from "../../lib/constants/stays";
import Map from "./Map";
import { RootAppState } from "../../redux/store";
import { MarkedLocation } from "../../types/places";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import LocationMarker from "./LocationMarker";
import axios from "axios";
import { setMapMarkedLocation, storeNewPlaceDetails } from "../../redux/reducers/places";
import { storeNewEventDetails } from "../../redux/reducers/events";

export type LatLng = {
  lat: number;
  lng: number;
};



interface MapProps {
  showContinent?: boolean;
  mapDetails: (data: MarkedLocation) => void;
}




// Main Search Map Start
const SearchMap: FC<MapProps> = ({ mapDetails, showContinent = true }) => {
  const { addPlaceDetails } = useAppSelector(
    (state: RootAppState) => state.places
  );
  const { addEventsDetails } = useAppSelector(
    (state: RootAppState) => state.events
  );


  const dispatch = useAppDispatch()
  const [location, setLocation] = useState<string>("");

  const {
    mapMarkedLocation,
    addPlaceDetails: { latitude, longitude },
  } = useAppSelector((state: RootAppState) => state.places);

  const [position, setPosition] = useState<LatLng>(continents[1].coordinates);


  // Get Place Details With OpenCage Start
  const getPlaceDetails = async (lat: number, lng: number) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${import.meta.env.VITE_OPENCAGE_API_KEY
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
      // For Stays Map Inputs 
      const location = {
        ...addPlaceDetails,
        city: city || "",
        country,
        latitude: lat,
        longitude: lng,
        street: getAddress(),
        province: state,
        postal_code: postcode || "",
      };

      if (response.data.results && response.data.results.length > 0) {
        // Set's Marker in Map
        dispatch(setMapMarkedLocation(data));
        // Updates The Map Form Input of Stays
        dispatch(storeNewPlaceDetails(location));
        // Updates The Map Form Input Of Events
        dispatch(storeNewEventDetails({
          ...addEventsDetails,
          location: getAddress(),
          onsiteEvent: {
            ...addEventsDetails.onsiteEvent,
            latitude: lat,
            longitude: lng,
          },
        }))
      } else {
        message.error("No details available for this location.");
      }
    } catch (error) {
      message.error(`Error : ${error}`);
      alert("This is the error")
    }
  };
  // Get Place Details With OpenCage End

  // Get Place Details With OpenCage Start
  const getPlace = async () => {
    // Use OpenCage for forward geocoding
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`;
    try {
      const response = await axios.get(url);
      const data = response.data.results[0];
      if (!data) {
        message.error("No details available for this location.");
        return;
      }
      const { lat, lng } = data.geometry;
      setPosition({ lat, lng });
      setLocation(""); // Clear input

      const {
        components: { country, city, state, postcode },
        formatted,
      } = data;

      const getAddress = (): string => {
        if (typeof formatted !== "string") {
          throw new TypeError("formatted should be a string");
        }
        if (!formatted.includes(",")) return formatted;
        return formatted.split(",")[0].trim() === "unnamed road"
          ? formatted.split(",").slice(1).join(",").trim()
          : formatted;
      };

      // Create the mapMarkedLocation data structure
      const mapLocationData = {
        continent: "",
        country: country || "",
        city: city || "",
        district: "",
        state: state || "",
        address: getAddress(),
        postalCode: postcode || 0,
        geometry: { lat, lng },
      };

      // For Stays Map Inputs 
      const searchNewLocation = {
        ...addPlaceDetails,
        city: city || "",
        country: country || "",
        latitude: lat,
        longitude: lng,
        street: getAddress(),
        province: state || "",
        postal_code: postcode || "",
      };

      // Set's Marker in Map - This is what was missing!
      dispatch(setMapMarkedLocation(mapLocationData));
      // Updates The Map Form Input of Stays
      dispatch(storeNewPlaceDetails(searchNewLocation));
      // Update Events Redux state with the correct address and coordinates
      dispatch(storeNewEventDetails({
        ...addEventsDetails,
        location: getAddress(),
        onsiteEvent: {
          ...addEventsDetails.onsiteEvent,
          latitude: lat,
          longitude: lng,
        },
      }));
    } catch (error) {
      message.error(`Error : ${error}`);
    }
  };
  // Get Place Details With OpenCage End

  useEffect(() => {
    setPosition(
      latitude === 0 && longitude === 0
        ? continents[1].coordinates
        : {
          lat: latitude,
          lng: longitude,
        }
    );
  }, [latitude, longitude]);

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
        If needed, drag the map pin to adust it's location.
      </h5>
      {showContinent && (

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
              onClick={getPlace}
            />
          </div>
        </div>
        <Map center={[position.lat, position.lng]}>
          <LocationMarker
            getPlaceDetails={getPlaceDetails}
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
// Main Search Map End

export default SearchMap;
