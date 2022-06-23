package de.kejanu.model.pokemon;

import de.kejanu.model.pokemon.DbPokemon;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class PokemonRepository implements PanacheRepository<DbPokemon> {

    public List<DbPokemon> filtered(String searchTerm) {
        String likeTerm = "%" + searchTerm + "%";
        PanacheQuery<DbPokemon> filteredMons = find("LOWER(name) LIKE LOWER(?1) ORDER BY name", likeTerm);
        filteredMons.range(0, 6);
        return filteredMons.list();
    }

    public List<DbPokemon> getAll() {
        return listAll();
    }
}
