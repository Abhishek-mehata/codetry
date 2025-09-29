/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import { DatePicker, Divider } from "antd";
import dayjs from "dayjs";
// import { useAppSelector } from "../../hooks/useTypedSelectors";
// import { RootAppState } from "../../redux/store";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Button, PositionViewMap, Loader, EventCard, PlaceCard } from "../../components";
import { Modal } from "antd";
import { Checkbox } from "antd";
import api from "../../api";
import { debounce } from "lodash";
// import { getCurrencySymbol } from "../../utils/currencySymbols";
import Container from "../../components/client/shared/Container";
// import EventCard from "./cards/EventCard";
import useExtractCityCountry from "../../hooks/useExtractCityCountry";

const { RangePicker } = DatePicker;
type Category = "place" | "stays" | "event" |
  "onlineevent" | "onsiteevent";

interface FilterState {
  property: string;
  type: Category;
  destination: string;
  start_date: string;
  end_date: string;
  min_price: string;
  max_price: string;
  room: string;
}

const filterInitState: FilterState = {
  property: "",
  destination: "",
  type: "place",
  start_date: "",
  end_date: "",
  min_price: "10",
  max_price: "1000",
  room: "",
};
interface SearchResult {
  latitude?: number;
  longitude?: number;
  id?: string;
  cover_image?: { url: string };
  title?: string;
  place_type?: string;
  description?: string;
  street?: string;
  rating?: number;
  price?: number;
  files?: { url: string }[];
  name?: string;
  eventType?: string;
  highlight?: string;
  location?: string;
  OnlineEvent?: { dateRanges?: { latitude?: number; longitude?: number }[] };
}


// Utility function to parse destination and extract city/country
const parseDestination = (destination: string): string => {
  if (!destination) return "";
  
  // Decode URL-encoded string and split by comma
  const decodedDestination = decodeURIComponent(destination);
  const parts = decodedDestination.split(',').map(part => part.trim());
  
  // If only one part, return as is
  if (parts.length === 1) return parts[0];
  
  // If multiple parts, return the first part (usually city)
  return parts[0];
};

const Searchpage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const start_date = searchParams.get("start");
  const end_date = searchParams.get("end");
  const type = searchParams.get("type");
  const destination = searchParams.get("destination");
  const [filterState, setFilterState] = useState<FilterState>(filterInitState);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxOptions] = useState([
    "Essentials",
    "Cable",
    "WiFi",
    "Parking",
    "Pool",
    "Gym",
    "TV",
    "Air Conditioning",
    "Heating",
    "Kitchen",
    "Washer",
    "Dryer",
    "Balcony",
    "Elevator",
    "Security",
    "Garden",
    "Fireplace",
    "BBQ",
  ]);

  // Parse destination and extract city/country using geocoding
  const parsedDestination = parseDestination(destination || "");
  const { city, country } = useExtractCityCountry(parsedDestination);
  
  // Determine the search destination: city if available, otherwise country, fallback to original
  const searchDestination = city || country || parsedDestination || destination || "";
  
  // Debug logging
  console.log("Original destination:", destination);
  console.log("Parsed destination:", parsedDestination);
  console.log("Extracted city:", city);
  console.log("Extracted country:", country);
  console.log("Final search destination:", searchDestination);


  // Sync state with URL query parameters
  useEffect(() => {
    if (start_date && end_date && type && destination) {
      setFilterState({
        ...filterState,
        start_date,
        end_date,
        type: type as Category,
        destination,
      });
      // Set loading to true when page loads with search parameters
      setIsLoading(true);
    } else {
      // If no search parameters, stop loading after a short delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [destination, end_date, start_date, type])
  // }, [start_date, end_date, type, destination]);


  console.log(searchResults,"Search Result")
  console.log()
  // Debounced API call
  const fetchSearchResults = useMemo(
    () =>
      debounce(async (params: FilterState) => {
        try {
          setIsLoading(true);
          const apiType = params.type === "place" ? "place" : params.type;
          const res = await api.get(`/search`, {
            params: {
              type: apiType,
              destination: searchDestination, // Use parsed and geocoded destination
              startDate: params.start_date,
              endDate: params.end_date,
              ...(params.type === "stays" && { place: searchDestination }), // Use parsed and geocoded destination
            },
          });
          setSearchResults(res.data);
          console.log("Search response:", res.data);
        } catch (error) {
          console.error("Search failed:", error);
          alert("Failed to fetch search results.");
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [searchDestination] // Add searchDestination as dependency
  );

  // Trigger API call and update URL on filter change
  useEffect(() => {
    const { start_date, end_date, type, destination } = filterState;
    if (start_date && end_date && type && destination && searchDestination) {
      const queryParams = new URLSearchParams({
        start: start_date,
        end: end_date,
        type,
        destination,
      }).toString();
      navigate(`?${queryParams}`, { replace: true });
      fetchSearchResults(filterState);
    }
  }, [filterState, navigate, fetchSearchResults, searchDestination]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };


  // Filter searchResults based on type param
  let filteredResults = searchResults;
  if (type === "onlineevent") {
    filteredResults = searchResults.filter((result) => result.eventType === "ONLINE");
    console.log("Filtered Online Events:", filteredResults);
  } else if (type === "onsiteevent") {
    filteredResults = searchResults.filter((result) => result.eventType === "ONSITE");
    console.log("Filtered Online Events:", filteredResults);
  } else {
    filteredResults = searchResults;
    console.log("Filtered Online Events:", filteredResults);
  }

  // const {city,country} = useExtractCityCountry(filteredResults[0].location || "");
  // console.log(city,country);

  if (isLoading) {
    return <Loader loading={isLoading} fullWidthLoader={true} />
  }


  return (
    <Container className="px-6 md:px-0">
      <div className={`flex flex-1 flex-col w-full min-h-screen`}>
        <div className="md:py-6 border-b-2 border-fade-white relative">
          <h2 className="text-2xl font-medium mb-6">
            Results for <span className="font-bold">{filterState.type == "place" && "Place"} {filterState.type == "onlineevent" && "Online Event"} {filterState.type == "onsiteevent" && "Onsite Event"}</span> {searchDestination}
          </h2>
          {/* Filter Button S */}
          <div className="flex gap-3">
            <div>
              <button
                onClick={() => setOpenFilter(!openFilter)}
                className="border rounded-md py-3 px-4 text-white bg-primary flex gap-1 items-center"
              >
                Location<IoMdArrowDropdown />
              </button>
              {/* Places filter dropdown s */}
              {openFilter && (
                <form className="absolute top-[139px] bg-white p-4 border border-primary w-full max-w-[400px] rounded-lg z-[9999]">
                  <label className="font-bold">Where are you going?</label>
                  <input
                    type="text"
                    placeholder="Enter a Location"
                    value={filterState.destination}
                    onChange={(e) =>
                      handleFilterChange("destination", e.target.value)
                    }
                    className="border border-primary rounded-sm p-3 mt-3"
                  />
                  <div className="grid grid-cols-3 w-full gap-3 mt-3">
                    <div className="col-span-2">
                      <label className="font-bold">Check In and Checkout</label>
                      <div className="border border-primary p-2">
                        <RangePicker
                          suffixIcon={null}
                          value={
                            !filterState.start_date.length
                              ? null
                              : [
                                dayjs(filterState.start_date, "YYYY-MM-DD"),
                                dayjs(filterState.end_date, "YYYY-MM-DD"),
                              ]
                          }
                          onChange={(_: any, dateStrings: string[]) => {
                            handleFilterChange("start_date", dateStrings[0]);
                            handleFilterChange("end_date", dateStrings[1]);
                          }}
                          className={`w-full border-0`}
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label className="block font-bold">Guest</label>
                      <input
                        type="number"
                        placeholder="1"
                        className="min-w-[50px] w-full border border-primary p-3 rounded-md"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex items-center w-full justify-center gap-2 p-3 rounded-md bg-primary text-white mt-4"
                    onClick={() => fetchSearchResults(filterState)}
                  >
                    <CiSearch />
                    Find a place
                  </button>
                </form>
              )}
              {/* Places filter dropdown s */}
            </div>

            <button
              className="border rounded-md py-3 px-4 text-white bg-primary flex gap-1 items-center"
              onClick={() => setIsModalOpen(true)}
            >
              Amenities
            </button>
            {/* Modal Component */}
            <Modal
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null} // Remove footer buttons (optional)
              centered
              width="100%"
              className="max-w-[700px]"
            >
              <h2 className="text-center text-2xl">Amenities</h2>
              <Divider />
              <div>
                <h2 className="font-bold text-2xl mb-6">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {checkboxOptions.map((option, index) => (
                    <Checkbox
                      key={index}
                      onChange={(e) => console.log(option, e.target.checked)}
                      className="text-lg text-gray-700"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </div>
              </div>
              <Divider />
              <Button className="block ms-auto" title="submit"></Button>
            </Modal>
          </div>
          {/* Filter Button E */}

          {/* <div className=" flex flex-col-reverse bg-gray  md:grid lg:grid-cols-2 "> */}
          <div className=" flex flex-col md:grid lg:grid-cols-2 gap-4">
            {/* Location Card S */}
            <div >
              {filteredResults.length > 0 ? (
                // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 p-2 gap-4 bg-green-600  mt-7">
                // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 p-2 gap-4 mt-7">
                //   {filteredResults.map((result: any, index: number) => {                    
                //     const imageUrl =
                //       filterState.type === "place"
                //         ? result.cover_image?.url || "https://via.placeholder.com/400"
                //         : result.files?.[0]?.url || "https://via.placeholder.com/400";

                //     return (
                //       // <div key={index} className="rounded-sm w-full bg-red-200 p-1  md:max-w-[400px] shadow-lg">
                //       <div key={index} className="w-full bg-white shadow-lg rounded-lg overflow-hidden smooth">
                //         <figure className="h-[250px] object-cover overflow-hidden">
                //           <img
                //             src={imageUrl}
                //             alt={result.title || result.name || "Listing"}
                //             className="w-full h-full object-cover"
                //           />
                //         </figure>

                //         <div className="mt-1 p-3">
                //           {/* <span className="text-primary font-medium">
                //             {filterState.type === "place"
                //               ? result.place_type || "Stays"
                //               : result.eventType || "Unknown Event Type"}
                //           </span> */}
                //           <Link
                //             to={
                //               type !== "place"
                //                 ? `/events/${result.id}`
                //                 : `/stays/${result.id}`
                //             }
                //             className="mt-1 mb-1 font-medium text-primary transition-colors cursor-pointer"
                //           >
                //             {result.title || result.name || "Unknown Title"}
                //           </Link>
                //           <p className="text-dark-blue font-medium text-sm mt-1">
                //             {result.city || result.street || result.location.slice(0, 30) + "..."}  {result.country || ""}
                //           </p>
                //           {filterState.type === "place" &&
                //             < p className="text-gray text-sm">
                //               {result.subtitle || result.highlight || "No description available."}
                //             </p>
                //           }
                //           {filterState.type !== "place" &&
                //             < p className="text-gray font-medium text-sm capitalize">
                //              Language: {result.language}
                //             </p>
                //           }

                //           {/*  */}
                //           <p className="text-md text-gray-800 mt-3 flex justify-between items-center">
                //             <span className="text-purple-700 font-semibold">
                //               ★
                //               <span className="text-dark-blue font-semibold"> {0}</span>
                //               <span className="text-gray font-normal"> ({result?.reviews || 0})</span>
                //             </span>
                //             <span className="text-dark-blue font-semibold text-lg">
                //               {(result?.lowestRoomPrice || result?.price) ? (
                //                 <>
                //                   {getCurrencySymbol(result?.currency || "USD")} {type !== "place"
                //                     ? result?.price : result?.lowestRoomPrice}
                //                   <span className="text-gray text-sm font-normal">
                //                     {
                //                       type !== "place"
                //                         ? (result.eventType === "ONLINE" ? "/device" : "/person")
                //                         : "/night"
                //                     }
                //                   </span>
                //                 </>
                //               ) : (
                //                 <div>
                //                   <p className="text-dark-blue font-semibold text-lg">
                //                     {getCurrencySymbol(result?.currency || "USD")} {result?.rooms && result?.rooms[0]?.price || 0}
                //                     <span className="text-gray text-sm font-normal">
                //                       {
                //                         type !== "place"
                //                           ? (result.eventType === "ONLINE" ? "/device" : "/person")
                //                           : "/night"
                //                       }
                //                     </span>
                //                   </p>
                //                 </div>
                //               )}
                //             </span>
                //           </p>
                //           {/*  */}
                //         </div>
                //       </div>
                //     );
                //   })}
                // </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 p-2 gap-4 mt-7">
                  {filteredResults.map((result: any) => {
                    console.log(result, "Search Result");
                     return filterState.type !== "place" ? <EventCard key={result.id} data={result} /> : <PlaceCard key={result.id} data={result} />
                  })}
                </div>
              ) : (
                <div className="text-center p-2 rounded-sm bg-[#d1ecf1] mt-5">
                  No results available at the moment
                </div>
              )}
            </div>
            {/* Location Card E */}
            {/* Map S */}
            {/* <div className={`w-full md:block`}> */}
            <PositionViewMap
              // position={{
              //   lat: searchResults[0]?.latitude || searchResults[0]?.OnlineEvent?.dateRanges?.[0]?.latitude || 27.717245,
              //   lng: searchResults[0]?.longitude || searchResults[0]?.OnlineEvent?.dateRanges?.[0]?.longitude || 85.323959,
              // }}
              destination={searchDestination || ""}
            />
            {/* <SearchMap
    showContinent={false} // if you want to hide continent buttons
    mapDetails={(data) => {
      console.log("Selected Location:", data);
      
      // Optionally update state here if needed
    }} */}
            {/* /> */}
            {/* </div> */}
            {/* Map E */}
          </div>
        </div>
      </div>
    </Container >
  );
};

export default Searchpage;






























