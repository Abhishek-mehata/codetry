import { FC } from "react";

const TabIntro: FC<{ title: string; intro: string }> = ({ title, intro }) => (
  <div className={`w-full mb-8`}>
    <h2 className={`text-dark-blue text-xl font-semibold text-wrap`}>{title}</h2>
    <h3 className={`text-gray mt-2`}>{intro}</h3>
  </div>
);

export default TabIntro;
