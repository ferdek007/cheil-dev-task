import { type Product } from '../../types/types'
import './ProductCard.css'

interface Props {
    product: Product;
    selected: boolean;
    toggleSelect: (id: number) => void;
}

export const ProductCard = ({ product, selected, toggleSelect }: Props) => {
    return (
        <div className={`product-card ${selected ? 'selected' : ''}`}>
            <img
                src={product.image ?? '/vite.svg'}
                alt={product.code ?? 'product code'}
                className='product-image'
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '/vite.svg';
                }}
            />
            <div className='text-wrapper'>
                <h3>
                    {[
                        product.code ?? 'N/A',
                        product.name ?? 'N/A',
                        product.volume_kg ? `${product.volume_kg} kg` : 'N/A',
                        product.colour ?? 'N/A'
                    ].join(', ')}
                </h3>
                <div className='description-wrapper'>
                    <p>Pojemność (kg): <span className='text-bold'>{product.volume_kg ?? 'N/A'}</span></p>
                    <p>
                        Wymiary (GxSxW): <span className='text-bold'>
                            {product.dimensions ? (
                                `${product.dimensions.length_cm ?? 'N/A'} 
                                x ${product.dimensions.width_cm ?? 'N/A'} 
                                x ${product.dimensions.height_cm ?? 'N/A'} cm`
                            ) : 'N/A'}
                        </span>
                    </p>
                    <p>
                        Funkcje: <span className='text-bold'>
                            {[
                                product.addWashDoor && 'Drzwi AddWash™',
                                product.panelAIControl && 'Panel AI Control',
                                product.inverterDutyMotor && 'Silnik inwerterowy',
                                product.electronicDisplay && 'Wyświetlacz elektroniczny'
                            ].filter(Boolean).join(', ') || 'N/A'}
                        </span>
                    </p>
                </div>
                <div className='energy-class-wrapper'>
                    <p>Klasa energetyczna</p>
                    <div className="energy-flag-container">
                        <div
                            className={`energy-flag energy-${product.energyClass?.toLowerCase() || 'na'}`}
                        >
                            <span className="energy-flag-label">
                                {product.energyClass ?? 'N/A'}
                            </span>
                            <div className="energy-flag-triangle"></div>
                        </div>
                    </div>
                </div>
                <p>{`Cena obowiązuje: ${product.priceStart ?? 'N/A'} - ${product.priceEnd ?? 'N/A'}`}</p>
                <div className='price-wrapper'>
                    <h2>{product.price_pln ? Math.floor(product.price_pln) : 'N/A'}</h2>
                    <div className='price-fractional-container'>
                        <span className='price-decimals'>
                            {product.price_pln ? (product.price_pln % 1).toFixed(2).slice(2) : '00'}
                        </span>
                        <span className='price-currency'>zł</span>
                    </div>
                </div>
                <span className='instalments-label'>
                    {product.instalments ?
                        `${product.instalments.rate ?? 'N/A'} zł x ${product.instalments.amount ?? 'N/A'} rat` : 'N/A'
                    }
                </span>
            </div>
            <button
                onClick={() => toggleSelect(product.id)}
                className={`product-select-button ${selected ? 'selected' : ''}`}
            >
                {selected ? 'Wybrane' : 'Wybierz'}
            </button>
        </div>
    )
}
