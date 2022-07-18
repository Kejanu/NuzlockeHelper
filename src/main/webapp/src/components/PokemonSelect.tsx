import React, {useEffect, useState} from 'react';
import {pokemonRemote} from "../remotes/pokemonRemote";
import {useDebounce} from "react-use";
import {Pokemon} from "../remotes/shared";
import SearchSelect from "./SearchSelect";
import classNames from "classnames";

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

    useEffect(() => {
        setSelectedPokemon(props.pokemon);
    }, [props.pokemon]);


    const [, cancel] = useDebounce(
        () => {
            setDebouncedValue(pokemonName);
        }, 300, [pokemonName]
    );

    const typeToColor = (type: string | undefined) => {
        switch (type) {
            case 'Normal':
                return 'tw-bg-normal';
            case 'Fire':
                return 'tw-bg-fire';
            case 'Water':
                return 'tw-bg-water';
            case 'Grass':
                return 'tw-bg-grass'
            case 'Electric':
                return 'tw-bg-electric tw-text-black'
            case 'Ice':
                return 'tw-bg-ice'
            case 'Fighting':
                return 'tw-bg-fighting'
            case 'Poison':
                return 'tw-bg-poison'
            case 'Ground':
                return 'tw-bg-ground'
            case 'Flying':
                return 'tw-bg-flying'
            case 'Psychic':
                return 'tw-bg-psychic'
            case 'Bug':
                return 'tw-bg-bug'
            case 'Rock':
                return 'tw-bg-rock'
            case 'Ghost':
                return 'tw-bg-ghost'
            case 'Dragon':
                return 'tw-bg-dragon'
            case 'Dark':
                return 'tw-bg-dark'
            case 'Steel':
                return 'tw-bg-steel'
            case 'Fairy':
                return 'tw-bg-fairy'
        }
        return 'tw-bg-neutral-700';
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
        <div className={'tw-grid tw-grid-cols-4 tw-p-1'}>
            <div className={'tw-col-span-2 tw-relative'}>
                <SearchSelect
                    onBlur={(pokemonId: string) => props.updatePokemon(pokemonId)}
                    initialValue={selectedPokemon}
                    fetchFilteredValues={pokemonRemote.getPokemon}
                />
            </div>
            <div className={'tw-col-span-2'}>
                <div className={`tw-grid tw-h-full tw-grid-cols-2 tw-gap-x-1`}>
                    {selectedPokemon?.type1 && (
                        <div
                            className={classNames([
                                'tw-grid tw-h-full tw-content-center tw-text-center tw-rounded tw-font-medium',
                                typeToColor(selectedPokemon?.type1)
                            ])}>
                            {selectedPokemon?.type1}
                        </div>
                    )}
                    {selectedPokemon?.type2 && (
                        <div
                            className={classNames([
                                'tw-grid tw-h-full tw-content-center tw-text-center tw-rounded tw-font-medium',
                                typeToColor(selectedPokemon?.type2)
                            ])}>
                            {selectedPokemon?.type2}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PokemonSelect;