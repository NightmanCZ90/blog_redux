import { Route, Routes } from 'react-router-dom';

import './App.scss';
import ArticleList from './pages/ArticleList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </div>
  );
}

export default App;
