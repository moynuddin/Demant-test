import { useState, useRef } from "react";
import "./SignupForm.css";

interface SignupFormProps {
  onClose: () => void;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function SignupForm({ onClose }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [clinicLines, setClinicLines] = useState<string[]>([""]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const emailError =
    hasSubmitted && !isValidEmail(email)
      ? "Please enter a valid email address."
      : "";
  const termsError =
    hasSubmitted && !termsAccepted
      ? "You must accept the Terms & Conditions to submit."
      : "";

  const handleAddLine = () => {
    if (clinicLines.length < 3) {
      setClinicLines((prev) => [...prev, ""]);
    }
  };

  const handleRemoveLine = (index: number) => {
    setClinicLines((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleLineChange = (index: number, value: string) => {
  //   console.log(value);
  //   setClinicLines((prev) => {
  //     const updated = [...prev];
  //     updated[index] = value;
  //     return updated;
  //   });
  // };

  const handleSubmit = async () => {
    setHasSubmitted(true);
    if (!isValidEmail(email) || !termsAccepted) return;

    setIsSubmitting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    console.log({ email, clinicLines });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="form">
      {/* Email */}
      <div className="form__field">
        <label htmlFor="form-email">E-mail*</label>
        <input
          ref={firstInputRef}
          id="form-email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="martin@clinicaudio.com"
          autoComplete="email"
          aria-describedby={emailError ? "form-email-error" : undefined}
          aria-invalid={emailError ? true : undefined}
          className={`form__input${emailError ? " form__input--error" : ""}`}
        />
        {emailError && (
          <span
            id="form-email-error"
            className="form__field-error"
            role="alert"
          >
            {emailError}
          </span>
        )}
      </div>

      {/* Clinic address lines */}
      {clinicLines.map((line, index) => (
        <div className="form__field" key={index}>
          <label>
            {index === 0
              ? "Clinic - Address line 1"
              : `Address line ${index + 1}`}
          </label>
          <div className="form__input-row">
            <input
              id={`form-clinic-${index}`}
              className="form__input"
              type="text"
              value={line}
              onChange={(e) => handleLineChange(index, e.target.value)}
              placeholder="Enter clinic name and address"
            />
            {index > 0 && (
              <button
                type="button"
                className="form__remove-btn"
                onClick={() => handleRemoveLine(index)}
                aria-label={`Remove address line ${index + 1}`}
              >
                <img
                  src="/assets/trashIcon.png"
                  alt="Delete"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add another line */}
      {clinicLines.length < 3 && (
        <button
          type="button"
          className="form__add-line-btn"
          onClick={handleAddLine}
        >
          <img src="/assets/addIcon.png" alt="Add" />
          Add another line
        </button>
      )}

      {/* Terms & Conditions */}
      <div className="form__field form__field--terms">
        <label className="form__checkbox-label">
          <input
            type="checkbox"
            className="form__checkbox-input"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            aria-describedby={termsError ? "form-terms-error" : undefined}
          />
          <span className="form__checkbox-custom" aria-hidden="true">
            {termsAccepted && "✓"}
          </span>
          <span className="form__terms-text">
            By submitting this form, you agree to receive marketing
            communications from Demant A/S regarding our products, services,
            promotions, and events by email and/or by phone. You can unsubscribe
            at any time by clicking the unsubscribe link, by sending an email to{" "}
            <a
              href="mailto:privacy@demant.com"
              onClick={(e) => e.stopPropagation()}
            >
              privacy@demant.com
            </a>{" "}
            or by informing us during a phone conversation. To learn more about
            how we process your data, please see{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Privacy policy
            </a>
            .
          </span>
        </label>
        {termsError && (
          <span
            id="form-terms-error"
            className="form__field-error"
            role="alert"
          >
            {termsError}
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="button"
        className="form__submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Submit"}
      </button>
    </div>
  );
}
