
import './App.css';
import AppContext from './components/app_context/AppContext';
import Pages from './pages/Pages';
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
  <>
  <Router>
    <AppContext>
    <Pages/>
    </AppContext>
  </Router>
  </>
  );
}

export default App;
