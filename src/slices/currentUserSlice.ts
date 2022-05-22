import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import RestApiClient from '../services/RestApiClient';
import { AccessToken, Tenant } from '../types/user';

interface CurrentUserState {
  status: 'idle' | 'loading' | 'successful' | 'failed',
  error: string | null;
  user: Tenant | null;
  accessToken: string | null;
  // TODO: Ask and implement tenantId - there is nowhere to get the user's id from
  tenantId: string,
}

const initialState: CurrentUserState = {
  status: 'idle',
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
    const user = await RestApiClient.getTenant(initialState.tenantId, token.access_token);
    return { token, user };
  }
)

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    signOut: (state: CurrentUserState) => {
      state.accessToken = null
      state.user = null
      state.error = null
      state.status = 'idle'
    },
  },
  extraReducers: {

    /** SignUp */

    [signUp.fulfilled.type]: (state: CurrentUserState, action: PayloadAction<Tenant>) => {
      state.status = 'successful'
      state.error = null
      state.user = action.payload
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
    
    [login.fulfilled.type]: (state: CurrentUserState, action: PayloadAction<{ token: AccessToken, user: Tenant }>) => {
      state.status = 'successful'
      state.error = null
      state.accessToken = action.payload.token.access_token
      state.user = action.payload.user
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

export const {signOut } = currentUserSlice.actions
export default currentUserSlice.reducer;
