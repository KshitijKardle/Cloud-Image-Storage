import { useEffect } from "react";

function Modal({ isOpen, onClose, imageUrl }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 text-6xl font-bold"
        >
          ×
        </button>
        <img src={imageUrl} alt="Full" className="max-h-screen max-w-screen" />
      </div>
    </div>
  );
}

export default Modal;
