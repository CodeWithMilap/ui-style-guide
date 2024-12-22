import React from "react";

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-10 h-full grow rounded-md shadow-2xl">
      <div className="flex flex-col gap-20">
        <h2 className="text-primary text-6xl">
          <span className="font-semibold">{title}</span>
        </h2>
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;
