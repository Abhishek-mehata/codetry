import { FaRegUser } from "react-icons/fa";
import { MdMeetingRoom, MdOutlineBed, MdOutlineEmojiEvents } from "react-icons/md";
// import { TbArrowsExchange } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { useEffect} from "react";
import { AllUsers } from "../../redux/actions/user";
import { getAllRooms, getPlaces } from "../../redux/actions/places";
import { getAllAdminEvents} from "../../redux/actions/events";

interface DashboardCardProps {
  title: string;
  count: string;
  icon: React.ReactNode;
}

// interface InfoCardProps {
//   title: string;
//   icon: React.ReactNode;
//   text: string;
// }

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { places,rooms } = useAppSelector((state) => state.places);
  const { adminEventsPagination } = useAppSelector((state) => state.events)

  useEffect(() => {
    dispatch(AllUsers());//fetching All users
    dispatch(getPlaces());//fetching All Places
    dispatch(getAllAdminEvents());//fetching All Events
    dispatch(getAllRooms())//fetching All Rooms
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Stays" count={`${places.length}`} icon={<MdOutlineBed className="text-purple-500" />} />
        <DashboardCard title="Events" count={`${adminEventsPagination.total}`} icon={<MdOutlineEmojiEvents className="text-purple-500" />} />
        <DashboardCard title="Rooms" count={`${rooms?.length}`} icon={<MdMeetingRoom className="text-purple-500" />} />
        <DashboardCard title="Users" count={`${users.length}`} icon={<FaRegUser className="text-purple-500" />} />
      </div>

      {/* Bottom Section */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoCard
          title="Latest Transactionsd"
          icon={<TbArrowsExchange />}
          text={"No Transaction History."}
        />
      </div> */}
    </div>
  );
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, icon }) => (
  <div className="bg-white shadow-md shadow-gray rounded-lg p-6 flex items-center justify-center gap-4">
    <div className="bg-gray-200 p-4 rounded-full border-2 border-primary  text-xl">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xl font-bold">{count}</p>
    </div>
  </div>
);

// const InfoCard: React.FC<InfoCardProps> = ({ title, icon, text }) => (
//   <div className="bg-white shadow-md rounded-lg">
//     <div className="bg-[rgb(239,239,239)] px-6 py-4 flex items-center gap-2 font-semibold text-lg">
//       {icon}
//       {title}
//     </div>
//     <div className="p-6 text-gray-600">{text}</div>
//   </div>
// );

export default DashboardPage;
