package de.kejanu.model.account;

import de.kejanu.model.route.DbRoute;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class AccountRepository implements PanacheRepository<DbAccount> {

    public DbAccount findByName(String name) {
        return find("name", name).firstResult();
    }

    public List<DbAccount> getAll() {
        return listAll();
    }
}
