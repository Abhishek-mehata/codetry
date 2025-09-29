import  { useState } from 'react'
import user from "../../../../assets/svg/user.png"
import starImg from "../../../../assets/svg/star.svg"


const EventsReview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies nec erat vel scelerisque. Praesent tincidunt bibendum sapien, sit amet lacinia elit vehicula non. Cras et ligula non nulla egestas consequat at in quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.";


  return (
    <>
      <h2 className="text-[28px] font-medium leading-[40px] tracking-[-1px]">Reviews</h2>
      <div className="flex gap-3 items-center">
        <img className="w-[50px] h-[50px] rounded-full" src={user} alt="" />
        <div>
          <span className="name text-[18px] font-semibold">Abhishek</span>
          <p className="text-[#8b9199] text-[14px] font-medium">May 2025</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-3 xss:gap-5">
        <div className="flex gap-1 items-center justify-center">
          <img src={starImg} alt="" />
          <span className="text-[#8b9199] text-[14px] font-medium">(9.0)</span>
        </div>
        <p className="text-[16px] xss:text-[18px] font-[400] xss:font-[500] leading-[40px] tracking-[-1px] ">Highly Recommended</p>
      </div>

      <div className='bg-red-0'>
        <p className={`text-justify font-[500] text-[#8b9199] overflow-hidden transition-all duration-300 
          ${isExpanded ? 'h-auto' : 'h-6 whitespace-nowrap text-ellipsis'}`}>
          {expandText}
        </p>

        <button
        onClick={()=>{
          setIsExpanded(!isExpanded)
        }}
        className='p-2 rounded-full transition-all duration-200 text-blue-500 mt-2'
        >
          {isExpanded ? "See Less" : "See More"}

        </button>
      </div>

    </>
  )
}

export default EventsReview