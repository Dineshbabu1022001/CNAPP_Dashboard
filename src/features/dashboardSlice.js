import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: "cnapp",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          type: "donut-chart",
          data: {
            connected: 2,
            notConnected: 2
          }
        },
        {
          id: "cloud-account-risk",
          name: "Cloud Account Risk Assessment",
          type: "donut-chart",
          data: {
            failed: 1689,
            warning: 681,
            notAvailable: 36,
            passed: 7253
          }
        }

      ]
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          type: "line-chart",
          data: null
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          type: "line-chart",
          data: null
        }
      ]
    },
    {
      id: "registry-scan",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk",
          name: "Image Risk Assessment",
          type: "bar-chart",
          data: {
            critical: 6,
            high: 1464
          }
        },
        {
          id: "image-security",
          name: "Image Security Issues",
          type: "bar-chart",
          data: {
            critical: 0,
            high: 2
          }
        }
      ]
    }
  ]
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    }
  }
});

export const { addWidget, removeWidget } = dashboardSlice.actions;

export default dashboardSlice.reducer;