

const RoomsCard = () => {
    return (
        <>

            {/* Child 4 - card for selecting room untill .... for free cancellation*/}
            <div>
                <div className="h-[min-content] my-2 bg-white flex flex-col items-center justify-center gap-6 rounded-[7px] shadow p-[32px]">
                    <h2 className="text-[#172b4d] text-[17.5px] font-medium">Select room for pricing</h2>
                    <p className="text-[#172b4d] text-[14px] font-[400]">Free cancellation until <span className="text-[#9c59df]">May 28, 2025</span></p>
                </div>
            </div>
        </>
    )
}

export default RoomsCard