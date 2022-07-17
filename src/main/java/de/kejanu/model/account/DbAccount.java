package de.kejanu.model.account;

import de.kejanu.model.run.DbRun;

import javax.persistence.*;
import java.util.Objects;
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
        name = "run_account",
        joinColumns = {@JoinColumn( name = "account" )},
        inverseJoinColumns = {@JoinColumn( name = "run" )}
    )
    private Set<DbRun> runs;

    @Override
    public boolean equals(Object o) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        DbAccount dbAccount = ( DbAccount ) o;
        return Objects.equals(id, dbAccount.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

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
