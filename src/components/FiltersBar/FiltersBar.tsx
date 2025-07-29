import './FiltersBar.css'
import type { Filters, FilterKey } from '../../types/types'
import { SORT_OPTIONS, FUNCTION_OPTIONS, ENERGY_CLASS_OPTIONS, VOLUME_OPTIONS } from '../../constants'
import { useState } from 'react'

const FILTER_OPTIONS = {
    sortBy: [
        SORT_OPTIONS.ALL,
        SORT_OPTIONS.PRICE_ASC,
        SORT_OPTIONS.PRICE_DESC,
        SORT_OPTIONS.VOLUME_ASC,
        SORT_OPTIONS.VOLUME_DESC,
    ] as const,
    functions: [
        FUNCTION_OPTIONS.ALL,
        FUNCTION_OPTIONS.ADD_WASH_DOOR,
        FUNCTION_OPTIONS.PANEL_AI_CONTROL,
        FUNCTION_OPTIONS.INVERTER_DUTY_MOTOR,
        FUNCTION_OPTIONS.ELECTRONIC_DISPLAY,
    ] as const,
    energyClass: [
        ENERGY_CLASS_OPTIONS.ALL,
        ENERGY_CLASS_OPTIONS.A,
        ENERGY_CLASS_OPTIONS.B,
        ENERGY_CLASS_OPTIONS.C,
        ENERGY_CLASS_OPTIONS.D,
        ENERGY_CLASS_OPTIONS.E,
        ENERGY_CLASS_OPTIONS.F,
    ] as const,
    volume: [
        VOLUME_OPTIONS.ALL,
        VOLUME_OPTIONS.KG_8,
        VOLUME_OPTIONS.KG_9,
        VOLUME_OPTIONS.KG_10_5,
    ] as const,
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
