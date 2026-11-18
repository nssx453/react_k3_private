import { useNavigate } from "react-router"

export default function LoginPage() {
    const navigate = useNavigate()

    function handleLogin() {
        localStorage.setItem("token", "12345")
        navigate("/profile")
    }

    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-bold mb-6">Вход в систему</h1>

            <button
                onClick={handleLogin}
                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
            >
                Войти
            </button>
        </div>
    )
}