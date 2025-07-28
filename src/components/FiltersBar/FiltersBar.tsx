import './FiltersBar.css'
import type { Filters, FilterKey } from '../../types/types'
import { useState } from 'react'

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
    const [activeDropdown, setActiveDropdown] = useState<FilterKey | null>(null)

    const handleCustomSelectClick = (filterKey: FilterKey) => {
        setActiveDropdown(activeDropdown === filterKey ? null : filterKey);
    }

    const handleOptionClick = (filterKey: FilterKey, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterKey]: value
        }));
        setActiveDropdown(null);
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

                    <div className={`custom-select ${activeDropdown === filterKey ? 'active' : ''}`}>
                        <div
                            className='custom-select__trigger'
                            onClick={() => handleCustomSelectClick(filterKey)}
                        >
                            <span>{filters[filterKey]}</span>
                        </div>

                        <div className='custom-options'>
                            {FILTER_OPTIONS[filterKey].map(option => (
                                <div
                                    key={option}
                                    className={`custom-option ${filters[filterKey] === option ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(filterKey, option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
