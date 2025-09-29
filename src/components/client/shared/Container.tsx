import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Container: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`relative md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1400px] mx-auto w-full h-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
