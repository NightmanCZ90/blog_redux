import { Route, Routes } from 'react-router-dom';

import './App.scss';
import Navigation from './components/Navigation';
import ArticleList from './pages/ArticleList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </div>
  );
}

export default App;
