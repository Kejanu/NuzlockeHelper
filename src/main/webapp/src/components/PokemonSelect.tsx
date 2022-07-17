import React, {useEffect, useState} from 'react';
import {pokemonRemote} from "../remotes/pokemonRemote";
import {useDebounce} from "react-use";
import {Pokemon} from "../remotes/shared";
import SearchSelect from "./SearchSelect";

interface Props {
    pokemon: Pokemon;
    updatePokemon: (pokemonId: string) => void;
}

const PokemonSelect = (props: Props) => {

    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(props.pokemon);
    const [pokemonName, setPokemonName] = useState("");
    const [fetchAgain, setFetchAgain] = useState(false);
    const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
    const [debouncedValue, setDebouncedValue] = useState("");

    const [, cancel] = useDebounce(
        () => {
            setDebouncedValue(pokemonName);
        }, 300, [pokemonName]
    );

    const typeToColor = (type: string | undefined) => {
        switch (type) {
            case 'Water':
                return 'tw-bg-cyan-600';
            case 'Fire':
                return 'tw-bg-red-600';
        }
        return 'tw- bg-neutral-700';
    };

    useEffect(() => {
        if (debouncedValue.length <= 0 || !fetchAgain) {
            return;
        }

        pokemonRemote.getPokemon(debouncedValue)
            .then(pokemonList => {
                setFilteredPokemon(pokemonList);
            })
    }, [debouncedValue]);

    return (
        <div className={'tw-grid tw-grid-cols-4 tw-border tw-rounded tw-p-1'}>
            <div className={'tw-col-span-2 tw-relative'}>
                <SearchSelect
                    onBlur={(pokemonId: string) => props.updatePokemon(pokemonId)}
                    initialValue={selectedPokemon}
                    fetchFilteredValues={pokemonRemote.getPokemon}
                />
            </div>
            <div className={'tw-col-span-2'}>
                <div className={'tw-grid tw-grid-cols-2 tw-gap-x-2 tw-pl-2'}>
                    <div
                        className={'tw-p-2 tw-w-full tw-text-center tw-rounded ' + typeToColor(selectedPokemon?.type1)}>
                        {selectedPokemon?.type1}
                    </div>
                    <div
                        className={'tw-p-2 tw-w-full tw-text-center tw-rounded ' + typeToColor(selectedPokemon?.type2)}>
                        {selectedPokemon?.type2}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonSelect;