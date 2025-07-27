import './FiltersBar.css'
import type { Filters, FilterKey } from '../../types/types'

const FILTER_OPTIONS = {
    sortBy: [
        'Wszystkie',
        'Cena rosnąco',
        'Cena malejąco',
        'Pojemność rosnąco',
        'Pojemność malejąco'
    ] as const,
    functions: [
        'Wszystkie',
        'Drzwi AddWash',
        'Panel AI Control',
        'Silnik inwerterowy',
        'Wyświetlacz elektroniczny',
    ] as const,
    energyClass: ['Wszystkie', 'A', 'B', 'C', 'D', 'E', 'F'] as const,
    volume: ['Wszystkie', '8kg', '9kg', '10.5kg'] as const,
}

interface Props {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const FiltersBar = ({ filters, setFilters }: Props) => {
    const handleFilterChange = (filterName: FilterKey) =>
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilters(prev => ({
                ...prev,
                [filterName]: e.target.value
            }));
        }

    const getFilterLabel = (filterKey: FilterKey): string => {
        switch (filterKey) {
            case 'sortBy': return 'Sortuj po';
            case 'functions': return 'Funkcje';
            case 'energyClass': return 'Klasa energetyczna';
            case 'volume': return 'Pojemność';
            default: return filterKey;
        }
    }

    return (
        <div className='filters-bar-container'>
            {(Object.keys(FILTER_OPTIONS) as FilterKey[]).map((filterKey) => (
                <div key={filterKey} className='filter-wrapper'>
                    <label htmlFor={`${filterKey}-select`}>
                        {getFilterLabel(filterKey)}:
                    </label>
                    <br />
                    <select
                        id={`${filterKey}-select`}
                        value={filters[filterKey]}
                        onChange={handleFilterChange(filterKey)}
                    >
                        {FILTER_OPTIONS[filterKey].map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    )
}
