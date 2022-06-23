import {Pokemon} from "./shared";


export const pokemonRemote = {

    getPokemon: (searchTerm: string): Promise<Pokemon[]> => {
        return fetch(`/pokemon/?search=${searchTerm}`)
            .then(response => {
                return response.json();
            });
    }

}