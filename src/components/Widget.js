import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Label } from 'recharts';

const COLORS = {
  connected: '#4681EB',
  notConnected: '#E0E0E0',
  failed: '#FF4136',
  warning: '#FFDC00',
  notAvailable: '#B10DC9',
  passed: '#2ECC40',
  critical: '#FF4136',
  high: '#FF851B'
};

const Widget = ({ widget }) => {
  // Safeguard: Check if widget.data exists and is an object
  const data = widget.data || {};

  const renderDonutChart = (data) => {
    const chartData = Object.entries(data)
      .filter(([key]) => key !== 'total')
      .map(([key, value]) => ({ name: key, value }));
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            startAngle={-270}
            endAngle={90}
            label="total"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
            <Label
              value={`${total} Total`}
              position="center"
              fill="#000000"
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            />

          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderBarChart = (data) => {
    // Safeguard: Check if data is an object before calling Object.entries
    if (!data || typeof data !== 'object') {
      return renderNoData();
    }

    const chartData = Object.entries(data)
      .filter(([key]) => key !== 'total')
      .map(([key, value]) => ({ name: key, value }));

    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderNoData = () => (
    <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
      <svg class="h-20 w-20 text-slate-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="4 19 8 13 12 15 16 10 20 14 20 19 4 19" />  <polyline points="4 12 7 8 11 10 16 4 20 8" /></svg>
      <p className="text-gray-500">No Graph data available!</p>
    </div>
  );

  const renderChart = () => {
    switch (widget.type) {
      case 'donut-chart':
        return renderDonutChart(data);
      case 'bar-chart':
        return renderBarChart(data);
      case 'no-data':
        return renderNoData();
      default:
        return renderNoData();
    }
  };

  const renderLegend = () => {
    if (widget.type === 'no-data') return null;
    return (
      <div className="flex flex-wrap justify-center mt-4">
        {Object.entries(data)
          .filter(([key]) => key !== 'total')
          .map(([key, value]) => (
            <div key={key} className="flex items-center mr-4 mb-2">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[key] }}></div>
              <span className="text-sm">{`${key}: ${value}`}</span>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">{widget.name}</h3>
      {renderChart()}
      {renderLegend()}
      {data.total && (
        <div className="text-center mt-4">
          <span className="font-bold text-2xl">{data.total}</span>
          <span className="text-sm text-gray-500 ml-2">
            {widget.id === 'image-risk' ? 'Total Vulnerabilities' : 'Total Images'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Widget;
