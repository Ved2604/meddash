import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Users, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import Avatar from '@/components/ui/Avatar';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/patients', label: 'Patients', icon: Users },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-[220px] bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-gray-100">
        <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v16M2 10h16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <span className="font-semibold text-sm text-gray-900 tracking-tight">MedDash</span>
          <p className="text-[10px] text-gray-400 -mt-0.5">Healthcare platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-100 px-3 py-3">
        <div className="flex items-center gap-2.5 px-2 mb-2">
          <Avatar name={user?.email || 'User'} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">
              {user?.displayName || user?.email?.split('@')[0] || 'Doctor'}
            </p>
            <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
