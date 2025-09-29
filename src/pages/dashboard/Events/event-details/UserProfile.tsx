

// images for user-profile
// import userP1 from "./images/user-profile/u1.jpg"
import userP1 from "../../../../../src/assets/svg/user 2.svg";
import { useAppSelector } from '../../../../hooks/useTypedSelectors';
import { RootAppState } from '../../../../redux/store';

const UserProfile = () => {
    const { user } = useAppSelector((state: RootAppState) => state.auth);
    // console.log(user, 'user')
    return (
        <>
            <div className="flex items-center">
                <div className="user-image relative">
                    {user.profilePicture ?
                        <img className="w-[40px] h-[40px] object-cover rounded-full align-middle" src={user.profilePicture} alt="" /> :
                        <img className="w-[40px] h-[40px] object-cover rounded-full align-middle" src={userP1} alt="" />
                    }
                    {/* Status Indicator */}
                    {/* <span className="status-indicator w-[15px] h-[15px] bg-green-500 absolute  bottom-0 right-0 rounded-full border-[2px] border-solid border-[#fff]"></span> */}
                </div>
                <p className="ml-3 capitalize text-black font-semibold">{user?.firstName} {user?.lastName}
                </p>
            </div>
        </>
    )
}

export default UserProfile