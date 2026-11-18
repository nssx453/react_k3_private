import { NavLink, Outlet } from "react-router";

export default function MainLayout() {

    return (
        <div>
            <header>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/products">Товары</NavLink>
                <NavLink to="/products/create">Создание</NavLink>
                <NavLink to="/login">Вход</NavLink>
                <NavLink to="/profile">Профиль</NavLink>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>

            </footer>
        </div>
    )

}