import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Widget from './Widget';
import { addWidget, removeWidget } from '../features/dashboardSlice';

const Category = ({ category }) => {
  const dispatch = useDispatch();
  const [widgetName, setWidgetName] = useState('');
  const [widgetType, setWidgetType] = useState('bar-chart');

  const getDefaultData = (type) => {
    switch (type) {
      case 'bar-chart':
        return { critical: 10, high: 20 };
      case 'line-chart':
        return { points: [10, 20, 30, 40] };
      case 'donut-chart':
        return { connected: 5, notConnected: 3 };
      default:
        return {};
    }
  };

  const handleAddWidget = () => {
    if (!widgetName) {
      alert('Please enter a widget name.');
      return;
    }

    const newWidget = {
      id: `widget-${Date.now()}`,
      name: widgetName,
      type: widgetType,
      data: getDefaultData(widgetType)
    };

    dispatch(addWidget({ categoryId: category.id, widget: newWidget }));
    setWidgetName('');
  };

  const handleRemoveWidget = (widgetId) => {
    dispatch(removeWidget({ categoryId: category.id, widgetId }));
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {category.widgets.map((widget) => (
          <div key={widget.id} className="relative border-2 border-gray-300 p-4 rounded-lg">
            <Widget widget={widget} />
            <button
              onClick={() => handleRemoveWidget(widget.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          className="border p-2 mr-2 rounded-lg"
        />
        <select
          value={widgetType}
          onChange={(e) => setWidgetType(e.target.value)}
          className="border p-2 mr-2 rounded-lg"
        >
          <option value="bar-chart">Bar Chart</option>
          <option value="line-chart">Line Chart</option>
          <option value="donut-chart">Donut Chart</option>
        </select>
        <button
          onClick={handleAddWidget}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Add Widget
        </button>
      </div>
    </section>
  );
};

export default Category;
