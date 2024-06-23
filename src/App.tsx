import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Fonts, GlobalStyle } from './config/globalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/config/theme';
import useFullVH from './hooks/useFullVH';
import useDefaultLocation from './hooks/useDefaultLocation';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

function App() {
  useFullVH();
  useDefaultLocation();

  return (
    <ThemeProvider theme={theme}>
      <Fonts />
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
