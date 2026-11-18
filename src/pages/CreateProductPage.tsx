import ky from "ky"
import { useState } from 'react'
import { useNavigate } from "react-router"

export default function CreateProductPage() {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    async function createProduct(event: React.FormEvent) {
        event.preventDefault()
        await ky.post('http://localhost:3000/products', {
            json: { title, category, image }
        })
        navigate('/')
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Создать новый товар</h1>
            <form onSubmit={createProduct} className="flex flex-col gap-3">
                <input
                    value={title}
                    onInput={(e) => setTitle(e.currentTarget.value)}
                    type="text"
                    placeholder="Название"
                    className="border p-2"
                    required
                />
                <input
                    value={category}
                    onInput={(e) => setCategory(e.currentTarget.value)}
                    type="text"
                    placeholder="Категория"
                    className="border p-2"
                    required
                />
                <input
                    value={image}
                    onInput={(e) => setImage(e.currentTarget.value)}
                    type="text"
                    placeholder="Ссылка на картинку"
                    className="border p-2"
                    required
                />

                <button type="submit" className="bg-pink-500 text-white p-2">
                    Создать
                </button>
            </form>
        </div>
    )
}