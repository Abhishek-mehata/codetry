import { FC } from "react";
import { Images } from "../../../assets";
// import EventCard from "../shared/Cards/EventCard"
import DownloadSiteButton from "./DownloadSiteButton";

const Download: FC = () => {
  return (
    <section className="md:py-section-padding py-sm-section-padding">
      <div className={`w-full`}>
        <div
          className={`flex flex-col-reverse md:flex-row rounded-lg shadow lg:shadow-2xl bg-fade-purple overflow-hidden md:overflow-visible`}
        >
          <div className={`relative md:w-2/4 h-full pt-16 pb-10 md:pt-14 md:px-10 p-4`}>
            <div
              className={`flex flex-col items-start justify-start gap-5`}
            >
              <h3 className={`text-2xl text-dark-blue font-medium`}>
                1-tap bookings <br/>
                Instant notification
                <br/>
                Get app like experience
              </h3>
              <p className={`text-sm text-dark-gray`}>
                Best deals around Asia and Africa
              </p>

              {/* Download Site Button */}
              <div>
                <DownloadSiteButton />
              </div>
            </div>
          </div>
          <div className={`relative md:w-2/4`}>
            <img
              alt="sea image"
              src={Images.download_bg}
              className={`h-[26rem] w-full  overflow-hidden`}
            />
            {/* <figure className={`absolute left-20 -bottom-10`}>
              <img
                alt="iphone mockup graphics"
                src={Svg.iphone_mockup_svg}
                className={`h-full w-full`}
              />
            </figure> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
