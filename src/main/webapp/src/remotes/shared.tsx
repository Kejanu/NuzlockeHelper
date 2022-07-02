import {Route} from "../components/RouteSelect";

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
    accounts: Account[];
    encounters: Encounter[];
}

export interface Encounter {
    id: string;
    route: Route;
    encounterPokemons: EncounterPokemon[];
    inTeam: boolean;
    dead: boolean;
}

export interface EncounterPokemon {
    pokemon: Pokemon;
    caughtBy: Account;
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

