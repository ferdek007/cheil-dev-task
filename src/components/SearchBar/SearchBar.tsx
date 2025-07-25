import './SearchBar.css'

interface Props {
    search: string
    setSearch: (value: string) => void
}

export const SearchBar = ({ search, setSearch }: Props) => {
    return (
        <input
            className="search-input"
            type="text"
            placeholder="Szukaj..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}
