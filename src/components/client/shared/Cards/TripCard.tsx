import { FC } from "react";

const url =
  `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` as string;

const TripCard: FC = () => {
  return (
    <div className={`flex flex-col gap-4 justify-center items-start`}>
      <div
        className={`grid gap-2 grid-cols-3 grid-rows-2 shadow rounded-lg overflow-hidden`}
      >
        <img
          src={url}
          className={`row-span-2 col-span-2 h-full max-w-full object-center object-cover`}
          alt={`trip image`}
        />
        <img
          src={url}
          className={`h-full max-w-full object-center object-cover`}
          alt={`trip image`}
        />
        <img
          src={url}
          className={`h-full max-w-full object-center object-cover`}
          alt={`trip image`}
        />
      </div>
      <div>
        <h4 className={`text-2xl text-dark-purple font-semibold`}>
          {`Summer Vacation`}
        </h4>
        <h5 className={`text-dark-gray`}>{`Jan 22 - Jun 25, 2021`}</h5>
      </div>
    </div>
  );
};

export default TripCard;
