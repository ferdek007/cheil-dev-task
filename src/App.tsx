import { useMemo, useState } from 'react'
import productsData from './data/products.json'
import type { Product, Filters } from './types/types'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { FiltersBar } from './components/FiltersBar/FiltersBar'
import { Feed } from './components/Feed/Feed'
import { Footer } from './components/Footer/Footer'

const FUNCTION_PROPERTY_MAP: Record<string, keyof Product> = {
  'Drzwi AddWash': 'addWashDoor',
  'Panel AI Control': 'panelAIControl',
  'Silnik inwerterowy': 'inverterDutyMotor',
  'Wyświetlacz elektroniczny': 'electronicDisplay'
}

export const App = () => {
  const [search, setSearch] = useState<string>('')
  const [filters, setFilters] = useState<Filters>({
    sortBy: 'Wszystkie',
    functions: 'Wszystkie',
    energyClass: 'Wszystkie',
    volume: 'Wszystkie',
  })
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const filteredProducts = useMemo(() => {
    // Filtering logic
    const filtered = productsData.filter((product) => {
      const matchesSearch = `${product.code} ${product.name} ${product.volume_kg} kg ${product.colour}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFunction = filters.functions === 'Wszystkie' ||
        product[FUNCTION_PROPERTY_MAP[filters.functions]];

      const matchesEnergy = filters.energyClass === 'Wszystkie' ||
        product.energyClass === filters.energyClass;

      const matchesVolume = filters.volume === 'Wszystkie' ||
        product.volume_kg === parseFloat(filters.volume.replace('kg', ''));

      return matchesSearch && matchesFunction && matchesEnergy && matchesVolume;
    });

    // Sorting logic
    switch (filters.sortBy) {
      case 'Cena rosnąco':
        return [...filtered].sort((a, b) => a.price_pln - b.price_pln)
      case 'Cena malejąco':
        return [...filtered].sort((a, b) => b.price_pln - a.price_pln)
      case 'Pojemność rosnąco':
        return [...filtered].sort((a, b) => a.volume_kg - b.volume_kg)
      case 'Pojemność malejąco':
        return [...filtered].sort((a, b) => b.volume_kg - a.volume_kg)
      default:
        return filtered // No sorting
    }
  }, [search, filters, productsData]);

  const toggleSelect = (productId: number) => {
    setSelectedProducts(prevSelectedIds =>
      prevSelectedIds.includes(productId) ? prevSelectedIds.filter(id => id !== productId) : [...prevSelectedIds, productId]
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
      <Footer />
    </div>
  )
}
