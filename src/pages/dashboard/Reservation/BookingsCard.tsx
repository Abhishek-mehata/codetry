
import { IoLocationSharp } from "react-icons/io5";
const BookingsCard = () => {
  return (
    <>
     <div className=" w-full h-fit md:flex border border-[#9427F7] py-7 px-5 rounded-xl cursor-default">
          <div>
            <img
              className="object-cover w-full md:w-[290px] md:h-[200px] h-[180px] rounded-md "
              src="https://dmttourism.com/images/property/13/1740383146_promoted1.jpeg"
              alt=""
            />
          </div>
          <div className=" relative md:px-8 w-full ">
              <div>
                <div className="flex items-center gap-3 pb-2 pt-2 md:pt-0  md:-ml-3 ">
                  <h1 className="font-semibold text-xl hover:text-[#9427F7] transition-all ">
                    test product
                  </h1>
                  <p className="pr-3 text-[#9427F7]">Pending</p>
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="font-semibold">Ref number</h1>
                  <p className="pr-3">60rIHK</p>
                </div>

                <div className="flex items-start mt-3 gap-3">
                  <h1 className="font-semibold flex items-center gap-1"><IoLocationSharp/>Location</h1>
                  <p className="pr-3 pb-2 lg:w-[60%] w-[60%] ">
                    Talim Kendra chauk, Biratnagar 13, विराटनगर 56613, Nepal
                  </p>
                </div>
              </div>
            <div className=" w-28 md:w-fit ">
              <h1>  Apr 12, 2025 - Apr 13, 2025</h1>
              <button className="mt-2 font-semibold border-b-4 border-e-4  rounded-xl p-1 hover:border-[#9427F7] hover:text-[#9427F7]  ">
                Details
              </button>
            </div>
              <div className="flex flex-col gap-1  text-right md:-mt-[150px] -mt-[100px] lg:-mt-[110px] " >
                <h1 className="font-semibold">NPR 525</h1>
                <h1>request</h1>
                <h1>1 Nights</h1>
              </div>
          </div>
        </div>
    </>
  )
}

export default BookingsCard