package de.kejanu.model.run;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import liquibase.pro.packaged.D;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.swing.text.html.parser.Entity;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@ApplicationScoped
public class RunService {

    @Inject
    EntityManager entityManager;

    public DbRun createRun(String name) {
        DbRun dbRun = new DbRun();
        dbRun.setName(name);
        entityManager.persist(dbRun);
        return dbRun;
    }
}
