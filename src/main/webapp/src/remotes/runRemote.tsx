import {Run, RunRoute} from "./shared";

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
    updateEncounter: (runId: string, encounterId: string, routeId: string): Promise<RunRoute> => {
        return fetch(`/runs/${runId}/encounters/${encounterId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                routeId: routeId
            })
        })
            .then(response => {
                return response.json();
            })
    },
}