import React, {FC} from "react";
import {Encounter, EncounterPokemon} from "../remotes/shared";
import PokemonSelect from "./PokemonSelect";
import SearchSelect from "./SearchSelect";
import {routeRemote} from "../remotes/routeRemote";
import Button from "./button";
import {InTeamIcon} from "./Icons";

interface Props {
    updateEncounterRoute: (encounterId: string, value: string,) => void;
    encounter: Encounter;
}

const EncounterComponent: FC<Props> = (props: Props) => {

    return (
        <>
            <div className={'tw-col-span-1'}>
                <SearchSelect
                    onBlur={(routeId: string) => props.updateEncounterRoute(props.encounter.id, routeId)}
                    initialValue={props.encounter.route}
                    fetchFilteredValues={routeRemote.getRoutes}
                />
            </div>
            {props.encounter.encounterPokemons.map((encounterPokemon: EncounterPokemon, j: number) => (
                <div key={j} className={'tw-col-span-2'}>
                    <PokemonSelect/>
                </div>
            ))}
            <div className={'tw-col-span-2'}>
                <Button onClick={() => {
                }}>
                    <InTeamIcon/>
                </Button>
            </div>
        </>
    );
}

export default EncounterComponent;