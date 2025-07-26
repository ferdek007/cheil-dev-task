import { type Product } from '../../types/types'
import { ProductCard } from '../ProductCard/ProductCard'
import './Feed.css'

interface FeedProps {
    products: Product[];
    selectedProducts: number[];
    toggleSelect: (id: number) => void;
}

export const Feed = ({ products, selectedProducts, toggleSelect }: FeedProps) => {
    return (
        <div className='products-grid'>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    selected={selectedProducts.includes(product.id)}
                    toggleSelect={toggleSelect}
                />
            ))}
        </div>
    )
}
