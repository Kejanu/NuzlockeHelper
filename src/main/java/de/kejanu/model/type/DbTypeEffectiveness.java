package de.kejanu.model.type;

import de.kejanu.model.type.DbType;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity (name = "type_effectiveness")
public class DbTypeEffectiveness {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "attack_type")
    private DbType attackType;

    @ManyToOne
    @JoinColumn(name = "defense_type")
    private DbType defenseType;

    @Column(name = "multiplier")
    private BigDecimal multiplier;

    public DbType getAttackType() {
        return attackType;
    }

    public void setAttackType(DbType attackType) {
        this.attackType = attackType;
    }

    public DbType getDefenseType() {
        return defenseType;
    }

    public void setDefenseType(DbType defenseType) {
        this.defenseType = defenseType;
    }

    public BigDecimal getMultiplier() {
        return multiplier;
    }

    public void setMultiplier(BigDecimal multiplier) {
        this.multiplier = multiplier;
    }

    public UUID getId() {
        return id;
    }
}
