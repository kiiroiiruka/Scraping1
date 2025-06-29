import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import LengthPage from './pages/AggregateData/LengthPage/LengthPage'
import PublishedPage from './pages/AggregateData/PublishedPage/PublishedPage'
import TagsPage from './pages/AggregateData/TagsPage/TagsPage'
import ViewsPage from './pages/AggregateData/ViewsPage/ViewsPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LengthPage" element={<LengthPage />} />
        <Route path="/PublishedPage" element={<PublishedPage />} />
        <Route path="/TagsPage" element={<TagsPage />} />
        <Route path="/ViewsPage" element={<ViewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
