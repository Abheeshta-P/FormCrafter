import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage, Dashboard, FormsListPage, CreateFormPage, ViewFormPage } from './pages/pages.js';
import { AuthLayout } from './components/index.js'
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/dashboard',
        element: (
          <AuthLayout>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: '/forms',
        element: (
          <AuthLayout>
            <FormsListPage />
          </AuthLayout>
        ),
      },
      {
        path: '/forms/create',
        element: (
          <AuthLayout>
           <CreateFormPage />
          </AuthLayout>
        ),
      },
      {
        path: '/forms/:id',
        element: (
          <AuthLayout>
            <ViewFormPage />
          </AuthLayout>
        ),
      },
    ],
  },
])

// all components should have access to the store containing information about status etc
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
