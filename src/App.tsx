import { Route, Routes } from 'react-router-dom';

import './App.scss';
import Navigation from './components/Navigation';
import About from './pages/About';
import ArticleList from './pages/ArticleList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
