import React from "react";
type Props = {
  className?: string;
  children: React.ReactNode;
};
const Container = ({ className, children }: Props) => {
  return (
    <div
      className={` mx-auto  px-4 md:px-5 lg:px-10  ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
