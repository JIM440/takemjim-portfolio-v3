import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/home';

function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
