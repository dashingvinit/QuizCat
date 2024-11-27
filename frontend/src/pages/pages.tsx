import { Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';
import Quiz from './Quiz';
import Result from './Result';
import HistoryPage from './History';
import QuizDetail from './QuizDetail';

function pages() {
  return (
    <Routes>
      <Route index path="/" element={<Dashboard />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/quiz/results" element={<Result />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/history/:id" element={<QuizDetail />} />
    </Routes>
  );
}

export default pages;
