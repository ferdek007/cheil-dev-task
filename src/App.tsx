import { useState } from 'react'
import productsData from './data/products.json'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { FiltersBar } from './components/FiltersBar/FiltersBar'
import { Feed } from './components/Feed/Feed'
import type { Product, Filters } from './types/types'

const FUNCTION_PROPERTY_MAP: Record<string, keyof Product> = {
  'Drzwi AddWash': 'addWashDoor',
  'Panel AI Control': 'panelAIControl',
  'Silnik inwerterowy': 'inverterDutyMotor',
  'Wyświetlacz elektroniczny': 'electronicDisplay'
};

export const App = () => {
  const [search, setSearch] = useState<string>('')
  const [filters, setFilters] = useState<Filters>({
    sortBy: 'Wszystkie',
    functions: 'Wszystkie',
    energyClass: 'Wszystkie',
    volume: 'Wszystkie',
  })
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const filteredProducts = productsData
    .filter((product: Product) => {
      const searchString = `${product.code}, ${product.name}, ${product.volume_kg} kg, ${product.colour}`;
      return searchString.toLowerCase().includes(search.toLowerCase());
    })
    .filter((product) => {
      if (filters.functions !== 'Wszystkie') {
        const property = FUNCTION_PROPERTY_MAP[filters.functions];
        return product[property];
      }
      return true;
    })
    .filter((product) =>
      filters.energyClass === 'Wszystkie'
        ? true
        : product.energyClass === filters.energyClass
    )
    .filter((product) =>
      filters.volume === 'Wszystkie'
        ? true
        : product.volume_kg.toString() === filters.volume.replace('kg', '')
    )
    .sort((a, b) => {
      if (filters.sortBy === 'Cena') return a.price_pln - b.price_pln;
      if (filters.sortBy === 'Pojemność') return a.volume_kg - b.volume_kg;
      return 0;
    })

  const toggleSelect = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    )
  }

  return (
    <div className='app-container'>
      <Header />
      <div className='content-container'>
        <SearchBar search={search} setSearch={setSearch} />
        <FiltersBar filters={filters} setFilters={setFilters} />

        <div className='products-count'>
          <p>Liczba wyników: {filteredProducts.length}</p>
        </div>

        <Feed
          products={filteredProducts}
          selectedProducts={selectedProducts}
          toggleSelect={toggleSelect}
        />
      </div>
    </div>
  )
}
