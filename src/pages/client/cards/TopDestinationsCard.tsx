
// import ny from "../../../assets/images/starting_city_1.jpg";

interface TopDestinationsCardProps {
    src: string;
    cityName: string;
}

const TopDestinationsCard = ({ src, cityName }: TopDestinationsCardProps) => {
    return (
        <div className=" ">
            <a href="#" className="">
                <div
                    // className="relative w-[300px] xs:w-[400px] sm:w-[450px] md:w-[350px] lg:w-[300px] xl:w-[400px]   mx-2 h-[200px] shadow-lg rounded-[13px] bg-cover bg-center overflow-hidden group"
                    // className="relative w-[200px] xs:w-[350px] sms:w-[380px] mds:w-[420px] mds2:w-[500px] sm:w-[600px] smm:w-[680px] md:w-[360px] scs:w-[380px] scc:w-[250px] sc:w-[300px] lg:w-[315px] xl:w-[415px] h-[200px] shadow-lg rounded-[13px] bg-cover bg-center overflow-hidden group"
                    className="relative w-[100%] h-[250px] shadow-lg rounded-md bg-cover bg-center overflow-hidden group"
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5)),url(${src})` }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                    {/* Title */}
                    <h2 className="absolute bottom-4 left-4 text-2xl leading-[32px] text-white font-medium z-10">
                        {/* NEW YORK */}
                        {cityName}
                    </h2>
                </div>
            </a>
        </div>
    );
};

export default TopDestinationsCard;

