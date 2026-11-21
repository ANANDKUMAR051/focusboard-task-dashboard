import { ChevronDown, LayoutGrid } from 'lucide-react';

export default function Header({ section, onNavigate }) {
  return (
    <header className="top-header">
      <button className="mobile-brand" type="button" onClick={() => onNavigate('Overview')}>
        <span className="brand-symbol"><LayoutGrid size={17} /></span>
        <strong>FocusBoard</strong>
      </button>
      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-slash">/</span>
        <strong>{section}</strong>
      </div>
      <div className="avatar-wrap">
        <span className="avatar">JD</span>
        <ChevronDown size={14} className="avatar-chevron" />
      </div>
    </header>
  );
}
