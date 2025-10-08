import { createSlice, createAsyncThunk, type PayloadAction,  } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import type { AuthState, User } from '../../types';


const initialState: AuthState = {
  user: null,
  token: authService.getToken(),
  isAuthenticated: !!authService.getToken(),
  isLoading: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (_, { rejectWithValue }) => {
    try {
      const authUrl = await authService.initiateLogin();
      window.location.href = authUrl;
      return authUrl;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching user profile...');
      const user = await authService.getProfile();
      console.log('Profile fetched successfully:', user);
      return user;
    } catch (error: any) {
      console.error('Profile fetch failed:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to get profile');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      authService.setToken(action.payload.token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      authService.removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        authService.removeToken();
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        authService.removeToken();
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;