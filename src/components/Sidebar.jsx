import {
  CalendarDays,
  CircleDot,
  LayoutGrid,
  List,
  Settings,
} from "lucide-react";

export const navigation = [
  { name: "Overview", icon: LayoutGrid },
  { name: "My tasks", icon: List },
  { name: "Calendar", icon: CalendarDays },
  { name: "Settings", icon: CircleDot },
];

export default function Sidebar({ section, onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Workspace navigation">
      <div className="brand">
        <span className="brand-symbol" aria-hidden="true">
          <LayoutGrid size={19} />
        </span>
        <strong>FocusBoard</strong>
      </div>
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map(({ name, icon: Icon }) => (
          <button
            type="button"
            key={name}
            className={`sidebar-link ${section === name ? "active" : ""}`}
            onClick={() => onNavigate(name)}
            aria-current={section === name ? "page" : undefined}
          >
            <Icon size={18} />
            <span>{name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
