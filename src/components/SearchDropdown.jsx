import { useEffect, useRef } from 'react';
import { FolderOpen, Briefcase, Cpu, ArrowRight } from 'lucide-react';

const GROUP_ICONS = {
  Projects: FolderOpen,
  Experience: Briefcase,
  Skills: Cpu,
};

export default function SearchDropdown({ results, onSelect, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  const grouped = results.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const isEmpty = results.length === 0;

  return (
    <div className="search-dropdown" ref={ref}>
      {isEmpty ? (
        <p style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          No results found
        </p>
      ) : (
        Object.entries(grouped).map(([group, items]) => {
          const Icon = GROUP_ICONS[group] || ArrowRight;
          return (
            <div key={group}>
              <div className="search-group-title">{group}</div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="search-item"
                  onClick={() => onSelect(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
                >
                  <Icon size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
