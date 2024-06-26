import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import AuthService from '../services/auth';

const user = JSON.parse(localStorage.getItem('user'));

export const register = createAsyncThunk('auth/register', async ({ username, email, password }, thunkAPI) => {
  try {
    const response = await AuthService.register(username, email, password);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue();
  }
});

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const { code, data } = await AuthService.login(username, password);
    console.log('login code', code);
    if (code === 200) {
      return { user: data };

    }
    return thunkAPI.rejectWithValue();

  } catch (error) {
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth', initialState, extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    }, [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    }, [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    }, [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    }, [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;