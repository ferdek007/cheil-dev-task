import './FiltersBar.css'

interface Props {
    filters: {
        sortBy: string;
        functions: string;
        energyClass: string;
        volume: string;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            sortBy: string;
            functions: string;
            energyClass: string;
            volume: string;
        }>
    >;
}

const FILTER_OPTIONS = {
    sortBy: ['Wszystkie', 'Cena', 'Pojemność'],
    functions: [
        'Wszystkie',
        'Drzwi AddWash',
        'Panel AI Control',
        'Silnik inwerterowy',
        'Wyświetlacz elektroniczny',
    ],
    energyClass: ['Wszystkie', 'A', 'B', 'C', 'D', 'E', 'F'],
    volume: ['Wszystkie', '9kg', '8kg', '10.5kg'],
};

export const FiltersBar = ({ filters, setFilters }: Props) => {
    return (
        <div className="filters-container">
            <div>
                <label htmlFor='sort-by-select'>Sortuj po:</label>
                <br />
                <select id='sort-by-select'
                    value={filters.sortBy}
                    onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
                >
                    {FILTER_OPTIONS.sortBy.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='functions-select'>Funkcje:</label>
                <br />
                <select id='functions-select'
                    value={filters.functions}
                    onChange={(e) => setFilters((f) => ({ ...f, functions: e.target.value }))}
                >
                    {FILTER_OPTIONS.functions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt === 'Wszystkie' ? 'Wszystkie' : opt}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='energy-class-select'>Klasa energetyczna:</label>
                <br />
                <select id='energy-class-select'
                    value={filters.energyClass}
                    onChange={(e) => setFilters((f) => ({ ...f, energyClass: e.target.value }))}
                >
                    {FILTER_OPTIONS.energyClass.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='volume-select'>Pojemność:</label>
                <br />
                <select id='volume-select'
                    value={filters.volume}
                    onChange={(e) => setFilters((f) => ({ ...f, volume: e.target.value }))}
                >
                    {FILTER_OPTIONS.volume.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div >
    );
};
