import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import Navigation from './components/Navigation';
import About from './pages/About';
import ArticleList from './pages/ArticleList';
import Login from './pages/Login';
import MyArticles from './pages/MyArticles';
import SignUp from './pages/SignUp';
import { useAppSelector } from './store';
import { Tenant } from './types/user';

const Protected = (props: { user: Tenant | null, children: React.ReactElement }) => {
  const { children, user } = props;

  if (!user) {
    return <Navigate to="/" replace />
  }
  return children;
}

const App: React.FC = () => {
  const { user } = useAppSelector(state => state.currentUser);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/my-articles"
          element={
            <Protected user={user}>
              <MyArticles />
            </Protected>
          } 
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
