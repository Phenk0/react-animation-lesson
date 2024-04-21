import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        variants={{
          hidden: { scale: 0.8, opacity: 0 },
          visible: { x: 0, y: 0, opacity: 1, scale: 1 },
          top: { y: "-5rem" },
          right: { x: "5rem" },
          bottom: { y: "5rem" },
        }}
        initial={["hidden", "top", "right"]}
        animate="visible"
        exit={["hidden", "bottom"]}
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal"),
  );
}
