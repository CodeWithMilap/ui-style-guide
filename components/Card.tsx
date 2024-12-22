// components/Card.tsx

import React, { ReactNode } from "react";

// Define the props type for the Card component
interface CardProps {
  title: string;
  children: ReactNode; // Accepts any valid React children (e.g., JSX, elements)
}

// Card component that accepts a title and children to display
const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-10 h-full grow rounded-md shadow-2xl">
      <div className="flex flex-col gap-20">
        {/* Main title displayed at the top */}
        <h2 className="text-primary text-6xl">
          01. <span className="font-semibold">{title}</span>
        </h2>
        {/* Children content will be passed here */}
        {children}
      </div>
    </div>
  );
};

export default Card;
