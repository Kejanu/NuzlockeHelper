import {Encounter, EncounterPokemon, Run, RunRoute} from "./shared";

export const runRemote = {

    getRuns: (): Promise<Run[]> => {
        return fetch(`/runs`, {
            method: 'GET'
        })
            .then(response => {
                return response.json();
            });
    },
    getRunByName: (runName: string): Promise<Run> => {
        return fetch(`/runs/${runName}`, {
            method: 'GET'
        })
            .then(response => {
                return response.json();
            });
    },
    createRun: (runName: string): Promise<Run> => {
        return fetch(`/runs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: runName
            })
        })
            .then(response => {
                return response.json();
            });
    },
    createEncounter: (runId: string): Promise<RunRoute> => {
        return fetch(`/runs/${runId}/encounters`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                return response.json();
            })
    },
    updateEncounter: (runId: string, encounterId: string, routeId: string, inTeam: boolean): Promise<Encounter> => {
        return fetch(`/runs/${runId}/encounters/${encounterId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                routeId: routeId,
                inTeam: inTeam
            })
        })
            .then(response => {
                return response.json();
            })
    },
    updateEncounterPokemon: (runId: string, encounterId: string, encounterPokemonId: string, pokemonId: string): Promise<EncounterPokemon> => {
        return fetch(`/runs/${runId}/encounters/${encounterId}/${encounterPokemonId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pokemonId: pokemonId
            })
        })
            .then(response => {
                return response.json();
            })
    },
}