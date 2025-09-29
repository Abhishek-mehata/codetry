import { Link, useNavigate } from "react-router-dom";
// import { Logo } from "../../../assets";
import Container from "../shared/Container";
// import { FaCcMastercard, FaCcVisa, FaPaypal } from "react-icons/fa";
import DownloadSiteButton from "./DownloadSiteButton";



const Links = {
  experiences: [
    { name: "Stays(Asia & Africa)", href: "/about" },
    { name: "Onsite Events (Asia & Africa)", href: "#" },
    { name: "Online Events (Global)", href: "#" },
    { name: "Promoted Picks", href: "/" },
  ],
  Guests: [
    { name: "How Booking Works", href: "/how-bookings-works" },
    { name: "Destination We Cover", href: "/destination-list" },
    { name: "Safety & Payments", href: "/trust-and-safety" },
    { name: "Guest Support", href: "/vacation-guide" },
  ],
  Hosts: [
    { name: "Create Listing", href: "/auth/signup" },
    { name: "Boost My Listing", href: "/host/boost-plans" },
    { name: "Host Support", href: "/support-host" },
  ],
  Legal: [
    { name: "Terms of Service", href: "" },
    { name: "Privacy Policy", href: "" },
    { name: "Asia/Africa Stays Policy", href: "" },
    { name: "Events Framework", href: "" },
    { name: "Payment Compliance", href: "" },
  ]
};

// const paymentMethod = [
// {
//   name: "Paypal",
//   icon: <FaPaypal className="text-2xl" />,
// },
// {
//   name: "Mastercard",
//   icon: <FaCcMastercard className="text-2xl" />,
// },
// {
//   name: "Americanexpress",
//   icon: <FaCcVisa className="text-2xl" />,
// },
// ]

export default function Footer() {
  const navigate = useNavigate();
  const handlePromotedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/?scroll=promoted");
  };

  return (
    <footer
      className={`relative z-30 w-full bg-dark-blue text-[#aabad3] pb-10 md:px-6 lg:px-8 lg:pb-20 pt-16`}
      aria-labelledby="footer-heading"
    >
      <Container className={`mx-auto max-w-7xl`}>
        <div
          className={`flex items-center justify-center lg:items-start lg:justify-between flex-col lg:flex-row gap-16 lg:gap-0`}
        >
          <div
            className={`flex gap-8 justify-between flex-row px-4 md:px-0 w-full lg:w-auto flex-wrap`}
          >
            <div>
              <h3 className={`text-lg font-semibold`}>Experiences</h3>
              <ul
                className={`flex gap-2 flex-col items-start justify-between mt-4`}
              >
                {Links.experiences.map(({ name, href }, i) => (
                  <li key={i}>
                    {name === "Promoted Picks" ? (
                      <button
                        onClick={handlePromotedClick}
                        className={`text-sm font-medium text-left hover:underline`}
                      >
                        {name}
                      </button>
                    ) : (
                      <Link className={`text-sm font-medium`} to={href}>
                        {name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/*  */}
            <div>
              <h3 className={`text-lg font-semibold`}>
                Guests
              </h3>
              <ul
                className={`flex gap-2 flex-col items-start justify-between mt-4`}
              >
                {Links.Guests.map(({ name, href }, i) => (
                  <li key={i}>
                    <Link className={`text-sm font-medium`} to={href}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/*  */}
            <div>
              <h3 className={`text-lg font-semibold`}>
                Hosts
              </h3>
              <ul
                className={`flex gap-2 flex-col items-start justify-between mt-4`}
              >
                {Links.Hosts.map(({ name, href }, i) => (
                  <li key={i}>
                    <Link className={`text-sm font-medium`} to={href}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/*  */}
            <div>
              <h3 className={`text-lg font-semibold`}>
                Legal
              </h3>
              <ul
                className={`flex gap-2 flex-col items-start justify-between mt-4`}
              >
                {Links.Legal.map(({ name, href }, i) => (
                  <li key={i}>
                    <Link className={`text-sm font-medium`} to={href}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/*  */}
            <div>
              <h3 className={`text-lg font-semibold`}>
                Explore
              </h3>
              <ul
                className={`flex gap-2 flex-col items-start justify-start  mt-4`}
              >
                <li>
                  <Link className={`text-sm font-medium`} to={"/support"}>
                    Support Hub
                  </Link>
                </li>
                <DownloadSiteButton btnType={"link"} />
              </ul>
            </div>
            {/*  */}
          </div>
          <div
            className={`flex flex-col gap-4 items-center justify-center lg:items-start lg:justify-start`}
          >
            <h3 className={`text-lg font-semibold`}>
              Payment Methods
            </h3>
            <a href="#" className="text-sm font-medium">Coming Soon...</a>
            {/* <ul className={`flex gap-8 items-center justify-center`}>
              {paymentMethod.map(({ icon, name }) => (
                <li key={name}>
                  {icon}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <div
          className={`lg:items-center text-center lg:justify-between flex-col lg:flex-row gap-4 lg:gap-0 mt-12`}
        >
          <p className={`text-center`}>
            All rights reserved. DMT Tourism and DMT Logo are registered trademark of Digital Marketplace for Tourism Pvt. Ltd | Copyright (C) 2017-2025 dmttourism.com.</p>
        </div>
      </Container>
    </footer>
  );
}
