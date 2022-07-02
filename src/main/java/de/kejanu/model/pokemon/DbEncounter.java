package de.kejanu.model.pokemon;

import de.kejanu.model.route.DbRoute;
import de.kejanu.model.run.DbRun;
import de.kejanu.util.BaseEntity;

import javax.persistence.*;
import java.util.UUID;

@Entity (name = "encounter")
public class DbEncounter extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "route")
    private DbRoute route;

    @ManyToOne
    @JoinColumn(name = "run")
    private DbRun run;

    @Column(name = "in_team")
    private boolean inTeam;

    @Column(name = "dead")
    private boolean dead;


    public DbRoute getRoute() {
        return route;
    }

    public void setRoute(DbRoute route) {
        this.route = route;
    }

    public DbRun getRun() {
        return run;
    }

    public void setRun(DbRun run) {
        this.run = run;
    }

    public boolean isInTeam() {
        return inTeam;
    }

    public void setInTeam(boolean inTeam) {
        this.inTeam = inTeam;
    }

    public boolean isDead() {
        return dead;
    }

    public void setDead(boolean dead) {
        this.dead = dead;
    }
}
