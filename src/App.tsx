import { useState } from 'react'
import productsData from './data/products.json'
import { type Product } from './types/types'
import './App.css'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { FiltersBar } from './components/FiltersBar/FiltersBar'

export const App = () => {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    sortBy: 'Wszystkie',
    functions: 'Wszystkie',
    energyClass: 'Wszystkie',
    volume: 'Wszystkie',
  })
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  return (
    <>
      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <FiltersBar filters={filters} setFilters={setFilters} />
    </>
  )
}
