import React, {FC, Fragment, useEffect, useState} from 'react';
import Button from "../components/button";
import {Encounter, EncounterPokemon, Run} from "../remotes/shared";
import {runRemote} from "../remotes/runRemote";
import {useParams} from "react-router-dom";
import EncounterComponent from "../components/Encounter";
import produce from "immer";

interface Props {

}

const RunDetailsPage: FC<Props> = () => {

    const {runName} = useParams();
    const [run, setRun] = useState<Run>();

    useEffect(() => {
        fetchRun();
    }, [runName]);

    function fetchRun() {
        runRemote.getRunByName(runName!)
            .then(setRun)
            .catch(console.log);
    }

    function addRoute() {
        if (run) {
            runRemote.createEncounter(run.id)
                .then(() => {
                    console.log("Successfully created Route")
                    fetchRun();
                });
        }
    }

    function updateEncounter(encounterId: string, routeId: string, inTeam: boolean) {
        if (run) {
            runRemote.updateEncounter(run?.id, encounterId, routeId, inTeam)
                .then((updatedEncounter: Encounter) => {
                        setRun(produce(draft => {
                            const index = run.encounters.findIndex(encounter => encounter.id === encounterId);
                            if (index !== -1) {
                                if (draft) {
                                    draft.encounters[index] = updatedEncounter;
                                }
                            }
                        }))
                    }
                );
        }
    }

    function updateEncounterPokemon(encounterId: string, encounterPokemonId: string, pokemonId: string) {
        if (run) {
            runRemote.updateEncounterPokemon(run.id, encounterId, encounterPokemonId, pokemonId)
                .then((updatedEncounterPokemon: EncounterPokemon) => {
                    setRun(produce(draft => {
                        const encounterIndex = run.encounters.findIndex(encounter => encounter.id === encounterId);
                        if (encounterIndex !== -1) {
                            const encounterPokemonIndex = run.encounters[encounterIndex]
                                .encounterPokemons
                                .findIndex(ep => ep.id === encounterPokemonId);
                            if (encounterPokemonIndex !== -1) {
                                if (draft) {
                                    draft.encounters[encounterIndex].encounterPokemons[encounterPokemonIndex] = updatedEncounterPokemon;
                                }
                            }
                        }
                    }))
                })
                .catch(console.log)
        }
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
                <div className={'tw-grid tw-grid-cols-9 tw-gap-4'}>
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
                    <div className={'tw-col-span-2'}>
                        Actions
                    </div>
                    {run?.encounters?.map((encounter: Encounter, i: number) => (
                        <Fragment key={i}>
                            <EncounterComponent
                                key={i}
                                encounter={encounter}
                                updateEncounter={updateEncounter}
                                updateEncounterPokemon={updateEncounterPokemon}
                            />
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