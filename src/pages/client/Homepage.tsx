
import {
  // Activities,
  ClientContainer,
  Download,
  EventCard,
  Hero,
  PlaceCard,
  Section,
} from "../../components";
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedSelectors";
import { RootAppState } from "../../redux/store";
// import EventsCard from "./cards/EventCard";
// import TopDestinationsCard from "./cards/TopDestinationsCard";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Filter from "../../components/client/specific/Filter";
// import i1 from "../../assets/images/starting_city_1.jpg";
// import i2 from "../../assets/images/starting_city_2.jpg";
// import i3 from "../../assets/images/starting_city_3.jpg";
// import i4 from "../../assets/images/starting_city_4.jpg";
// import i5 from "../../assets/images/starting_city_5.jpg";
// import i6 from "../../assets/images/starting_city_6.jpg";
import { getUpcomingEvents } from "../../redux/actions/events";
import { getLatestPlaces } from "../../redux/actions/places";
// import { Link } from "react-router-dom";
import StaysCard from "../../components/client/shared/Cards/StaysCard";
import LoadingAnimation from "./LoadingAnimation";
import { getLatestEvents } from "../../redux/actions/events";

// import { Link } from "lucide-react";
// http://localhost:8000/v1/explore/boosted,
// http://localhost:8000/v1/explore/latestplaces,
// http://localhost:8000/v1/explore/eventsupcoming
const Homepage = () => {
  // const { places } = useAppSelector((state: RootAppState) => state.places);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { latestPlaces, loadingLatestPlaces } = useAppSelector((state) => state.places);
  const { upcomingEvents, loadingUpcomingEvents, latestEvents, loadingLatestEvents } = useAppSelector(
    (state: RootAppState) => state.events
  );
  useEffect(() => {
    dispatch(getUpcomingEvents());
    dispatch(getLatestPlaces());
    dispatch(getLatestEvents());
  }, [dispatch]);

  useEffect(() => {
    const scrollTo = searchParams.get('scroll');
    if (scrollTo === 'promoted') {
      const element = document.getElementById('promoted-section');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          // Clean up the URL parameter after scrolling
          setSearchParams({}, { replace: true });
        }, 100);
      }
    }
  }, [searchParams, setSearchParams]);


  return (
    <div className="overflow-hidden">
      <Hero />
      {/* <Activities data={places} /> */}
      <Section>
        <ClientContainer className="px-6">
          {/* Promoted Section Start */}
          <StaysCard />
          {/* Promoted Section End */}

          {/* Div for top desitnations to explore Start */}
          {/* <section className=" w-full md:py-section-padding py-sm-section-padding">
            <h2 className={`text-center text-dark-blue mb-8 leading-tight md:text-4xl text-2xl font-semibold`}>Top Destination to Explore</h2>

            <div className="cards-wrappper  mx-auto grid md:grid-cols-2  lg:grid-cols-3 gap-4">
              <Link to={`/search?destination=${"NEWYORK".toLowerCase()}`}>
                <TopDestinationsCard src={i1} cityName={"NEW YORK"} />
              </Link>
              <Link to={`/search?destination=${"SYDNEY".toLowerCase()}`}>
                <TopDestinationsCard src={i2} cityName={"SYDNEY"} />
              </Link>
              <Link to={`/search?destination=${"PARIS".toLowerCase()}`}>
                <TopDestinationsCard src={i3} cityName={"PARIS"} />
              </Link>
              <Link to={`/search?destination=${"BARCELONA".toLowerCase()}`}>
                <TopDestinationsCard src={i4} cityName={"BARCELONA"} />
              </Link>
              <Link to={`/search?destination=${"BERLIN".toLowerCase()}`}>
                <TopDestinationsCard src={i5} cityName={"BERLIN"} />
              </Link>
              <Link to={`/search?destination=${"BUDAPEST".toLowerCase()}`}>
                <TopDestinationsCard src={i6} cityName={"BUDAPEST"} />
              </Link>

            </div>
          </section> */}
          {/* Div for top desitnations to explore End */}

          {/* Popular Events Card Start */}
          <section className="w-full md:py-section-padding py-sm-section-padding flex justify-center flex-wrap ">
            <h2
              className="text-center text-dark-blue mb-6 md:mb-12 leading-tight md:text-4xl text-2xl font-semibold"
            >
              Popular Events
            </h2>
            <div className="w-[100%] mx-auto flex justify-center flex-wrap flex-col md:flex-row">
              {loadingLatestEvents ? (
                <div>
                  <LoadingAnimation />
                </div>
              ) : latestEvents.length === 0 ? (
                <p className="text-center text-gray-500">No events found.</p>
              ) : (
                <div className=" grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {latestEvents.map((event) => (
                    <EventCard key={event.id} data={event} />
                  ))}
                </div>
              )}
            </div>
          </section>
          {/* Popular Events Card Start */}

          {/* Popular Places Start */}
          <section className="md:py-section-padding py-sm-section-padding w-full flex justify-center gap-2 flex-col items-center flex-wrap">
            {/* Heading */}
            <h2
              className="text-center text-dark-blue mb-6 md:mb-12 leading-tight md:text-4xl text-2xl font-semibold"
            >
              Popular Stays
            </h2>
            <div className="w-[100%] mx-auto flex justify-center flex-wrap flex-col md:flex-row">
              {/* Loading state */}
              {loadingLatestPlaces ? (
                <div>
                  <LoadingAnimation />
                </div>
              ) : latestPlaces.length === 0 ? (
                <p className="text-center text-gray-500">No places found.</p>
              ) : (
                <div className="grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {latestPlaces.map((place) => (
                    <PlaceCard key={place.id} data={place} />
                  ))}
                </div>
              )}
            </div>
          </section>
          {/* Popular Places Start */}
          {/* Cta Start */}
          <Download />
          {/* Cta End */}
          {/* Upcoming Events Start */}
          <section className="bg-red-400 hidden md:py-section-padding py-sm-section-padding">
            <h2 className="text-center text-dark-blue md:text-4xl text-2xl font-semibold leading-tight ">
              Upcoming Events
            </h2>
            <div className="mt-4 w-full flex justify-center flex-wrap">

              {loadingUpcomingEvents ? (
                <div>
                  <LoadingAnimation />
                </div>
              ) : !Array.isArray(upcomingEvents) || upcomingEvents.length === 0 ? (
                <p className="text-center text-gray-500 mt-6">No upcoming events at the moment.</p>
              ) : (
                <div className="grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-10 w-full">
                  {upcomingEvents.map((item, i) => (
                    <EventCard data={item} key={i} />
                  ))}
                </div>
              )}
            </div>
          </section>
          {/* Upcoming Events End */}
        </ClientContainer>
      </Section>
    </div>
  );
};

export default Homepage;