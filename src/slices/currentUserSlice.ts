import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import RestApiClient from '../services/RestApiClient';
import { AccessToken, Tenant } from '../types/user';

interface CurrentUserState {
  status: 'idle' | 'loading' | 'successful' | 'failed',
  error: string | null;
  currentUser: Tenant | null;
}

const initialState: CurrentUserState = {
  status: 'idle',
  error: null,
  currentUser: null,
}

export const signUp = createAsyncThunk(
  'signup',
  async (body: { email: string, password: string }) => {
    const response = await RestApiClient.signUp({
      name: body.email,
      password: body.password,
    });
    return response;
  }
)

export const login = createAsyncThunk(
  'login',
  async (body: { email: string, password: string }) => {
    const response = await RestApiClient.login({
      username: body.email,
      password: body.password,
    });
    return response;
  }
)

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: {

    /** SignUp */

    [signUp.fulfilled.type]: (state: CurrentUserState, action: PayloadAction<Tenant>) => {
      state.status = 'successful'
      state.error = null
      state.currentUser = action.payload
    },
    [signUp.pending.type]: (state: CurrentUserState) => {
      state.status = 'loading'
      state.error = null
    },
    [signUp.rejected.type]: (state: CurrentUserState, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },

    /** Login */
    
    [login.fulfilled.type]: (state: CurrentUserState, action: PayloadAction<AccessToken>) => {
      state.status = 'successful'
      state.error = null
    },
    [login.pending.type]: (state: CurrentUserState) => {
      state.status = 'loading'
      state.error = null
    },
    [login.rejected.type]: (state: CurrentUserState, { error }) => {
      state.status = 'failed'
      state.error = error.message
    },
  },
})

export default currentUserSlice.reducer;
