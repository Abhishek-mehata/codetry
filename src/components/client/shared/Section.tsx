import { CSSProperties, FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

const Section: FC<SectionProps> = ({ id, children, className, style }) => {
  return (
    <main
      id={id}
      className={`block ${className?.toLowerCase()} py-12 md:py-24`}
      style={style}
    >
      {children}
    </main>
  );
};

export default Section;
