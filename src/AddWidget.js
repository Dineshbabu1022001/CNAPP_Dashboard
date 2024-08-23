import React, { useState } from 'react';

const AddWidget = ({ onAdd }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetType, setWidgetType] = useState('bar-chart');

  const handleAdd = () => {
    const newWidget = {
      id: `${widgetName}-${Date.now()}`,
      name: widgetName,
      type: widgetType,
      data: generateInitialData(widgetType), // Call function to initialize data based on widget type
    };
    onAdd(newWidget);
    setWidgetName('');
    setWidgetType('bar-chart');
  };

  const generateInitialData = (type) => {
    switch (type) {
      case 'bar-chart':
        return [5, 10, 15, 20]; // Example data for bar chart
      case 'line-chart':
        return [{ x: 1, y: 5 }, { x: 2, y: 10 }, { x: 3, y: 15 }]; // Example data for line chart
      case 'donut-chart':
        return [25, 75]; // Example data for pie chart
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
        placeholder="Widget Name"
        className="border p-2 mb-4"
      />
      <select
        value={widgetType}
        onChange={(e) => setWidgetType(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="bar-chart">Bar Chart</option>
        <option value="line-chart">Line Chart</option>
        <option value="donut-chart">Pie Chart</option>
      </select>
      <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded-lg">
        Add Widget
      </button>
    </div>
  );
};

export default AddWidget;
