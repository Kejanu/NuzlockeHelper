import React, {FC, Fragment, useEffect, useState} from 'react';
import Button from "../components/button";
import produce from "immer";
import PokemonSelect from "../components/PokemonSelect";
import {RunRoute, Run, User, Pokemon} from "../remotes/shared";
import {runRemote} from "../remotes/runRemote";
import {useParams} from "react-router-dom";
import RouteSelect from "../components/RouteSelect";

interface Props {
    // runName: string;
}

const RunDetailsPage: FC<Props> = (props: Props) => {

    const {runName} = useParams();
    const [run, setRun] = useState<Run>({} as Run);

    useEffect(() => {
        runRemote.getRunByName(runName!)
            .then(setRun)
            .catch(console.log);
    }, [runName]);


    function addRoute() {
        // setRoutes(produce((draft: Route[]) => {
        //     draft[i].pokemons[j].name = value;
        // }));
        setRun(produce((draft: Run) => {
            draft.routes.push({
                name: "KEKW",
                pokemons: [null, null, null]
            });
        }));
    }

    const [testInput, setTestInput] = useState("");
    const [showPokemon, setShowPokemon] = useState(false);
    // const [players, setPlayers] = useState<User[]>(initPlayers);

    useEffect(() => {
        setShowPokemon(!!testInput);
    }, [testInput, setShowPokemon]);

    const handleInputChange = () => {
        console.log("CHANGED");
    }

    return (
        <div className={'tw-grid tw-grid-cols-1'}>
            <div className={'tw-col-span-1'}>
                <div className={'tw-grid tw-grid-cols-7 tw-gap-4'}>
                    <div className={'tw-col-span-1'}>
                        Route
                    </div>
                    <div className={'tw-col-span-2'}>
                        Aaron
                    </div>
                    <div className={'tw-col-span-2'}>
                        Till
                    </div>
                    <div className={'tw-col-span-2'}>
                        Kevin
                    </div>
                    {run?.routes?.map((route, i) => (
                        <Fragment key={i}>
                            <div className={'tw-col-span-1'}>
                                <RouteSelect/>
                            </div>
                            {route.pokemons.map((pokemon, j) => (
                                <div key={`${i}${j}`} className={'tw-col-span-2'}>
                                    <PokemonSelect/>
                                    {/*<input defaultValue={pokemon.name} onChange={e => handleInputChange()} onBlur={e => updateRoutes(e.target.value, i, j)}/>*/}
                                </div>
                            ))}

                        </Fragment>
                    ))}
                </div>

                <Button onClick={addRoute}>
                    +
                </Button>
            </div>
            {/*<div className={'tw-col-span-1'}>*/}
            {/*    SEARCH HERE*/}
            {/*</div>*/}
        </div>
    )
}

export default RunDetailsPage;