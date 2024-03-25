import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WindowActions from './components/WindowActions';
import MainMenu from './pages/MainMenu';
import Configurator from './pages/Configurator';
import './App.css';
import VendorDocs from './pages/VendorDocs';

function Home() {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate('/menu');
  };
  return (
   <div>
    <WindowActions />
    <div className='body-bg'>
      <div className="hero h-screen w-screen">
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center bg-opacity-60">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Welcome to your toolkit.</h1>
            {/* <p className="mb-5">gsdgsdg</p> */}
            <button className="btn glass text-white" onClick={()=> {
              goToMenu();
            }}>Get Started</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/docs" element={<VendorDocs />} />
      </Routes>
    </Router>
  );
}
