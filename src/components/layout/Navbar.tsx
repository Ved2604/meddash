import NotificationPanel from '@/components/ui/NotificationPanel';

interface NavbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Navbar({ title, subtitle, actions }: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-gray-400 -mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <NotificationPanel />
      </div>
    </header>
  );
}
