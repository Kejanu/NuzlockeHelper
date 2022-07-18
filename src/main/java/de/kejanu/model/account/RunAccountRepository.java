package de.kejanu.model.account;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Sort;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class RunAccountRepository implements PanacheRepository<DbRunAccount> {

    public List<DbRunAccount> findByRunId(UUID runId) {

        PanacheQuery<DbRunAccount> dbAccountPanacheQuery = find(
            "run.id",
            Sort.ascending("account.name"),
            runId
        );

        return dbAccountPanacheQuery.list();
    }
}
