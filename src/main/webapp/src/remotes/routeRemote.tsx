import {Pokemon} from "./shared";
import {Route} from "../components/RouteSelect";


export const routeRemote = {
    getRoutes: (searchTerm: string): Promise<Route[]> => {
        return fetch(`/routes/?search=${searchTerm}`)
            .then(response => {
                return response.json();
            });
    }
}