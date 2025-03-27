import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import ConnectForm from './components/ConnectForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat/:roomId" element={<ChatRoom />} />
        <Route path="/" element={<ConnectForm />} />
      </Routes>
    </Router>
  );
}

export default App;