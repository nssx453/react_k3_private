import ky from "ky"
import { useEffect, useState } from 'react'
import type { Product } from '../types'
import { NavLink } from "react-router";

type ProductItemProps = {
    product: Product,
    deleteProduct: (id: number) => void,
    editProduct: (id: number, updated: Product) => void,
}

function ProductItem({ product, deleteProduct, editProduct }: ProductItemProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState<Product>(product)

    function toggleEdit() {
        if (isEditing) {
            editProduct(product.id, form)
        } else {
            setForm(product)
        }
        setIsEditing(!isEditing)
    }

    return (
        <div className="border-2 p-2 flex flex-col gap-1 h-full">
            {
                isEditing
                    ? (
                        <>
                            <input
                                value={form.title}
                                onInput={(e) => setForm({ ...form, title: e.currentTarget.value })}
                                type="text"
                                placeholder="Название"
                            />
                            <input
                                value={form.category}
                                onInput={(e) => setForm({ ...form, category: e.currentTarget.value })}
                                type="text"
                                placeholder="Категория"
                            />
                            <input
                                value={form.image}
                                onInput={(e) => setForm({ ...form, image: e.currentTarget.value })}
                                type="text"
                                placeholder="Картинка"
                            />
                        </>
                    )
                    : (
                        <>
                            <p>{product.title}</p>
                            <p>{product.category}</p>
                            <img src={product.image} alt="" />
                        </>

                    )
            }
            <div className="mt-auto flex gap-2">
                <button
                    className="bg-red-500"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteProduct(product.id) }}
                >
                    Удалить
                </button>

                <button
                    className="bg-pink-500"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleEdit() }}
                >
                    {isEditing ? 'Сохранить' : 'Редактировать'}
                </button>
            </div>
        </div>
    )
}

export default function Products() {

    const [products, setProducts] = useState<Product[]>([])

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')

    async function getData() {
        const resp = await ky.get<Product[]>('http://localhost:3000/products').json()
        setProducts(resp)
    }

    useEffect(() => {
        getData()
    }, [])

    async function createRecipes(event: React.FormEvent) {
        event.preventDefault()
        const newProducts = { title, category, image }

        await ky.post('http://localhost:3000/products', {
            json: newProducts
        })

        setTitle('')
        setCategory('')
        setImage('')

        getData()
    }

    async function deleteProduct(id: number) {
        await ky.delete(`http://localhost:3000/products/${id}`)
        setProducts(prev => prev.filter(r => r.id !== id))
    }

    async function editProduct(id: number, updated: Product) {
        await ky.put(`http://localhost:3000/products/${id}`, { json: updated })
        setProducts(prev => prev.map(r => r.id === id ? updated : r))
    }

    return (
        <div>
            <div className="mb-4">
                <NavLink to="/products/create" className="bg-green-500 text-white p-2 inline-block">
                    + Добавить новый товар
                </NavLink>
            </div>
            <div className="grid grid-cols-5 gap-5">
                {products.map(product => (
                    <NavLink key={product.id} to={`/products/${product.id}`} className="block">
                        <ProductItem
                            product={product}
                            deleteProduct={deleteProduct}
                            editProduct={editProduct}
                        />
                    </NavLink>

                ))}
            </div>
        </div>
    )
}