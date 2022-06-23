package de.kejanu.model.account;

import de.kejanu.model.run.DbRun;

import javax.persistence.*;
import java.util.UUID;

@Entity (name = "account_run")
public class DbAccountRun {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "account")
    private DbAccount account;

    @ManyToOne
    @JoinColumn(name = "run")
    private DbRun run;

    public DbAccount getAccount() {
        return account;
    }

    public void setAccount(DbAccount account) {
        this.account = account;
    }

    public DbRun getRun() {
        return run;
    }

    public void setRun(DbRun run) {
        this.run = run;
    }

    public UUID getId() {
        return id;
    }
}
