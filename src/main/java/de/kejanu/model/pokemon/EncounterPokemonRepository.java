package de.kejanu.model.pokemon;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Sort;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class EncounterPokemonRepository implements PanacheRepository<DbEncounterPokemon> {
    public List<DbEncounterPokemon> findByRunId(UUID runId) {

        PanacheQuery<DbEncounterPokemon> dbEncounterPokemonPanacheQuery = find(
            "encounter.run.id",
            Sort.ascending("encounter.createdAt"),
            runId
        );

        return dbEncounterPokemonPanacheQuery.list();
    }

    public List<DbEncounterPokemon> findByEncounterId(UUID encounterId) {

        PanacheQuery<DbEncounterPokemon> dbEncounterPokemonPanacheQuery = find(
            "encounter.id",
            Sort.ascending("encounter.createdAt"),
            encounterId
        );

        return dbEncounterPokemonPanacheQuery.list();
    }
}
