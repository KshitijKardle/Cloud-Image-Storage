import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaShare } from "react-icons/fa";
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-gray-900 text-white p-6 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close modal"
            >
              <FaTimes />
            </motion.button>

            {/* Image */}
            <div className="w-full h-[60vh] flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
              <motion.img
                src={imageUrl}
                alt="Full"
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            </div>

            {/* Action Buttons */}
            <motion.div
              className="mt-6 flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Share Button */}
              <motion.button
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  if (navigator.clipboard && imageUrl) {
                    navigator.clipboard.writeText(imageUrl);
                    alert("Image URL copied to clipboard!");
                  }
                }}
              >
                <FaShare /> Share
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
