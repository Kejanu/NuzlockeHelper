import React, {FC} from "react";
import RouteSelect from "./RouteSelect";
import {Encounter, EncounterPokemon} from "../remotes/shared";
import PokemonSelect from "./PokemonSelect";
import {runRemote} from "../remotes/runRemote";

interface Props {
    updateEncounterRoute: (encounterId: string, value: string,) => void;
    encounter: Encounter;
}

const EncounterComponent: FC<Props> = (props: Props) => {

    return (
        <>
            <div className={'tw-col-span-1'}>
                <RouteSelect
                    route={props.encounter.route}
                    onBlur={(routeId: string) => props.updateEncounterRoute(props.encounter.id, routeId)}/>
            </div>
            {props.encounter.encounterPokemons.map((encounterPokemon: EncounterPokemon, j: number) => (
                <div key={j} className={'tw-col-span-2'}>
                    <PokemonSelect/>
                    {/*<input defaultValue={pokemon.name} onChange={e => handleInputChange()} onBlur={e => updateRoutes(e.target.value, i, j)}/>*/}
                </div>
            ))}
        </>
    );
}

export default EncounterComponent;