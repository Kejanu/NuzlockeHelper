package de.kejanu.model.pokemon;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class PokemonCaughtRepository implements PanacheRepositoryBase<DbPokemonCaught, UUID> {

    public List<DbPokemonCaught> findByRunId(UUID runId) {
//        return list("run.id", runId.toString());
        PanacheQuery<DbPokemonCaught> dbPokemonCaughtPanacheQuery = find("run.id", runId);

        return dbPokemonCaughtPanacheQuery.list();
    }

    public List<DbPokemonCaught> getAll() {
        return listAll();
    }
}
