import { useNavigate } from "react-router"

export default function ProfilePage() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>

            <button
                onClick={handleLogout}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Выйти
            </button>
        </div>
    )
}