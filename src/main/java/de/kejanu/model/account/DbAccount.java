package de.kejanu.model.account;

import de.kejanu.model.run.DbRun;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity( name = "account" )
public class DbAccount {

    @Id
    @GeneratedValue
    private UUID id;

    @Column( name = "name" )
    private String name;

    @ManyToMany
    @JoinTable(
            name = "account_run",
            joinColumns = {@JoinColumn( name = "account" )},
            inverseJoinColumns = {@JoinColumn( name = "run" )}
    )
    private Set<DbRun> runs;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<DbRun> getRuns() {
        return runs;
    }

    public void setRuns(Set<DbRun> runs) {
        this.runs = runs;
    }

    public UUID getId() {
        return id;
    }
}
