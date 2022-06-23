package de.kejanu.model.run;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class RunRepository implements PanacheRepository<DbRun> {

    public DbRun findByName(String name) {
        return find("name", name).firstResult();
    }

    public List<DbRun> getAll() {
        return listAll();
    }
}
