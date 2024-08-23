import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Category from './Category';
import { addWidget } from '../features/dashboardSlice';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [widgetType, setWidgetType] = useState('bar-chart');

  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();

  if (!categories) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl">Loading categories...</p>
      </div>
    );
  }

  const filteredCategories = categories
    .map((category) => {
      const filteredWidgets = category.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, widgets: filteredWidgets };
    })
    .filter((category) => category.widgets.length > 0);

  const getDefaultData = (type) => {
    switch (type) {
      case 'bar-chart':
        return { critical: 10, high: 20, medium: 30, low: 40 };
      case 'line-chart':
        return { points: [10, 20, 30, 40] };
      case 'donut-chart':
        return { connected: 5, notConnected: 3 };
      default:
        return {};
    }
  };

  const handleAddWidget = () => {
    if (selectedCategoryId && widgetName) {
      const newWidget = {
        id: `widget-${Date.now()}`,
        name: widgetName,
        type: widgetType,
        data: getDefaultData(widgetType),
      };
      dispatch(addWidget({ categoryId: selectedCategoryId, widget: newWidget }));
      setWidgetName('');
      setSelectedCategoryId(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <nav className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">Home</span>
            <span className="text-gray-500">&gt;</span>
            <span className="text-lg font-semibold">Dashboard V2</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </nav>
      </header>

      <main>
        <p className="font-bold text-2xl my-5">CNAPP Dashboard</p>
        <div className="flex items-center space-x-4 mb-4">
          <select
            className="border border-gray-300 p-2 rounded-lg"
            value={selectedCategoryId || ''}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Widget Name"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />
          <select
            className="border border-gray-300 p-2 rounded-lg"
            value={widgetType}
            onChange={(e) => setWidgetType(e.target.value)}
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

        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Category key={category.id} category={category} />
          ))
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-xl">No widgets match your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
