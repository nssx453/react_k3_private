import ky from "ky"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import type { Product } from '../types'

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null)

    const { id } = useParams<{ id: string }>()

    console.log("Текущий ID:", id)

    async function getProduct() {
        const resp = await ky.get<Product>(`http://localhost:3000/products/${id}`).json()
        setProduct(resp)
    }

    useEffect(() => {
        getProduct()
    }, [id])

    return (
        <div>
            {
                product ?
                    (
                        <>
                            <p>{product.title}</p>
                            <p>{product.category}</p>
                            <img src={product.image} alt="" />
                        </>
                    ) : <div> ЗАГРУЗКА</div>
            }
        </div>
    )
}