import { Navigate, Outlet, useLocation } from "react-router"

export default function PrivateRoute() {

    const location = useLocation()
    console.log(location)

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" state={{ from: location.pathname }} />
    }

    return (
        < Outlet />
    )

}