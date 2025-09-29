

const SubNavbar = () => {
    return (
        <div>
            <nav className="w-fit  flex items-center justify-between bg-white border-y border-[#c1c7d0] py-[15px] my-0 px-2 ">
                <ul className="flex gap-[18px]">
                    <li className=""><a href='#details' className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Details</a></li>
                    <li className=""><a href="#dateandtime" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Available Date & Time</a></li>
                    <li className=""><a href="#info" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Info</a></li>
                    <li className=""><a href="#resources" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Resources</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default SubNavbar