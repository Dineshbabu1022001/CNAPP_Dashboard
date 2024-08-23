import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './features/dashboardSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
export default store;
