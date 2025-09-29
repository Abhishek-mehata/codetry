import { Icon } from "leaflet";
import { FC, useEffect, useState } from "react";
import { MarkedLocation } from "../../types/places";
import { Images, Svg } from "../../assets";
import { Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { LatLng } from "./SearchMap";

const customIcon = new Icon({
    iconUrl: Svg.marker,
    iconSize: [50, 50],
});

// Location Marker Start
const LocationMarker: FC<{
    getPlaceDetails: (lat: number, lng: number) => void;
    position: LatLng;
    mapUserMarkedLocation: MarkedLocation;
    markerDetails?: (data: MarkedLocation) => void;
}> = ({ getPlaceDetails, position, markerDetails, mapUserMarkedLocation }) => {

    const map = useMap();
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



    return coordinates === null ? null : (
        <Marker position={coordinates} icon={customIcon}>
            <Popup>
                <div className={`rounded overflow-hidden`}>
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
// Location Marker End

export default LocationMarker;
