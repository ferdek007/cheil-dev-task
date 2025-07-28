import { useState } from 'react';
import { type Product } from '../../types/types'
import { ProductCard } from '../ProductCard/ProductCard'
import './Feed.css'

interface FeedProps {
    products: Product[];
    selectedProducts: number[];
    toggleSelect: (id: number) => void;
}

export const Feed = ({ products, selectedProducts, toggleSelect }: FeedProps) => {
    const [showAll, setShowAll] = useState<boolean>(false)
    const initialProductsCount: number = 6
    const productsToShow: Product[] = showAll
        ? products
        : products.slice(0, initialProductsCount)

    return (
        <div className='feed-container'>
            <div className='products-grid'>
                {productsToShow.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        selected={selectedProducts.includes(product.id)}
                        toggleSelect={toggleSelect}
                    />
                ))}
            </div>

            {products.length > initialProductsCount && (
                <button
                    className='show-more-button'
                    onClick={() => setShowAll(!showAll)}
                    aria-expanded={showAll}
                >
                    <span>{showAll ? 'Pokaż mniej' : 'Pokaż więcej'}</span>
                </button>
            )}
        </div>
    )
}
