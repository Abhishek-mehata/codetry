/* eslint-disable @typescript-eslint/no-explicit-any */
import { Svg } from "../../../assets";
import { FaList } from "react-icons/fa";
import { AutoComplete, DatePicker, Select, message } from "antd";
import { useState, useMemo } from "react";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import debounce from "lodash.debounce";
import "../../../../src/index.css";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const items = [
  { label: "Select Service", value: "" },
  { label: "Stays", value: "place" },
  { label: "Online", value: "onlineevent" },
  { label: "Onsite", value: "onsiteevent" },
];

const Filter = () => {
  const navigate = useNavigate();
  // Restore filter state from sessionStorage
  const getInitialFilter = () => {
    const saved = sessionStorage.getItem("filterState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          selectCategory: parsed.selectCategory ?? items[0].value,
          selectDestination: parsed.selectDestination ?? "",
          dates: parsed.dates ?? { start: "", end: "" },
        };
      } catch {
        // fallback to defaults
      }
    }
    return {
      selectCategory: items[0].value,
      selectDestination: "",
      dates: { start: "", end: "" },
    };
  };

  const initial = getInitialFilter();
  const [selectCategory, setSelectCategory] = useState<string>(initial.selectCategory);
  const [selectDestination, setSelectDestination] = useState<string>(initial.selectDestination);
  const [dates, setDates] = useState<{ start: string; end: string }>(initial.dates);
  // Save filter state to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem(
      "filterState",
      JSON.stringify({ selectCategory, selectDestination, dates })
    );
  }, [selectCategory, selectDestination, dates]);
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
  const fetchLocationSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setDestinationOptions([]);
      return;
    }
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
  }, []);

  // 🔧 Debounced fetch with cleanup
  const debouncedFetch = useMemo(() => debounce(fetchLocationSuggestions, 100), [fetchLocationSuggestions]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

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
            value={dates.start && dates.end ? [dayjs(dates.start), dayjs(dates.end)] : undefined}
            onChange={(_: any, dateStrings: string[]) => {
              const [start, end] = dateStrings;
              setDates({ start, end });
            }}
            className={`w-full border-0  focus-within:shadow-none popins font-medium`}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
          />
      </div>

      <div
        className={`flex gap-1 justify-start items-center border border-primary cursor-pointer px-4 bg-white`}
      >
        <FaList className="text-primary" />
        <Select
          variant="borderless"
          value={selectCategory}
          style={{ height: "100%", width: "100%" }}
          onChange={(value: string) => setSelectCategory(value)}
          options={items}
          className={`p-1.5 popins font-medium`}
        />
      </div>

      <div
        className={`flex gap-1 justify-start items-center cursor-pointer border border-primary px-4 bg-white filterDropdown`}
      >
        <img src={Svg.marker} alt="marker icon" />
        <AutoComplete
          variant="borderless"
          style={{ width: `100%` }}
          className={`p-5 popins font-medium`}
          options={destinationOptions}
          placeholder="Destination"
          value={selectDestination}
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
        className={`bg-primary xl:rounded-tr-md lg:rounded-l-none rounded-t-none rounded-b-md sm:rounded-bl-none w-full p-2 md:p-0 md:min-w-[150px]`}
      >
        <span className={`text-base text-white `}>Explore</span>
      </button>
    </div>
  );
};

export default Filter;
