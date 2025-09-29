import { FaHeart, FaWallet } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { BsBookmark } from "react-icons/bs";
import { useEffect, useState } from "react";

interface DashboardCardProps {
  title: string;
  count: string;
  icon: React.ReactNode;
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  text: string;
}

const DashboardPage = () => {
  const [transactions, setTransactions] = useState<string[]>([]);
  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Wishlist" count="0" icon={<FaHeart className="text-purple-500" />} />
        <DashboardCard title="Trips" count="0" icon={<MdOutlineWork className="text-purple-500" />} />
        <DashboardCard title="My Wallet" count="NPR 0.00" icon={<FaWallet className="text-purple-500" />} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoCard title="Latest Trips" icon={<BsBookmark />} text="You don’t have any Bookings yet—but when you do, you’ll find them here." />
        <InfoCard 
          title="Latest Transactions" 
          icon={<TbArrowsExchange />} 
          text={transactions.length > 0 ? transactions.join(" | ") : "No Transaction History."} 
        />
      </div>
    </div>
  );
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, icon }) => (
  <div className="bg-white shadow-lg shadow-gray rounded-lg p-6 flex items-center justify-center gap-4">
    <div className="bg-gray-200 p-4 rounded-full border border-black bg-black text-xl">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xl font-bold">{count}</p>
    </div>
  </div>
);

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, text }) => (
  <div className="bg-white shadow-md rounded-lg">
    <div className="bg-[rgb(239,239,239)] px-6 py-4 flex items-center gap-2 font-semibold text-lg">
      {icon}
      {title}
    </div>
    <div className="p-6 text-gray-600">{text}</div>
  </div>
);

export default DashboardPage;
