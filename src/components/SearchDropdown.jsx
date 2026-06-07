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
    <div className="absolute top-[calc(100%+8px)] right-0 w-[300px] bg-bg-card border border-border rounded-[14px] shadow-xl overflow-hidden z-[200] animate-slide-down" ref={ref}>
      {isEmpty ? (
        <p className="p-4 text-[0.875rem] text-fg-muted text-center">
          No results found
        </p>
      ) : (
        Object.entries(grouped).map(([group, items]) => {
          const Icon = GROUP_ICONS[group] || ArrowRight;
          return (
            <div key={group}>
              <div className="py-2 px-3.5 pb-1 text-[0.68rem] font-bold tracking-wider uppercase text-fg-muted">{group}</div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 py-[9px] px-3.5 text-[0.85rem] text-fg-3 cursor-pointer transition-[background,color] duration-120 hover:bg-bg-subtle hover:text-fg"
                  onClick={() => onSelect(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
                >
                  <Icon size={13} className="text-accent shrink-0" />
                  <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
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
