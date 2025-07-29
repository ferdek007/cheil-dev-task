import { useMemo, useState } from 'react'
import productsData from './data/products.json'
import { SORT_OPTIONS, FUNCTION_OPTIONS, ENERGY_CLASS_OPTIONS, VOLUME_OPTIONS } from './constants'
import type { Product, Filters } from './types/types'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { FiltersBar } from './components/FiltersBar/FiltersBar'
import { Feed } from './components/Feed/Feed'
import { Footer } from './components/Footer/Footer'

const FUNCTION_PROPERTY_MAP: Record<string, keyof Product> = {
  [FUNCTION_OPTIONS.ADD_WASH_DOOR]: 'addWashDoor',
  [FUNCTION_OPTIONS.PANEL_AI_CONTROL]: 'panelAIControl',
  [FUNCTION_OPTIONS.INVERTER_DUTY_MOTOR]: 'inverterDutyMotor',
  [FUNCTION_OPTIONS.ELECTRONIC_DISPLAY]: 'electronicDisplay'
}

export const App = () => {
  const [search, setSearch] = useState<string>('')
  const [filters, setFilters] = useState<Filters>({
    sortBy: SORT_OPTIONS.ALL,
    functions: FUNCTION_OPTIONS.ALL,
    energyClass: ENERGY_CLASS_OPTIONS.ALL,
    volume: VOLUME_OPTIONS.ALL,
  })
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const filteredProducts = useMemo(() => {
    // Filtering logic
    const filtered = productsData.filter((product) => {
      const matchesSearch = `${product.code} ${product.name} ${product.volume_kg} kg ${product.colour}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFunction = filters.functions === FUNCTION_OPTIONS.ALL ||
        product[FUNCTION_PROPERTY_MAP[filters.functions]];

      const matchesEnergy = filters.energyClass === ENERGY_CLASS_OPTIONS.ALL ||
        product.energyClass === filters.energyClass;

      const matchesVolume = filters.volume === VOLUME_OPTIONS.ALL ||
        product.volume_kg === parseFloat(filters.volume.replace('kg', ''));

      return matchesSearch && matchesFunction && matchesEnergy && matchesVolume;
    });

    // Sorting logic
    switch (filters.sortBy) {
      case SORT_OPTIONS.PRICE_ASC:
        return [...filtered].sort((a, b) => a.price_pln - b.price_pln)
      case SORT_OPTIONS.PRICE_DESC:
        return [...filtered].sort((a, b) => b.price_pln - a.price_pln)
      case SORT_OPTIONS.VOLUME_ASC:
        return [...filtered].sort((a, b) => a.volume_kg - b.volume_kg)
      case SORT_OPTIONS.VOLUME_DESC:
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
