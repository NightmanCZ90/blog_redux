import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import RestApiClient from '../services/RestApiClient';
import { AccessToken, AccessTokenWithExpiration, Tenant } from '../types/user';

interface CurrentUserState {
  status: 'idle' | 'loading' | 'successful' | 'failed',
  tenantStatus: 'idle' | 'loading' | 'successful' | 'failed',
  error: string | null;
  user: Tenant | null;
  accessToken: AccessTokenWithExpiration | null;
  // TODO: Ask and implement tenantId - there is nowhere to get the user's id from
  tenantId: string,
}

const initialState: CurrentUserState = {
  status: 'idle',
  tenantStatus: 'idle',
  error: null,
  user: null,
  accessToken: null,
  tenantId: "522d8724-83a2-431b-9a9d-35754db40c76",
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
    const token = await RestApiClient.login({
      username: body.email,
      password: body.password,
    });
    return token;
  }
)

export const getTenant = createAsyncThunk(
  'getTenant',
  async (accessToken: string) => {
    const user = await RestApiClient.getTenant(initialState.tenantId, accessToken);
    return user;
  }
)

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setToken: (state: CurrentUserState, action: PayloadAction<AccessTokenWithExpiration>) => {
      state.accessToken = action.payload;
    },
    signOut: (state: CurrentUserState) => {
      state.accessToken = null;
      state.user = null;
      state.error = null;
      state.status = 'idle';
      localStorage.removeItem('access_token');
      localStorage.removeItem('tenantId');
    },
  },
  extraReducers: {

    /** SignUp */

    [signUp.fulfilled.type]: (state: CurrentUserState, action: PayloadAction<Tenant>) => {
      state.status = 'successful';
      state.error = null;
      state.user = action.payload;
    },
    [signUp.pending.type]: (state: CurrentUserState) => {
      state.status = 'loading';
      state.error = null;
    },
    [signUp.rejected.type]: (state: CurrentUserState, { error }) => {
      state.status = 'failed';
      state.error = error.message;
    },

    /** Login */
    
    [login.fulfilled.type]: (state: CurrentUserState, action: PayloadAction<AccessToken>) => {
      state.status = 'successful';
      state.error = null;

      const token = {
        ...action.payload,
        expiresAt: Date.now() + (action.payload.expires_in * 1000),
      }

      state.accessToken = token;
      localStorage.setItem('access_token', JSON.stringify(token));
    },
    [login.pending.type]: (state: CurrentUserState) => {
      state.status = 'loading';
      state.error = null;
    },
    [login.rejected.type]: (state: CurrentUserState, { error }) => {
      state.status = 'failed';
      state.error = error.message;
    },

    /** Tenant */

    [getTenant.fulfilled.type]: (state: CurrentUserState, action: PayloadAction<Tenant>) => {
      state.tenantStatus = 'successful';
      state.user = action.payload;

      localStorage.setItem('tenantId', action.payload.tenantId);
    },
    [getTenant.pending.type]: (state: CurrentUserState) => {
      state.tenantStatus = 'loading';
    },
  },
})

export const { setToken, signOut } = currentUserSlice.actions;
export default currentUserSlice.reducer;
