export interface Product {
    id: number;
    name: string;
    code: string;
    price_pln: number;
    colour: string;
    volume_kg: number;
    dimensions: {
        width_cm: number;
        height_cm: number;
        length_cm: number;
    };
    energyClass: string;
    addWashDoor: boolean;
    panelAIControl: boolean;
    inverterDutyMotor: boolean;
    electronicDisplay: boolean;
    priceStart: string;
    priceEnd: string;
    instalments: {
        rate: number;
        amount: number;
    };
    image: string;
}

export type FilterKey = 'sortBy' | 'functions' | 'energyClass' | 'volume'

export type SortOption =
    | 'Wszystkie'
    | 'Cena rosnąco'
    | 'Cena malejąco'
    | 'Pojemność rosnąco'
    | 'Pojemność malejąco'

export type FunctionOption =
    | 'Wszystkie'
    | 'Drzwi AddWash'
    | 'Panel AI Control'
    | 'Silnik inwerterowy'
    | 'Wyświetlacz elektroniczny'

export type EnergyClassOption = 'Wszystkie' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
export type VolumeOption = 'Wszystkie' | '8kg' | '9kg' | '10.5kg'

export interface Filters {
    sortBy: SortOption;
    functions: FunctionOption;
    energyClass: EnergyClassOption;
    volume: VolumeOption;
}
