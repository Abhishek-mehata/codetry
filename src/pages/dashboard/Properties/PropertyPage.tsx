import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button } from "../../../components";
import { useNavigate } from "react-router";

interface propertyData {
  key: string;
  title: string;
  location: string;
  hotelDescription: string;
  boosting: boolean;
  images: string[];
}

const columns: ColumnsType<propertyData> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Hotel Description",
    dataIndex: "hotelDescription",
    key: "hotelDescription",
  },
  {
    title: "Boosting",
    dataIndex: "boosting",
    key: "boosting",
    render: (boosting: boolean) => (boosting ? "Yes" : "No"),
  },
  {
    title: "Images",
    dataIndex: "images",
    key: "images",
    render: (images: string[]) => (
      <div style={{ display: "flex", gap: "8px" }}>
        {images.map((img, index) => (
          <img key={index} src={img} alt="Event" width={50} height={50} style={{ borderRadius: "5px" }} />
        ))}
      </div>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <button>
        Delete
      </button>
    ),
  },
];

const data: propertyData[] = [
    {
      key: "1",
      title: "Luxury Event",
      location: "New York, USA",
      hotelDescription: "A luxury 5-star hotel event.",
      boosting: true,
      images: ["https://via.placeholder.com/50", "https://via.placeholder.com/50"],
    },
    {
      key: "2",
      title: "Beach Party",
      location: "Miami Beach, USA",
      hotelDescription: "A beautiful beachside event with great views.",
      boosting: false,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "3",
      title: "Business Conference",
      location: "London, UK",
      hotelDescription: "Corporate networking and keynote speakers.",
      boosting: true,
      images: ["https://via.placeholder.com/50", "https://via.placeholder.com/50"],
    },
    {
      key: "4",
      title: "Music Festival",
      location: "Los Angeles, USA",
      hotelDescription: "Live performances from top artists.",
      boosting: true,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "5",
      title: "Food Expo",
      location: "Paris, France",
      hotelDescription: "A global showcase of exquisite cuisines.",
      boosting: false,
      images: ["https://via.placeholder.com/50", "https://via.placeholder.com/50"],
    },
    {
      key: "6",
      title: "Tech Summit",
      location: "San Francisco, USA",
      hotelDescription: "Innovations and breakthroughs in technology.",
      boosting: true,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "7",
      title: "Art Exhibition",
      location: "Rome, Italy",
      hotelDescription: "A display of magnificent artworks.",
      boosting: false,
      images: ["https://via.placeholder.com/50", "https://via.placeholder.com/50"],
    },
    {
      key: "8",
      title: "Fashion Show",
      location: "Milan, Italy",
      hotelDescription: "A runway of the latest fashion trends.",
      boosting: true,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "9",
      title: "Sports Tournament",
      location: "Tokyo, Japan",
      hotelDescription: "Competitive sporting events with top athletes.",
      boosting: false,
      images: ["https://via.placeholder.com/50", "https://via.placeholder.com/50"],
    },
    {
      key: "10",
      title: "Charity Gala",
      location: "Dubai, UAE",
      hotelDescription: "An event for a noble cause.",
      boosting: true,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "11",
      title: "Cultural Festival",
      location: "Barcelona, Spain",
      hotelDescription: "A celebration of rich traditions and culture.",
      boosting: false,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "12",
      title: "Science Fair",
      location: "Berlin, Germany",
      hotelDescription: "Innovative scientific discoveries on display.",
      boosting: true,
      images: ["https://via.placeholder.com/50", "https://via.placeholder.com/50"],
    },
    {
      key: "13",
      title: "Car Expo",
      location: "Detroit, USA",
      hotelDescription: "Showcasing the latest automobile innovations.",
      boosting: false,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "14",
      title: "Wedding Expo",
      location: "Las Vegas, USA",
      hotelDescription: "Plan your dream wedding with top vendors.",
      boosting: true,
      images: ["https://via.placeholder.com/50", "https://via.placeholder.com/50"],
    },
    {
      key: "15",
      title: "Gaming Convention",
      location: "Seoul, South Korea",
      hotelDescription: "A paradise for gamers with new releases.",
      boosting: false,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "16",
      title: "Wine Tasting",
      location: "Napa Valley, USA",
      hotelDescription: "Experience the finest wines in the world.",
      boosting: true,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "17",
      title: "Film Festival",
      location: "Cannes, France",
      hotelDescription: "The premier event for cinema lovers.",
      boosting: false,
      images: ["https://via.placeholder.com/50", "https://via.placeholder.com/50"],
    },
    {
      key: "18",
      title: "Marathon",
      location: "Boston, USA",
      hotelDescription: "A race with thousands of runners worldwide.",
      boosting: true,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "19",
      title: "Book Fair",
      location: "Frankfurt, Germany",
      hotelDescription: "A haven for book enthusiasts and authors.",
      boosting: false,
      images: ["https://via.placeholder.com/50"],
    },
    {
      key: "20",
      title: "Comedy Night",
      location: "Chicago, USA",
      hotelDescription: "A night of laughter with top comedians.",
      boosting: true,
      images: ["https://via.placeholder.com/50"],
    }
  ];
  

const PropertyPage: React.FC = () => {
    const navigate = useNavigate();
    return <>
      <div className={`flex items-center justify-between w-full mb-5`}>
        <h1 className={`text-2xl text-dark-blue font-semibold`}>
            All Properties
        </h1>
        <Button
          title="Add Stays"
          variant="filled"
          onClick={() => navigate(`/app/properties/new`)}
        />
      </div>
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }}/>
    </>
};

export default PropertyPage;
