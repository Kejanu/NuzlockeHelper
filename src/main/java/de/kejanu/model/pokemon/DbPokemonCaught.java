package de.kejanu.model.pokemon;

import de.kejanu.model.account.DbAccount;
import de.kejanu.model.account.DbAccountRun;
import de.kejanu.model.route.DbRoute;
import de.kejanu.model.run.DbRun;

import javax.persistence.*;
import java.util.UUID;

@Entity (name = "pokemon_caught")
public class DbPokemonCaught {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "run")
    private DbRun run;

    @ManyToOne
    @JoinColumn(name = "caught_by")
    private DbAccount caughtBy;

    @ManyToOne
    @JoinColumn(name = "pokemon")
    private DbPokemon pokemon;

    @ManyToOne
    @JoinColumn(name = "route")
    private DbRoute route;

    public DbRun getRun() {
        return run;
    }

    public void setRun(DbRun run) {
        this.run = run;
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

    public DbRoute getRoute() {
        return route;
    }

    public void setRoute(DbRoute route) {
        this.route = route;
    }

    public UUID getId() {
        return id;
    }
}
