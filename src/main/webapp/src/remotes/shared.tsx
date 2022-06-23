export interface Account {
    id: string;
    name:string;
}

export interface RunRoute {
    name: string;
    pokemons: Pokemon[] | null[];
}

export interface Run {
    id: string;
    name: string;
    createdAt: number;
    accounts: Account[]
    routes: RunRoute[];
}

export interface Pokemon {
    id: string;
    name: string;
    type1: string;
    type2: string;
}

export interface User {
    name: string;
}

