package de.kejanu.model.pokemon;

import de.kejanu.model.account.DbAccount;

import javax.persistence.*;
import java.util.UUID;

@Entity (name = "encounter_pokemon")
public class DbEncounterPokemon {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "encounter")
    private DbEncounter encounter;

    @ManyToOne
    @JoinColumn(name = "caught_by")
    private DbAccount caughtBy;

    @ManyToOne
    @JoinColumn(name = "pokemon")
    private DbPokemon pokemon;

    public UUID getId() {
        return id;
    }

    public DbEncounter getEncounter() {
        return encounter;
    }

    public void setEncounter(DbEncounter encounter) {
        this.encounter = encounter;
    }

    public DbAccount getCaughtBy() {
        return caughtBy;
    }

    public void setCaughtBy(DbAccount caughtBy) {
        this.caughtBy = caughtBy;
    }

    public DbPokemon getPokemon() {
        return pokemon;
    }

    public void setPokemon(DbPokemon pokemon) {
        this.pokemon = pokemon;
    }
}
