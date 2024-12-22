import React from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
