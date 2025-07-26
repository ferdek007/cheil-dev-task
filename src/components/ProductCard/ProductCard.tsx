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
            <img src={product.image} alt={product.code} className='product-image' />
            <div className='text-wrapper'>
                <h3>{product.code}, {product.name}, {product.volume_kg} kg, {product.colour}</h3>
                <p>{'Pojemność (kg): '} {product.volume_kg}</p>
                <p>{'Wymiary (GxSxW)'} {product.dimensions.length_cm}
                    x {product.dimensions.width_cm}
                    x {product.dimensions.height_cm} cm
                </p>
                <p>Funkcje: {product.addWashDoor ? 'Drzwi AddWash™, ' : ''}{product.panelAIControl ? 'Panel AI Control, ' : ''}
                    {product.inverterDutyMotor ? 'Silnik inwerterowy, ' : ''}{product.electronicDisplay ? 'Wyświetlacz elektroniczny' : ''}
                </p>
                <p>Klasa energetyczna {product.energyClass}</p>
                <p>Cena obowiązuje: {product.priceStart} - {product.priceEnd}</p>
                <p>{product.price_pln.toFixed(2)} zł</p>
                <p>{product.instalments.rate} zł x {product.instalments.amount} rat</p>
            </div>
            <button onClick={() => toggleSelect(product.id)}>
                {selected ? 'Wybrane' : 'Wybierz'}
            </button>
        </div>
    )
}
