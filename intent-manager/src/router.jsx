import { createBrowserRouter } from 'react-router-dom';
import Intents from './pages/Intents';

const router = createBrowserRouter([
  {
    path: '/intents',
    element: <Intents />,
  },
]);

export default router;
