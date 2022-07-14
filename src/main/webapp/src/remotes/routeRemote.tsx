import {Pokemon, Route} from "./shared";


export const routeRemote = {
    getRoutes: (searchTerm: string): Promise<Route[]> => {
        return fetch(`/routes/?search=${searchTerm}`)
            .then(response => {
                return response.json();
            });
    }
}