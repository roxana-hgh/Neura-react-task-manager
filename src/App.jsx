
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout/AppLayout'
import Dashboard from './pages/dashboard/Dashboard';
import Tasks from './pages/tasks/Tasks';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      {path: 'tasks', element: <Tasks /> },
    ],
  }
]);

function App() {


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
