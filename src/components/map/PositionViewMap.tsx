// import { FC } from "react";

// import Map from "./Map";
// import { Icon } from "leaflet";
// import { Marker, Popup } from "react-leaflet";
// import { Images, Svg } from "../../assets";

// const customIcon = new Icon({
//   iconUrl: Svg.marker,
//   iconSize: [50, 50],
// });

// // type LatLng = {
// //   lat: number;
// //   lng: number;
// // };

// // const coordinates: LatLng[] = [
// //   { lat: 40.712776, lng: -74.005974 },
// //   { lat: 34.052235, lng: -118.243683 },
// //   { lat: 51.507351, lng: -0.127758 },
// //   { lat: 48.856613, lng: 2.352222 },
// //   { lat: 35.689487, lng: 139.691711 },
// //   { lat: -33.86882, lng: 151.20929 },
// //   { lat: 55.755825, lng: 37.617298 },
// //   { lat: 19.432608, lng: -99.133209 },
// //   { lat: 28.613939, lng: 77.209023 },
// //   { lat: -23.55052, lng: -46.633308 },
// // ];

// interface Props {
//   position: {
//     lat: number;
//     lng: number;
//   };
// }

// const PositionViewMap: FC<Props> = ({ position }) => {
//   return (
//     <div className={`relative w-full h-full`}>
//       <Map>
//         <Marker position={position} icon={customIcon}>
//           <Popup>
//             <div className={`w-60 rounded overflow-hidden`}>
//               {/* <div
//                 className={`w-fit`}
//               >{`You clicked at ${coordinates.lat}, ${coordinates.lng}`}</div> */}
//               <figure className={`mt-2`}>
//                 <img
//                   className={`object-cover object-center`}
//                   src={Images.download_bg}
//                 />
//               </figure>
//             </div>
//           </Popup>
//         </Marker>
//       </Map>
//     </div>
//   );
// };

// export default PositionViewMap;
// import { useEffect, useState } from "react";
// import { Icon } from "leaflet";
// import { Marker, Popup } from "react-leaflet";
// import Map from "./Map";
// import { Images, Svg } from "../../assets";
// import { OpenStreetMapProvider } from "leaflet-geosearch";

// const customIcon = new Icon({
//   iconUrl: Svg.marker,
//   iconSize: [50, 50],
// });

// interface Props {
//   destination: string;
// }

// const PositionViewMap = ({ destination }: Props) => {
//   const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       const provider = new OpenStreetMapProvider();
//       try {
//         const results = await provider.search({ query: destination });
//         if (results.length > 0) {
//           const { x: lng, y: lat } = results[0];
//           setPosition({ lat, lng });
//         } else {
//           setPosition({ lat: 28.6139, lng: 77.209 }); // fallback: Delhi
//         }
//       } catch (error) {
//         console.error("Geocoding error:", error);
//         setPosition({ lat: 28.6139, lng: 77.209 }); // fallback on error
//       }
//     };

//     fetchCoordinates();
//   }, [destination]);

//   if (!position) return <div className="text-center py-10">Loading map...</div>;

//   return (
//     <div className="relative w-full h-full min-h-[400px]">
//       <Map center={position}>
//         <Marker position={position} icon={customIcon}>
//           <Popup>
//             <div className="w-60 rounded overflow-hidden">
//               <figure className="mt-2">
//                 <img
//                   className="object-cover object-center"
//                   src={Images.download_bg}
//                   alt="Popup"
//                 />
//               </figure>
//               <div className="p-2 text-sm font-medium text-center">
//                 {destination}
//               </div>
//             </div>
//           </Popup>
//         </Marker>
//       </Map>
//     </div>
//   );
// };

// export default PositionViewMap;

import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import Map from "./Map";
import { Images, Svg } from "../../assets";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const customIcon = new Icon({
  iconUrl: Svg.marker,
  iconSize: [45, 45],
});

interface Props {
  destination: string;
  
}

const PositionViewMap = ({ destination }: Props) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const defaultCenter: [number, number] = [28.6, 77.2];

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!destination) return;
      const provider = new OpenStreetMapProvider();
      try {
        const results = await provider.search({ query: destination });
        if (results.length > 0) {
          const { x: lng, y: lat } = results[0];
          setPosition({ lat, lng });
        } else {
          setPosition({ lat: 28.6139, lng: 77.209 }); // fallback: Delhi
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        setPosition({ lat: 28.6139, lng: 77.209 });
      }
    };

    fetchCoordinates();
  }, [destination]);

  if (!position) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-gray-500 text-lg">Loading map...</span>
      </div>
    );
  }

  return (
    // <div className="relative w-full h-full min-h-[450px] shadow-xl rounded-xl overflow-hidden border border-gray-200">
    //   {/* <Map center={position}> */}
    //   <Map center={position ? [position.lat, position.lng] : defaultCenter} >

    //     <Marker position={position} icon={customIcon}>
    //       <Popup>
    //         <div className="w-64">
    //           <img
    //             src={Images.download_bg}
    //             alt="Location"
    //             className="w-full h-32 object-cover rounded-t-md"
    //           />
    //           <div className="px-3 py-2 bg-white rounded-b-md shadow-sm text-center">
    //             <h3 className="text-base font-semibold text-gray-800">{destination}</h3>
    //             <p className="text-sm text-gray-500">
    //               {`Coordinates: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`}
    //             </p>
    //           </div>
    //         </div>
    //       </Popup>
    //     </Marker>
    //   </Map>
    // </div>
    <div className="relative w-full md:h-[650px] h-[550px] mt-5 md:mt-0 shadow-xl rounded-md overflow-hidden">
  <Map center={position ? [position.lat, position.lng] : defaultCenter} zoom={8} >
    {position && (
      <Marker position={[position.lat, position.lng]} icon={customIcon}>
        <Popup>
          <div className="w-64">
            <img
              src={Images.download_bg}
              alt="Location"
              className="w-full h-32 object-cover rounded-t-md"
            />
            <div className="px-3 py-2 bg-white rounded-b-md shadow-sm text-center">
              <h3 className="text-base font-semibold text-gray-800">{destination}</h3>
              <p className="text-sm text-gray-500">
                {`Coordinates: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`}
              </p>
            </div>
          </div>
        </Popup>
      </Marker>
    )}
  </Map>
</div>

  );
};

export default PositionViewMap;
