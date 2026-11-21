import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { focusNotes } from "../data/focusNotes";

export default function FocusNotes({ percentage, inProgress }) {
  const [active, setActive] = useState(0);
  const note = focusNotes[active];

  function move(direction) {
    setActive(
      (current) =>
        (current + direction + focusNotes.length) % focusNotes.length,
    );
  }

  return (
    <section
      className="focus-banner"
      id="focus-notes"
      aria-label="Focus Notes carousel"
    >
      <div className="focus-copy" aria-live="polite">
        <div className="focus-eyebrow">
          <span>FOCUS NOTES</span>
          <span>{String(active + 1).padStart(2, "0")} / 03</span>
        </div>
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <div className="focus-indicators" aria-label="Choose Focus Note">
          {focusNotes.map((item, index) => (
            <button
              type="button"
              key={item.title}
              className={active === index ? "selected" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
      <div className="focus-preview" aria-hidden="true">
        <div className="preview-check">
          <Check size={17} />
        </div>
        <div className="preview-copy">
          <small>{note.label}</small>
          <strong>{note.task}</strong>
          <div className="preview-progress">
            <span>
              <i style={{ width: `${note.progress}%` }} />
            </span>
            <b>{note.progress}%</b>
          </div>
        </div>
      </div>
      <div className="focus-arrows">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous Focus Note"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next Focus Note"
        >
          <ChevronRight size={22} />
        </button>
      </div>
      <div className="mobile-focus-progress">
        <span>{inProgress} tasks waiting for your attention.</span>
        <div>
          <i style={{ width: `${percentage}%` }} />
        </div>
        <strong>{percentage}%</strong>
      </div>
    </section>
  );
}
