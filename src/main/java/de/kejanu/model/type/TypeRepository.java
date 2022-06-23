package de.kejanu.model.type;

import de.kejanu.model.type.DbType;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class TypeRepository implements PanacheRepository<DbType> {

    public DbType findByName(String name) {
        return find("name", name).firstResult();
    }

    public List<DbType> getAll() {
        return listAll();
    }
}
