package de.kejanu.model.run;

import de.kejanu.model.account.DbAccount;
import de.kejanu.model.pokemon.DbPokemon;
import de.kejanu.model.pokemon.DbPokemonCaught;
import de.kejanu.model.pokemon.PokemonCaughtRepository;
import de.kejanu.model.route.DbRoute;
import de.kejanu.util.Serializer;
import io.quarkus.panache.common.Sort;
import org.openapitools.api.RunsApi;
import org.openapitools.model.*;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

public class RunResource implements RunsApi {

    @Inject
    RunRepository runRepository;

    @Inject
    RunService runService;

    @Inject
    PokemonCaughtRepository pokemonCaughtRepository;

    @Override
    public List<RunDto> getAllRuns() {
        return runRepository.listAll(Sort.descending("created_at"))
            .stream()
            .map(Serializer::serializeRunToRunDto)
            .toList();
    }

    @Override
    public RunDetailsDto getRunByName(String runName) {
        return serializeRunToDetailsDto(runRepository.findByName(runName));
    }

    @Override
    public RunDto createRun(CreateRunRequestDto createRunRequestDto) {
        DbRun dbRun = runService.createRun(createRunRequestDto.getName());
        return Serializer.serializeRunToRunDto(dbRun);
    }

    private RunDetailsDto serializeRunToDetailsDto(DbRun dbRun) {
        List<DbPokemonCaught> dbPokemonCaughtList = pokemonCaughtRepository.findByRunId(dbRun.getId());

        RunDetailsDto runDetailsDto = new RunDetailsDto();

        RunDto runDto = new RunDto()
            .id(dbRun.getId().toString())
            .name(dbRun.getName());
        runDetailsDto.setRun(runDto);

        List<DbRoute> dbRouteList = dbPokemonCaughtList.stream().map(DbPokemonCaught::getRoute).distinct().toList();

        // Create the Routes
        List<RouteDto> routeDtoList = new ArrayList<>();
        for ( DbRoute dbRoute : dbRouteList ) {
            RouteDto routeDto = new RouteDto()
                .id(dbRoute.getId().toString())
                .name(dbRoute.getName())
                .pokemons(new ArrayList<>());

            routeDtoList.add(routeDto);
        }

        runDetailsDto.setRoutes(routeDtoList);

        for ( DbPokemonCaught dbPokemonCaught : dbPokemonCaughtList ) {
            // Set Caught By Account
            DbAccount account = dbPokemonCaught.getCaughtBy();
            AccountDto accountDto = new AccountDto()
                .id(account.getId().toString())
                .name(account.getName());

            CaughtPokemonDto caughtPokemonDto = new CaughtPokemonDto()
                .id(dbPokemonCaught.getId().toString())
                .caughtBy(accountDto)
                // Set the caught Pokemon
                .pokemon(serializePokemon(dbPokemonCaught.getPokemon()));

            routeDtoList
                .stream()
                .filter(r -> r.getId().equals(dbPokemonCaught.getRoute().getId().toString()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("This shouldn't happen"))
                .getPokemons()
                .add(caughtPokemonDto);
        }

        return runDetailsDto;
    }

    private PokemonDto serializePokemon(DbPokemon dbPokemon) {
        return new PokemonDto().id(dbPokemon.getId().toString())
            .name(dbPokemon.getName())
            .type1(dbPokemon.getType1().getName())
            .type2(dbPokemon.getType2() != null ? dbPokemon.getType2().getName() : null);
    }
}
