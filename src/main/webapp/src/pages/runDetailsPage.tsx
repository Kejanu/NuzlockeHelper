import React, {FC, Fragment, useEffect, useState} from 'react';
import Button from "../components/button";
import {Encounter, Run} from "../remotes/shared";
import {runRemote} from "../remotes/runRemote";
import {useParams} from "react-router-dom";
import EncounterComponent from "../components/Encounter";

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

    function updateEncounterRoute(encounterId: string, routeId: string) {
        if (run) {
            runRemote.updateEncounter(run?.id, encounterId, routeId)
                .then(() => {
                    fetchRun();
                })
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
                                updateEncounterRoute={updateEncounterRoute}
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