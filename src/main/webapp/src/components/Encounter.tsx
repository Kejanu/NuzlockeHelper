import React, {FC} from "react";
import {Account, Encounter, EncounterPokemon} from "../remotes/shared";
import PokemonSelect from "./PokemonSelect";
import SearchSelect from "./SearchSelect";
import {routeRemote} from "../remotes/routeRemote";
import Button from "./button";
import {InTeamIcon} from "./Icons";

interface Props {
    updateEncounter: (encounterId: string, routeId: string, inTeam: boolean) => void;
    updateEncounterPokemon: (encounterId: string, encounterPokemonId: string, pokemonId: string) => void;
    encounter: Encounter;
    accounts: Account[];
}

const EncounterComponent: FC<Props> = (props: Props) => {

    const accountIds = props.accounts.map(acc => acc.id);

    const sortedEncounters = props
        .encounter
        .encounterPokemons
        .slice()
        .sort((a, b) => {
            return accountIds.indexOf(a.caughtBy.id) - accountIds.indexOf(b.caughtBy.id)
        });

    return (
        <div className={'tw-grid tw-grid-cols-12'}>
            <div className={'tw-col-span-2 tw-p-1'}>
                <SearchSelect
                    onBlur={(routeId: string) => props.updateEncounter(props.encounter.id, routeId, props.encounter.inTeam)}
                    initialValue={props.encounter.route}
                    fetchFilteredValues={routeRemote.getRoutes}
                />
            </div>
            {sortedEncounters.map((encounterPokemon: EncounterPokemon, j: number) => (

                <div key={j} className={'tw-col-span-3'}>
                    <PokemonSelect
                        pokemon={encounterPokemon.pokemon}
                        updatePokemon={(pokemonId: string) => props.updateEncounterPokemon(
                            props.encounter.id,
                            encounterPokemon.id,
                            pokemonId
                        )}
                    />
                </div>
            ))}
            <div className={'tw-col-span-1'}>
                <Button className={props.encounter.inTeam ? 'tw-bg-green-600' : ''} onClick={() => {
                    props.updateEncounter(props.encounter.id, props.encounter.route?.id ?? null, !props.encounter.inTeam)
                }}>
                    <InTeamIcon/>
                </Button>
            </div>
        </div>
    );
}

export default EncounterComponent;