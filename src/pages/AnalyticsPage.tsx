import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import Navbar from '@/components/layout/Navbar';
import { admissionsTrend, departmentData, statusDistribution } from '@/data/mockData';

const DEPARTMENTS = ['All departments', 'Cardiology', 'Neurology', 'Orthopedics', 'General', 'Pediatrics', 'Pulmonology'];
const TIME_RANGES = ['Last 7 days', 'Last 30 days', 'Last 90 days'];

export default function AnalyticsPage() {
  const [department, setDepartment] = useState('All departments');
  const [timeRange, setTimeRange] = useState('Last 30 days');

  const filteredDeptData =
    department === 'All departments'
      ? departmentData
      : departmentData.filter((d) => d.name === department);

  return (
    <div>
      <Navbar
        title="Analytics"
        actions={
          <div className="flex items-center gap-2">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:border-brand-400"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:border-brand-400"
            >
              {TIME_RANGES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        }
      />

      <div className="p-6 space-y-4">
        {/* Admissions trend line chart */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Patient admissions over time</h3>
          <p className="text-xs text-gray-400 mb-4">{timeRange} · {department}</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={admissionsTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D9E75" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#1D9E75" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#1D9E75"
                strokeWidth={2}
                fill="url(#trendGrad)"
                name="Admissions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart + Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Bar chart */}
          <div className="lg:col-span-3 chart-card">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Patients by department</h3>
            <p className="text-xs text-gray-400 mb-4">{timeRange}</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={filteredDeptData}
                layout="vertical"
                margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
              >
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  }}
                  cursor={{ fill: '#f9fafb' }}
                />
                <Bar dataKey="patients" radius={[0, 4, 4, 0]} barSize={20}>
                  {filteredDeptData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut chart */}
          <div className="lg:col-span-2 chart-card flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Patient status breakdown</h3>
            <p className="text-xs text-gray-400 mb-4">Current distribution</p>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {statusDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => (
                      <span className="text-xs text-gray-500">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ position: 'relative', marginTop: '-160px', marginBottom: '80px' }}>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">1,248</p>
                <p className="text-[11px] text-gray-400">Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
