
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";


// Editable data structure for categories, countries, and cities
const destinationData = [
    {
        category: "Stays",
        countries: [
            {
                name: "Nepal",
                cities: ["Biratnagar", "Itahari", "Dharan", "Pokhara", "Kathmandu"],
            }
        ],
    },
    {
        category: "OnlineEvent",
        countries: [
            {
                name: "Nepal",
                cities: ["Biratnagar", "Itahari", "Dharan", "Pokhara", "Kathmandu"],
            }
        ],
    },
    {
        category: "OnsiteEvent",
        countries: [
            {
                name: "Nepal",
                cities: ["Biratnagar", "Itahari", "Dharan", "Pokhara", "Kathmandu"],
            }
        ],
    },
];

function DestinationList() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br to-fade-purple py-8">
            <div className="max-w-4xl mx-auto overflow-hidden">
                {/* Header */}
                <div className="p-section-padding smm:p-sm-section-padding text-center">
                    <h1 className="text-4xl smm:text-3xl sms:text-2xl font-bold mb-4 font-popins">
                        DMT Destination List
                    </h1>
                    <p className="text-xl smm:text-lg opacity-90 font-popins">
                        Your Step-by-Step Guide to Seamless Travel Bookings
                    </p>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
                    {destinationData.map((cat) => (
                        <div key={cat.category} className="bg-white p-6">
                            <h2 className="text-2xl font-semibold mb-4 font-popins">{cat.category}</h2>
                            <div>
                                {cat.countries.map((country) => (
                                    <div key={country.name}>
                                        <button
                                            className="text-lg font-medium text-blue-600 hover:underline mb-2 flex items-center gap-1"
                                            onClick={() => {
                                                setExpandedCategory(cat.category);
                                                setExpandedCountry((prev) =>
                                                    expandedCategory !== cat.category || prev !== country.name ? country.name : null
                                                );
                                            }}
                                        >
                                            {country.name}<IoChevronDown />
                                        </button>
                                        {expandedCategory === cat.category && expandedCountry === country.name && (
                                            <ul className="mt-2 ml-4 list-disc text-left">
                                                {country.cities.map((city) => {
                                                    // Map category to type
                                                    let type = "place";
                                                    if (cat.category === "OnlineEvent") type = "onlineevent";
                                                    if (cat.category === "OnsiteEvent") type = "onsiteevent";

                                                    // Get today's date and one year from today
                                                    const today = new Date();
                                                    const start = today.toISOString().slice(0, 10);
                                                    const endDate = new Date(today);
                                                    endDate.setFullYear(today.getFullYear() + 1);
                                                    const end = endDate.toISOString().slice(0, 10);

                                                    const url = `/search?start=${start}&end=${end}&type=${type}&destination=${encodeURIComponent(city)}`;

                                                    return (
                                                        <li
                                                            key={city}
                                                            className="text-base font-popins py-1 text-blue-600 hover:underline cursor-pointer"
                                                            onClick={() => {
                                                                window.location.href = url;
                                                            }}
                                                        >
                                                            {city}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DestinationList