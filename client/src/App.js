import NavBar from './Components/NavBar';
import MainPg from './Components/MainPg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <NavBar/>
    <Routes>
     <Route path="/" element= {<MainPg/>} />
    </Routes>
    </Router> 
  
  );
}

export default App;
