package de.kejanu.util;

import de.kejanu.model.account.DbAccount;
import de.kejanu.model.pokemon.DbEncounter;
import de.kejanu.model.pokemon.DbEncounterPokemon;
import de.kejanu.model.pokemon.EncounterPokemonRepository;
import de.kejanu.model.route.DbRoute;
import de.kejanu.model.run.DbRun;
import de.kejanu.model.type.DbType;
import org.openapitools.model.*;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class DtoMapper {

    @Inject
    EncounterPokemonRepository encounterPokemonRepository;

    public static AccountDto serializeAccount(DbAccount dbAccount) {
        return new AccountDto()
            .id(dbAccount.getId().toString())
            .name(dbAccount.getName());
    }

    public static RouteDto serializeRoute(DbRoute dbRoute) {
        if ( dbRoute == null ) {
            return null;
        }

        return new RouteDto()
            .id(dbRoute.getId().toString())
            .name(dbRoute.getName());
    }

    public RunDto mapToRunDto(DbRun dbRun) {
        List<DbEncounterPokemon> encounterPokemonList = encounterPokemonRepository.findByRunId(dbRun.getId());
        LinkedHashMap<DbEncounter, List<DbEncounterPokemon>> dbRouteDbEncounterPokemonMap = encounterPokemonList
            .stream()
            .collect(
                Collectors.groupingBy(
                    DbEncounterPokemon::getEncounter,
                    LinkedHashMap::new,
                    Collectors.toList()
                )
            );

        List<AccountDto> accountDtos = encounterPokemonList
            .stream()
            .map(DbEncounterPokemon::getCaughtBy)
            .distinct()
            .map(DtoMapper::serializeAccount)
            .toList();

        return new RunDto()
            .id(dbRun.getId().toString())
            .name(dbRun.getName())
            .accounts(accountDtos)
            .createdAt(dbRun.getCreatedAt().toEpochMilli())
            .encounters(serializeEncounters(dbRouteDbEncounterPokemonMap));
    }

    public List<EncounterDto> serializeEncounters(Map<DbEncounter, List<DbEncounterPokemon>> dbRouteDbEncounterPokemonMap) {
        return dbRouteDbEncounterPokemonMap
            .keySet()
            .stream()
            .map(
                dbEncounter -> new EncounterDto()
                    .id(dbEncounter.getId().toString())
                    .route(serializeRoute(dbEncounter.getRoute()))
                    .encounterPokemons(
                        dbRouteDbEncounterPokemonMap
                            .get(dbEncounter)
                            .stream()
                            .map(
                                dbEncounterPokemon -> new EncounterPokemonDto()
                                    .id(dbEncounterPokemon.getId().toString())
                                    .pokemon(
                                        dbEncounterPokemon.getPokemon() != null
                                            ? new PokemonDto()
                                            .id(dbEncounterPokemon.getId().toString())
                                            .name(dbEncounterPokemon.getPokemon().getName())
                                            .type1(typeNameOrNull(dbEncounterPokemon.getPokemon().getType1()))
                                            .type2(typeNameOrNull(dbEncounterPokemon.getPokemon().getType2()))
                                            : new PokemonDto()
                                            .id(dbEncounterPokemon.getId().toString())
                                    )
                                    .caughtBy(serializeAccount(dbEncounterPokemon.getCaughtBy()))
                            )
                            .toList()
                    )
                    .dead(dbEncounter.isDead())
                    .inTeam(dbEncounter.isInTeam())
            ).toList();
    }

    private String typeNameOrNull(DbType dbType) {
        return dbType != null ? dbType.getName() : null;
    }
}
