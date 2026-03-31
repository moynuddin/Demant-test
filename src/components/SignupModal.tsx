import { useEffect } from "react";
import { createPortal } from "react-dom";
import SignupForm from "./SignupForm";
import "./SignupModal.css";

interface SignupModalProps {
  onClose: () => void;
}

export default function SignupModal({ onClose }: SignupModalProps) {
  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const modal = (
    <div className="modal__overlay" role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="modal__panel--left">
          <div className="modal__heading">
            <h2 className="modal__title" id="modal-title">
              Want to see the unseen?
            </h2>
            <p className="modal__subtitle">
              A gamechanger is coming. Get ready for the impossible made
              possible.
            </p>
          </div>

          <SignupForm onClose={onClose} />
        </div>

        <div className="modal__panel--right" aria-hidden="true">
          <img
            className="modal__image"
            src="/assets/modalImage.jpg"
            alt="Hearing aid image"
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
