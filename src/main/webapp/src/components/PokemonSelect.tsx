import React, {useEffect, useState} from 'react';
import {pokemonRemote} from "../remotes/pokemonRemote";
import {useDebounce} from "react-use";
import {Pokemon} from "../remotes/shared";

interface Props {

}

const PokemonSelect = (props: Props) => {

    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
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

    const handleOnSelectionClicked = (pokemonId: string) => {
        setFetchAgain(false);
        setFilteredPokemon([]);

        const foundPokemon = filteredPokemon.filter(p => p.id === pokemonId)[0];
        setSelectedPokemon(foundPokemon);
        setPokemonName(foundPokemon.name);
    };

    const handleOnInputChanged = (pokemonName: string) => {
        setPokemonName(pokemonName);
        setFetchAgain(true);
    }

    return (
        <div className={'tw-grid tw-grid-cols-4 tw-border tw-rounded tw-p-1'}>
            <div className={'tw-col-span-2 tw-relative'}>
                <input
                    className={'tw-border tw-rounded tw-w-full tw-p-2' + ' ' +
                        ' tw-text-white tw-bg-neutral-700 focus:tw-outline-white'
                    }
                    value={pokemonName}
                    onChange={e => handleOnInputChanged(e.target.value)}/>
                <div className={'tw-absolute tw-mt-1 tw-w-full'}>
                    {filteredPokemon.map(p => (
                        <div
                            className={'tw-border tw-border-red-700 tw-p-2 tw-rounded tw-bg-neutral-700 tw-text-white tw-cursor-pointer ' +
                                'hover:tw-bg-neutral-500'
                            }
                            key={p.name}
                            onClick={e => handleOnSelectionClicked(p.id)}>
                            {p.name}
                        </div>
                    ))}
                </div>
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