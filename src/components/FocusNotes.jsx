import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { focusNotes } from "../data/focusNotes";

export default function FocusNotes({ percentage, inProgress, nextTask }) {
  const [active, setActive] = useState(0);
  const note = focusNotes[active];
  const nextTaskTitle = nextTask?.title ?? "All tasks completed!";
  const nextTaskLabel = nextTask ? "NEXT UP" : "ALL DONE";

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
      <div
        className="focus-preview"
        aria-label={`Next task: ${nextTaskTitle}. ${percentage}% of all tasks completed.`}
      >
        <div className="preview-check">
          <Check size={17} />
        </div>
        <div className="preview-copy">
          <small>{nextTaskLabel}</small>
          <strong title={nextTaskTitle}>{nextTaskTitle}</strong>
          <div
            className="preview-progress"
            role="progressbar"
            aria-label="Overall task completion"
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span>
              <i style={{ width: `${percentage}%` }} />
            </span>
            <b>{percentage}%</b>
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
