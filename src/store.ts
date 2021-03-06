import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './slices/articleSlice';
import articleListReducer from './pages/ArticleList/articleListSlice';
import currentUserReducer from './slices/currentUserSlice';

export const store = configureStore({
  reducer: {
    article: articleReducer,
    articleList: articleListReducer,
    currentUser: currentUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;