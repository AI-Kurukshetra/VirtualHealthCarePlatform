import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  activeOrganization: null,
  notifications: []
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveOrganization: (state, action) => {
      state.activeOrganization = action.payload;
    },
    pushNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});

export const { toggleSidebar, setActiveOrganization, pushNotification, clearNotifications } = uiSlice.actions;

export default uiSlice.reducer;
