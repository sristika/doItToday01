import './app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';
import Homepage from './components/homepage/Homepage';
import Calendarcomponent from './components/calendar/Calendarcomponent';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/calendar" element={<Calendarcomponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
