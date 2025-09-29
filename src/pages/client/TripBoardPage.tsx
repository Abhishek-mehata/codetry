import { FC, useState } from "react";
import { ClientContainer, TripCard } from "../../components";
import { Svg } from "../../assets";

const IconSquarePlus: FC<{ color?: string }> = ({ color = `#9C59DF` }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.95 13C1.43283 13 0.936838 12.7946 0.571142 12.4289C0.205446 12.0632 0 11.5672 0 11.05L0 1.95C0 1.43283 0.205446 0.936838 0.571142 0.571142C0.936838 0.205446 1.43283 0 1.95 0L11.05 0C11.5672 0 12.0632 0.205446 12.4289 0.571142C12.7946 0.936838 13 1.43283 13 1.95V11.05C13 11.5672 12.7946 12.0632 12.4289 12.4289C12.0632 12.7946 11.5672 13 11.05 13H1.95ZM1.3 1.95V11.05C1.3 11.2224 1.36848 11.3877 1.49038 11.5096C1.61228 11.6315 1.77761 11.7 1.95 11.7H11.05C11.2224 11.7 11.3877 11.6315 11.5096 11.5096C11.6315 11.3877 11.7 11.2224 11.7 11.05V1.95C11.7 1.77761 11.6315 1.61228 11.5096 1.49038C11.3877 1.36848 11.2224 1.3 11.05 1.3H1.95C1.77761 1.3 1.61228 1.36848 1.49038 1.49038C1.36848 1.61228 1.3 1.77761 1.3 1.95ZM5.85 9.1V7.15H3.9C3.72761 7.15 3.56228 7.08152 3.44038 6.95962C3.31848 6.83772 3.25 6.67239 3.25 6.5C3.25 6.32761 3.31848 6.16228 3.44038 6.04038C3.56228 5.91848 3.72761 5.85 3.9 5.85H5.85V3.9C5.85 3.72761 5.91848 3.56228 6.04038 3.44038C6.16228 3.31848 6.32761 3.25 6.5 3.25C6.67239 3.25 6.83772 3.31848 6.95962 3.44038C7.08152 3.56228 7.15 3.72761 7.15 3.9V5.85H9.1C9.27239 5.85 9.43772 5.91848 9.55962 6.04038C9.68152 6.16228 9.75 6.32761 9.75 6.5C9.75 6.67239 9.68152 6.83772 9.55962 6.95962C9.43772 7.08152 9.27239 7.15 9.1 7.15H7.15V9.1C7.15 9.27239 7.08152 9.43772 6.95962 9.55962C6.83772 9.68152 6.67239 9.75 6.5 9.75C6.32761 9.75 6.16228 9.68152 6.04038 9.55962C5.91848 9.43772 5.85 9.27239 5.85 9.1Z"
      fill={color}
    />
  </svg>
);

const SearchCard = () => (
  <div
    className={`relative flex justify-center items-center h-44 bg-primary rounded shadow`}
  >
    <img
      src={Svg.buildingIcon}
      className={`h-auto w-28 max-w-full object-center object-cover`}
      alt={`trip image`}
    />
    <div className={`absolute left-0 bottom-0 text-start p-4`}>
      <h3 className={`text-xl text-white font-semibold`}>{`Nepal`}</h3>
      <h4
        className={`text-lg text-white mt-1 font-medium`}
      >{`Jan 11 - Jan 13`}</h4>
    </div>
  </div>
);

const TripBoardPage: FC = () => {
  const [trips, setTrips] = useState<string[]>(["trips", "setTrips"]);

  return (
    <div className={`flex flex-1 flex-col w-full min-h-screen mt-8 sm:mt-16`}>
      <ClientContainer className={`flex flex-col flex-1`}>
        <div
          className={`flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center`}
        >
          <h3 className={`text-3xl md:text-4xl text-dark-purple font-semibold`}>
            Recapture The Magic
          </h3>
          <button
            type="button"
            onClick={() =>
              setTrips(trips.length > 0 ? [] : ["trips", "setTrips"])
            }
            className={`flex gap-2 items-center group rounded-md bg-white ring-1 ring-primary text-primary px-3 py-2 text-sm font-semibold shadow-sm w-fit`}
          >
            <IconSquarePlus />
            New Board
          </button>
        </div>
        <div className={`flex ${!trips.length ? `flex-1` : ``} mt-10`}>
          {!trips.length ? (
            <div
              className={`flex flex-col gap-8 justify-center items-center pb-60 w-full`}
            >
              <img
                src={Svg.addFiles}
                className={`h-auto max-w-full`}
                alt={`add files graphics`}
              />
              <div className={`text-center max-w-[40ch]`}>
                <h4 className={`text-2xl text-dark-purple font-semibold`}>
                  Create your first board
                </h4>
                <p className={`text-sm text-dark-purple font-medium mt-2`}>
                  As you search, tap the heart icon to save your favorite places
                  to stay or things to do in a trip board.
                </p>
                <button
                  type="button"
                  className={`flex gap-2 items-center group mx-auto mt-6 rounded-md bg-primary ring-1 text-white px-3 py-2 text-sm font-semibold shadow-sm w-fit`}
                >
                  <IconSquarePlus color={`#fff`} />
                  New Board
                </button>
              </div>
            </div>
          ) : (
            <div className={`w-full`}>
              <div
                className={`grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3`}
              >
                <TripCard />
                <TripCard />
                <TripCard />
              </div>
              <div
                className={`flex flex-col justify-between items-start mt-24`}
              >
                <h3 className={`text-4xl text-dark-purple font-semibold`}>
                  Recent Searches
                </h3>
                <div
                  className={`grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-5 mt-10 w-full`}
                >
                  <SearchCard />
                  <SearchCard />
                </div>
              </div>
            </div>
          )}
        </div>
      </ClientContainer>
    </div>
  );
};

export default TripBoardPage;
