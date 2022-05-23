import { Route, Routes } from 'react-router-dom';

import './App.scss';
import Navigation from './components/Navigation';
import About from './pages/About';
import ArticleList from './pages/ArticleList';
import Login from './pages/Login';
import MyArticles from './pages/MyArticles';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-articles" element={<MyArticles />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
