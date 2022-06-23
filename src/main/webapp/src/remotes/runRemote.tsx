import {Run} from "./shared";

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
}