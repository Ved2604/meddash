import { useEffect } from 'react';
import { Users, CalendarCheck, AlertTriangle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/layout/Navbar';
import StatCard from '@/components/ui/StatCard';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';
import { usePatientStore } from '@/stores/patientStore';
import { useNotification } from '@/hooks/useNotification';
import { admissionsData } from '@/data/mockData';
import { formatDate } from '@/utils/helpers';

export default function DashboardPage() {
  const { patients, fetchPatients } = usePatientStore();
  const { notify } = useNotification();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Fire welcome notification on first load
  useEffect(() => {
    const hasNotified = sessionStorage.getItem('meddash-welcomed');
    if (!hasNotified && patients.length > 0) {
      setTimeout(() => {
        notify('Welcome back!', 'You have 5 critical alerts and 3 pending appointments today.', 'info');
        sessionStorage.setItem('meddash-welcomed', 'true');
      }, 1500);
    }
  }, [patients, notify]);

  const recentPatients = patients.slice(0, 5);
  const criticalCount = patients.filter((p) => p.status === 'critical').length;

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <Navbar title="Dashboard" subtitle={today} />

      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total patients"
            value={patients.length > 0 ? '1,248' : '—'}
            change="+12 this week"
            changeType="positive"
            icon={<Users size={16} />}
          />
          <StatCard
            label="Appointments today"
            value="24"
            change="3 pending"
            changeType="neutral"
            icon={<CalendarCheck size={16} />}
          />
          <StatCard
            label="Critical alerts"
            value={criticalCount || '—'}
            change="2 unresolved"
            changeType="negative"
            icon={<AlertTriangle size={16} />}
          />
          <StatCard
            label="Avg wait time"
            value="18m"
            change="-3m from last week"
            changeType="positive"
            icon={<Clock size={16} />}
          />
        </div>

        {/* Chart + Recent patients */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Chart */}
          <div className="lg:col-span-3 chart-card">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Patient admissions this week</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={admissionsData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="admGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1D9E75" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#1D9E75" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '13px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="admissions"
                  stroke="#1D9E75"
                  strokeWidth={2}
                  fill="url(#admGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent patients */}
          <div className="lg:col-span-2 chart-card">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent patients</h3>
            <div className="space-y-3">
              {recentPatients.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Avatar name={p.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                    <p className="text-[11px] text-gray-400">{p.department}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity table */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Latest activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="table-header text-left pb-3 pr-4">Patient</th>
                  <th className="table-header text-left pb-3 pr-4">Department</th>
                  <th className="table-header text-left pb-3 pr-4">Condition</th>
                  <th className="table-header text-left pb-3 pr-4">Status</th>
                  <th className="table-header text-left pb-3">Last visit</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={p.name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{p.name}</p>
                          <p className="text-[11px] text-gray-400">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-600 py-3 pr-4">{p.department}</td>
                    <td className="text-sm text-gray-600 py-3 pr-4">{p.condition}</td>
                    <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
                    <td className="text-sm text-gray-400 py-3">{formatDate(p.lastVisit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
