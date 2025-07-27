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

export type FilterKey = 'sortBy' | 'functions' | 'energyClass' | 'volume';

export interface Filters {
    sortBy: string;
    functions: string;
    energyClass: string;
    volume: string;
}
