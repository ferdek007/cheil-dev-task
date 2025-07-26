import { useState } from 'react'
import productsData from './data/products.json'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { FiltersBar } from './components/FiltersBar/FiltersBar'
import { Feed } from './components/Feed/Feed'

export const App = () => {
  const [search, setSearch] = useState<string>('')
  const [filters, setFilters] = useState({
    sortBy: 'Wszystkie',
    functions: 'Wszystkie',
    energyClass: 'Wszystkie',
    volume: 'Wszystkie',
  })
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  let filteredProducts = productsData

  const toggleSelect = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

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
