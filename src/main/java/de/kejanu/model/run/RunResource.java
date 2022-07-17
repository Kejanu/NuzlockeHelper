package de.kejanu.model.run;

import de.kejanu.core.Errors;
import de.kejanu.core.ServiceException;
import de.kejanu.model.pokemon.DbEncounter;
import de.kejanu.model.pokemon.DbEncounterPokemon;
import de.kejanu.model.pokemon.DbPokemon;
import de.kejanu.model.pokemon.EncounterPokemonRepository;
import de.kejanu.model.route.DbRoute;
import de.kejanu.model.route.RouteRepository;
import de.kejanu.util.DtoMapper;
import de.kejanu.util.Strings;
import io.quarkus.panache.common.Sort;
import org.openapitools.api.RunsApi;
import org.openapitools.model.*;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Transactional
public class RunResource implements RunsApi {

    @Inject
    EntityManager entityManager;

    @Inject
    RunRepository runRepository;

    @Inject
    RunService runService;

    @Inject
    EncounterPokemonRepository encounterPokemonRepository;

    @Inject
    DtoMapper dtoMapper;

    @Inject
    RouteRepository routeRepository;

    @Override
    public List<RunDto> getAllRuns() {
        return runRepository.listAll(Sort.descending("created_at"))
            .stream()
            .map(run -> dtoMapper.mapToRunDto(run))
            .toList();
    }

    @Override
    public RunDto getRunByName(String runName) {
        return dtoMapper.mapToRunDto(runRepository.findByName(runName));
    }

    @Override
    public RunDto createRun(CreateRunRequestDto createRunRequestDto) {
        DbRun dbRun = runService.createRun(createRunRequestDto.getName());
        return dtoMapper.mapToRunDto(dbRun);
    }

    @Override
    public EncounterDto updateEncounter(String runId, String encounterId, UpdateEncounterDto updateEncounterDto) {
        DbEncounter dbEncounter = entityManager.find(DbEncounter.class, UUID.fromString(encounterId));
        if ( dbEncounter == null ) {
            throw new ServiceException("");
        }

        if ( !Strings.isBlank(updateEncounterDto.getRouteId()) ) {
            DbRoute dbRoute = entityManager.find(DbRoute.class, UUID.fromString(updateEncounterDto.getRouteId()));
            if ( dbRoute == null ) {
                throw new ServiceException("");
            }
            dbEncounter.setRoute(dbRoute);
        }

        dbEncounter.setInTeam(updateEncounterDto.getInTeam() != null && updateEncounterDto.getInTeam());

        return mapToEncounterDto(dbEncounter);
    }

    @Override
    public EncounterPokemonDto updateEncounterPokemon(
        String runId,
        String encounterId,
        String encounterPokemonId,
        UpdateEncounterPokemonDto updateEncounterPokemonDto
    ) {
        DbEncounterPokemon dbEncounterPokemon = entityManager.find(DbEncounterPokemon.class, UUID.fromString(encounterPokemonId));

        DbPokemon dbPokemon = entityManager.find(DbPokemon.class, UUID.fromString(updateEncounterPokemonDto.getPokemonId()));
        if (dbPokemon == null) {
            throw new ServiceException("");
        }

        dbEncounterPokemon.setPokemon(dbPokemon);
        return mapToEncounterPokemonDto(dbEncounterPokemon);
    }

    @Override
    public RouteDto createEncounter(String runId) {
        DbRun dbRun = entityManager.find(DbRun.class, UUID.fromString(runId));
        if ( dbRun == null ) {
            throw Errors.runNotFound(runId);
        }

        DbEncounter dbEncounter = new DbEncounter();
        dbEncounter.setRun(dbRun);
        dbEncounter.setRoute(null);
        entityManager.persist(dbEncounter);

        dbRun
            .getAccounts()
            .forEach(dbAccount -> {
                    DbEncounterPokemon dbEncounterPokemon = new DbEncounterPokemon();
                    dbEncounterPokemon.setEncounter(dbEncounter);
                    dbEncounterPokemon.setCaughtBy(dbAccount);
                    entityManager.persist(dbEncounterPokemon);
                }
            );

        return serializeEncounter(dbEncounter);
    }

    private EncounterDto mapToEncounterDto(DbEncounter dbEncounter) {
        List<DbEncounterPokemon> encounterPokemonList = encounterPokemonRepository.findByEncounterId(dbEncounter.getId());

        return new EncounterDto()
            .id(dbEncounter.getId().toString())
            .route(dbEncounter.getRoute() != null ? DtoMapper.serializeRoute(dbEncounter.getRoute()) : null)
            .encounterPokemons(encounterPokemonList.stream().map(this::mapToEncounterPokemonDto).toList())
            .dead(dbEncounter.isDead())
            .inTeam(dbEncounter.isInTeam());
    }

    private EncounterPokemonDto mapToEncounterPokemonDto(DbEncounterPokemon dbEncounterPokemon) {
        return new EncounterPokemonDto()
            .id(dbEncounterPokemon.getId().toString())
            .pokemon(serializePokemon(dbEncounterPokemon.getPokemon()))
            .caughtBy(DtoMapper.serializeAccount(dbEncounterPokemon.getCaughtBy()));
    }

    private RouteDto serializeEncounter(DbEncounter dbEncounter) {
        return new RouteDto()
            .id(dbEncounter.getId().toString())
            .name(dbEncounter.getRoute() != null ? dbEncounter.getRoute().getName() : null)
            .pokemons(new ArrayList<>());
    }

    private PokemonDto serializePokemon(DbPokemon dbPokemon) {
        if ( dbPokemon == null ) {
            return null;
        }

        return new PokemonDto().id(dbPokemon.getId().toString())
            .name(dbPokemon.getName())
            .type1(dbPokemon.getType1().getName())
            .type2(dbPokemon.getType2() != null ? dbPokemon.getType2().getName() : null);
    }
}
