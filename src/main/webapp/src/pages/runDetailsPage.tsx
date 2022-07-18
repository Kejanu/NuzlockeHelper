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

    const emptyRun = {
        accounts: [],
        encounters: []
    };

    const {runName} = useParams();
    const [run, setRun] = useState<Run>(emptyRun as any);

    useEffect(() => {
        fetchRun();
    }, [runName]);

    function fetchRun() {
        runRemote.getRunByName(runName!)
            .then((run: Run) => {
                setRun(run);
            })
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

    return (
        <div>
            <div className={'tw-grid tw-grid-cols-12 tw-gap-1'}>
                <div className={'tw-col-span-2'}>
                    Route
                </div>

                {run.accounts.map(account =>
                    <div key={account.id} className={'tw-col-span-3'}>
                        {account.name}
                    </div>
                )}
                <div className={'tw-col-span-1'}>
                    Actions
                </div>
                {run.encounters.map((encounter: Encounter, i: number) => {
                    return (<Fragment key={i}>
                            <div className={'tw-col-span-12'}>
                                <EncounterComponent
                                    key={i}
                                    accounts={run.accounts}
                                    encounter={encounter}
                                    updateEncounter={updateEncounter}
                                    updateEncounterPokemon={updateEncounterPokemon}
                                />
                            </div>
                        </Fragment>
                    )
                })}
            </div>

            <Button onClick={addRoute}>
                +
            </Button>
        </div>
    )
}

export default RunDetailsPage;