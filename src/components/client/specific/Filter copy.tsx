// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Svg } from "../../../assets";
// import { FaList } from "react-icons/fa";
// import { AutoComplete, DatePicker, Select, message } from "antd";
// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { useAppSelector } from "../../../hooks/useTypedSelectors";
// import { RootAppState } from "../../../redux/store";
// // import EventCard from "../../Stays&EventsCard/EventCard";
// // AIzaSyBTkq7ORdJGn1Q3ywxz7GfLiadI5AMy8fcAIzaSyBTkq7ORdJGn1Q3ywxz7GfLiadI5AMy8fc
// const { RangePicker } = DatePicker;

// const items = [
//   { label: "Select Service", value: "" },
//   { label: "Stays", value: "place" },
//   { label: "Online", value: "onlineevent" },
//   { label: "Onsite", value: "onsiteevent" },
// ];

// const Filter = () => {
//   const navigate = useNavigate();
//   const { places } = useAppSelector((state: RootAppState) => state.places);
//   const [selectCategory, setSelectCategory] = useState<string>(items[0].value);
//   const [selectDestination, setSelectDestination] = useState<string>("");
//   const { events } = useAppSelector((state: RootAppState) => state.events);
//   const [dates, setDates] = useState<{
//     start: string;
//     end: string;
//   }>({
//     start: "",
//     end: "",
//   });

//   const onExplore = () => {
//     const { start, end } = dates;

//     if (!start || !end)
//       return message.error(`Please select a start and an end date.`);

//     if (!selectDestination)
//       return message.error(`Please select your destination`);

//     navigate(
//       `/search?start=${start}&end=${end}&type=${selectCategory}&destination=${selectDestination}`
//     );
//   };

//   const isCategoryPlaces = selectCategory === "places";
//   const locations = (isCategoryPlaces ? places : events)
//     .map((item: any) => {
//       if (isCategoryPlaces) {
//         return {
//           value: item.street,
//         };
//       } else
//         return {
//           value: item.location,
//         };
//     })
//     .filter(
//       (item, index, self) =>
//         index === self.findIndex((t) => t.value === item.value)
//     );

//   return (
//     <div
//       className={`absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] w-full max-w-[1100px] grid grid-cols-4  mt-8 bg-[#f4f4f4] rounded-sm overflow-hidden p-10 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]`}
//     >
//       <div
//         className={`flex gap-1 justify-start items-center cursor-pointer p-2 px-3 border border-primary rounded-tl-md rounded-bl-md bg-white`}
//       >
//         <img src={Svg.calender} alt="calender icon" />
//         <RangePicker
//           suffixIcon={null}
//           bordered={false}
//           onChange={(_: any, dateStrings: string[]) => {
//             const start = dateStrings[0];
//             const end = dateStrings[1];

//             setDates({
//               start,
//               end,
//             });
//           }}
//           className={`w-full`}
//         />
//       </div>
//       <div
//         className={`flex gap-1 justify-start items-center border border-primary cursor-pointer px-4 bg-white`}
//       >
//         <FaList className="text-primary"/>
//         <Select
//           variant="borderless"
//           defaultValue={selectCategory}
//           style={{ height: "100%", width: "100%" }}
//           onChange={(value: string) => setSelectCategory(value)}
//           options={items}
//         />
//       </div>
      
//       <div
//         className={`flex gap-1 justify-start items-center cursor-pointer border border-primary px-4 bg-white`}
//       >
//         <img src={Svg.marker} alt="marker icon" />
//         <AutoComplete
//           variant="borderless"
//           style={{ width: `100%` }}
//           options={locations}
//           placeholder="Destination"
//           onChange={(value: string) => setSelectDestination(value)}
//           filterOption={(inputValue, option) =>
//             option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//           }
//         />
//       </div>
//       <button
//         type="button"
//         onClick={onExplore}
//         className={`bg-primary xl:rounded-tr-md lg:rounded-l-none rounded-t-none rounded-b-md sm:rounded-bl-none min-w-[150px] `}
//       >
//         <span className={`text-base text-white `}>Explore</span>
//         {/* <EventCard/> */}
//         {/* <span className={`text-base text-white text-3xl `}>Explore</span> */}

//       </button>
//     </div>
//   );
// };

// export default Filter;
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Svg } from "../../../assets";
// import { FaList } from "react-icons/fa";
// import { AutoComplete, DatePicker, Select, message } from "antd";
// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router";
// // import { useAppSelector } from "../../../hooks/useTypedSelectors";
// // import { RootAppState } from "../../../redux/store";
// import axios from "axios";
// // import debounce from "lodash.debounce";

// const { RangePicker } = DatePicker;

// const items = [
//   { label: "Select Service", value: "" },
//   { label: "Stays", value: "place" },
//   { label: "Online", value: "onlineevent" },
//   { label: "Onsite", value: "onsiteevent" },
// ];

// const Filter = () => {
//   const navigate = useNavigate();
//   // const { places } = useAppSelector((state: RootAppState) => state.places);
//   const [selectCategory, setSelectCategory] = useState<string>(items[0].value);
//   const [selectDestination, setSelectDestination] = useState<string>("");
//   // const { events } = useAppSelector((state: RootAppState) => state.events);
//   const [dates, setDates] = useState<{ start: string; end: string }>({
//     start: "",
//     end: "",
//   });

//   const onExplore = () => {
//     const { start, end } = dates;

//     if (!start || !end)
//       return message.error(`Please select a start and an end date.`);

//     if (!selectDestination)
//       return message.error(`Please select your destination`);

//     navigate(
//       `/search?start=${start}&end=${end}&type=${selectCategory}&destination=${selectDestination}`
//     );
//   };

//   // const isCategoryPlaces = selectCategory === "places";
//   // Removed unused 'locations' variable

//   // State for location suggestions
//   const [destinationOptions, setDestinationOptions] = useState<{ value: string }[]>([]);

//   // Fetch location suggestions using OpenCage Geocoder API
//   // const fetchLocationSuggestions = async (query: string) => {
//   //   if (!query) return;

//   //   try {
//   //     const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
//   //       params: {
//   //         q: query,
//   //         key: import.meta.env.VITE_OPENCAGE_API_KEY,
//   //         limit: 5, // Limit number of suggestions
//   //         countrycode: "in", // Optionally restrict by country (e.g., India)
//   //         language: "en",
//   //       },
//   //     });

//   //     const suggestions = response.data.results.map((result: any) => ({
//   //       value: result.formatted, // Full address or location string
//   //     }));

//   //     setDestinationOptions(suggestions);
//   //   } catch (err) {
//   //     console.error("Error fetching location suggestions", err);
//   //   }
//   // };
//   const fetchLocationSuggestions = async (query: string) => {
//     if (!query.trim()) return;
  
//     try {
//       const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
//         params: {
//           q: query,
//           key: import.meta.env.VITE_OPENCAGE_API_KEY,
//           limit: 5, // Limit number of suggestions
//           // countrycode: "in", // Restrict to India
//           language: "en",
//           pretty: 1,
//           no_annotations: 1,
//         },
//       });
  
//       const suggestions = response.data.results
//         .map((result: any) => ({
//           value: result.formatted, // Full location string
//         }))
//         .filter((item: any, index: number, self: any[]) =>
//           index === self.findIndex((t) => t.value === item.value)
//         ); // Filter out duplicates
  
//       setDestinationOptions(suggestions);
//     } catch (err) {
//       console.error("Error fetching location suggestions:", err);
//     }
//   };
  
//   // Use debounce to avoid excessive API calls on each keystroke
//   // const debouncedFetch = useMemo(() => debounce(fetchLocationSuggestions, 500), []);

//   return (
//     <div
//       className={`absolute -bottom-8 md:bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] w-full max-w-[1100px] grid grid-cols-4 mt-8 bg-[#f4f4f4] rounded-sm overflow-hidden p-10 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]`}
//     >
//       <div
//         className={`flex gap-1 justify-start items-center cursor-pointer p-2 px-3 border border-primary rounded-tl-md rounded-bl-md bg-white`}
//       >
//         <img src={Svg.calender} alt="calender icon" />
//         <RangePicker
//           suffixIcon={null}
//           bordered={false}
//           onChange={(_: any, dateStrings: string[]) => {
//             const start = dateStrings[0];
//             const end = dateStrings[1];

//             setDates({
//               start,
//               end,
//             });
//           }}
//           className={`w-full`}
//         />
//       </div>

//       <div
//         className={`flex gap-1 justify-start items-center border border-primary cursor-pointer px-4 bg-white`}
//       >
//         <FaList className="text-primary" />
//         <Select
//           variant="borderless"
//           defaultValue={selectCategory}
//           style={{ height: "100%", width: "100%" }}
//           onChange={(value: string) => setSelectCategory(value)}
//           options={items}
//         />
//       </div>

//       <div
//         className={`flex gap-1 justify-start items-center cursor-pointer border border-primary px-4 bg-white`}
//       >
//         <img src={Svg.marker} alt="marker icon" />
//         <AutoComplete
//           variant="borderless"
//           style={{ width: `100%` }}
//           options={destinationOptions} // Use the state for destination options
//           placeholder="Destination"
//           // onSearch={debouncedFetch} // Trigger location suggestions on search
//           onChange={(value: string) => setSelectDestination(value)}
//           filterOption={(inputValue, option) =>
//             option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//           }
//         />
//       </div>

//       <button
//         type="button"
//         onClick={onExplore}
//         className={`bg-primary xl:rounded-tr-md lg:rounded-l-none rounded-t-none rounded-b-md sm:rounded-bl-none min-w-[150px] `}
//       >
//         <span className={`text-base text-white `}>Explore</span>
//       </button>
//     </div>
//   );
// };

// export default Filter;
import { Svg } from "../../../assets";
import { FaList } from "react-icons/fa";
import { AutoComplete, DatePicker, Select, message } from "antd";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import debounce from "lodash.debounce";

const { RangePicker } = DatePicker;

const items = [
  { label: "Select Service", value: "" },
  { label: "Stays", value: "place" },
  { label: "Online", value: "onlineevent" },
  { label: "Onsite", value: "onsiteevent" },
];

const Filter = () => {
  const navigate = useNavigate();
  const [selectCategory, setSelectCategory] = useState<string>(items[0].value);
  const [selectDestination, setSelectDestination] = useState<string>("");
  const [dates, setDates] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [destinationOptions, setDestinationOptions] = useState<{ value: string }[]>([]);

  const onExplore = () => {
    const { start, end } = dates;
    if (!start || !end) return message.error(`Please select a start and an end date.`);
    if (!selectDestination) return message.error(`Please select your destination`);
    navigate(
      `/search?start=${start}&end=${end}&type=${selectCategory}&destination=${selectDestination}`
    );
  };

  // 🔧 fetch suggestions
  const fetchLocationSuggestions = async (query: string) => {
    if (!query.trim()) return;
    try {
      const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: query,
          key: import.meta.env.VITE_OPENCAGE_API_KEY,
          limit: 5,
          language: "en",
          pretty: 1,
          no_annotations: 1,
        },
      });

      const suggestions = response.data.results
        .map((result: any) => ({ value: result.formatted }))
        .filter((item: any, index: number, self: any[]) =>
          index === self.findIndex((t) => t.value === item.value)
        );
      setDestinationOptions(suggestions);
    } catch (err) {
      console.error("Error fetching location suggestions:", err);
    }
  };

  // 🔧 Debounced fetch
  const debouncedFetch = useMemo(() => debounce(fetchLocationSuggestions, 500), []);

  return (
    <div
      className={`absolute -bottom-8 md:bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] w-full max-w-[1100px] md:grid md:grid-cols-4 mt-8 bg-[#f4f4f4] rounded-sm overflow-hidden p-10 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]`}
    >
      <div
        className={`flex  gap-1 justify-start items-center cursor-pointer p-2 px-3 border border-primary rounded-tl-md rounded-bl-md bg-white`}
      >
        <img src={Svg.calender} alt="calender icon" />
          <RangePicker
            suffixIcon={null}
            onChange={(_: any, dateStrings: string[]) => {
              const [start, end] = dateStrings;
              setDates({ start, end });
          }}
          className={`w-full border-0  focus-within:shadow-none`}
        />
      </div>

      <div
        className={`flex gap-1 justify-start items-center border border-primary cursor-pointer px-4 bg-white`}
      >
        <FaList className="text-primary" />
        <Select
          variant="borderless"
          defaultValue={selectCategory}
          style={{ height: "100%", width: "100%" }}
          onChange={(value: string) => setSelectCategory(value)}
          options={items}
          className={`p-1.5`}
        />
      </div>

      <div
        className={`flex gap-1 justify-start items-center cursor-pointer border border-primary px-4 bg-white`}
      >
        <img src={Svg.marker} alt="marker icon" />
        <AutoComplete
          variant="borderless"
          style={{ width: `100%` }}
          className={`p-5`}
          options={destinationOptions}
          placeholder="Destination"
          onSearch={debouncedFetch}
          onChange={(value: string) => setSelectDestination(value)}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>

      <button
        type="button"
        onClick={onExplore}
        className={`bg-primary xl:rounded-tr-md lg:rounded-l-none rounded-t-none rounded-b-md sm:rounded-bl-none w-full p-2 md:p-0 md:min-w-[150px] `}
      >
        <span className={`text-base text-white `}>Explore</span>
      </button>
    </div>
  );
};

export default Filter;
