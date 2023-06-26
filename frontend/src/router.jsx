import {createBrowserRouter, Navigate} from "react-router-dom";
import Appointments from "./views/Appointments.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import AppointmentForm from "./views/AppointmentForm.jsx";
import Availability from "./views/Availability.jsx";
import Setari from "./views/Setari.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard"/>
      },
      {
        path: '/dashboard',
        element: <Appointments/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/appointments/new',
        element: <AppointmentForm key="userCreate" />
      },
      {
        path: '/appointments/:id',
        element: <AppointmentForm key="userUpdate" />
      },
      {
        path: '/availability',
        element: <Availability />
      },
      {
        path: '/setari',
        element: <Setari />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;