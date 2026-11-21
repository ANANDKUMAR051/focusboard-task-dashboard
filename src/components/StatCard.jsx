import { Check, Clock3, List } from "lucide-react";

const icons = { total: List, progress: Clock3, completed: Check };

export default function StatCard({ type, label, value, detail }) {
  const Icon = icons[type] || List;

  return (
    <article className={`stat-card stat-${type}`}>
      <span className="stat-icon">
        <Icon size={18} />
      </span>
      <div className="stat-details">
        <span className="stat-label">{label}</span>
        <div className="stat-bottom">
          <strong>{value}</strong>
          <span>{detail}</span>
        </div>
      </div>
    </article>
  );
}
