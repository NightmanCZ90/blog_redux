import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import Navigation from './components/Navigation';
import About from './pages/About';
import ArticleList from './pages/ArticleList';
import CreateArticle from './pages/CreateArticle';
import Login from './pages/Login';
import MyArticles from './pages/MyArticles';
import SignUp from './pages/SignUp';
import { getTenant, setToken, signOut } from './slices/currentUserSlice';
import { useAppDispatch, useAppSelector } from './store';
import { AccessToken, AccessTokenWithExpiration } from './types/user';

const Protected = (props: { accessToken: AccessToken | null, children: React.ReactElement }) => {
  const { children, accessToken } = props;

  if (!accessToken) {
    return <Navigate to="/" replace />
  }
  return children;
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector(state => state.currentUser);
  const savedToken = getSavedToken();

  useEffect(() => {
    if (!accessToken) {
      savedToken && Date.now() >= savedToken.expiresAt && dispatch(signOut());
      savedToken && dispatch(setToken(savedToken));
    }
  }, [dispatch, accessToken, savedToken]);

  useEffect(() => {
    if (accessToken && !user) {
      dispatch(getTenant(accessToken.access_token));
    }
  }, [dispatch, accessToken, user]);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/my-articles"
          element={
            <Protected accessToken={savedToken || accessToken}>
              <MyArticles />
            </Protected>
          } 
        />
        <Route
          path="/create"
          element={
            <Protected accessToken={savedToken || accessToken}>
              <CreateArticle />
            </Protected>
          } 
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );

  function getSavedToken() {
    const savedToken = localStorage.getItem('access_token');
    return savedToken ? JSON.parse(savedToken) as AccessTokenWithExpiration : null;
  }
}

export default App;
