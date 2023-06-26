import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppProvider.tsx';
import './scss/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
