import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css'
import { UserContextProvider } from './contexts/UserContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider><App />  </UserContextProvider>
  </StrictMode>,
)
