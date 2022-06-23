package de.kejanu.model.run;

import de.kejanu.model.account.DbAccount;
import de.kejanu.util.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Entity (name = "run")
public class DbRun extends BaseEntity {

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "runs")
    private Set<DbAccount> accounts;

    public Set<DbAccount> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<DbAccount> accounts) {
        this.accounts = accounts;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
