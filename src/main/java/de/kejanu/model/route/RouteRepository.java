package de.kejanu.model.route;

import de.kejanu.model.pokemon.DbPokemon;
import de.kejanu.model.type.DbType;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class RouteRepository implements PanacheRepository<DbRoute> {

    public List<DbRoute> filtered(String searchTerm) {
        String likeTerm = "%" + searchTerm + "%";
        PanacheQuery<DbRoute> filteredRoutes = find("LOWER(name) LIKE LOWER(?1) ORDER BY name", likeTerm);
        filteredRoutes.range(0, 6);
        return filteredRoutes.list();
    }

    public DbRoute findByName(String name) {
        return find("name", name).firstResult();
    }

    public List<DbRoute> getAll() {
        return listAll();
    }
}
