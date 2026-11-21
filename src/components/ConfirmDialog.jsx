import { AlertTriangle, X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ConfirmDialog({ task, onCancel, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        className="confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
      >
        <div className="confirm-icon">
          <AlertTriangle size={25} />
        </div>
        <button
          type="button"
          className="confirm-close"
          onClick={onCancel}
          aria-label="Close confirmation"
        >
          <X size={19} />
        </button>
        <h2 id="delete-title">Delete this task?</h2>
        <p id="delete-description">
          Are you sure you want to delete <strong>{task.title}</strong>? This
          action cannot be undone.
        </p>
        <div className="confirm-actions">
          <button
            type="button"
            ref={cancelRef}
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={onConfirm}>
            Delete task
          </button>
        </div>
      </section>
    </div>
  );
}
