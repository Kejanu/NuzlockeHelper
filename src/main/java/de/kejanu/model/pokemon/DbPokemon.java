package de.kejanu.model.pokemon;

import de.kejanu.model.type.DbType;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity (name = "pokemon")
public class DbPokemon {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "type1")
    private DbType type1;

    @ManyToOne
    @JoinColumn(name = "type2")
    private DbType type2;

    @Column(name = "weight")
    private BigDecimal weight;

    @Column(name = "height")
    private BigDecimal height;

    @Column(name = "base_happiness")
    private int baseHappiness;

    @Column(name = "hp")
    private int hp;

    @Column(name = "attack")
    private int attack;

    @Column(name = "defense")
    private int defense;

    @Column(name = "sp_attack")
    private int spAttack;

    @Column(name = "sp_defense")
    private int spDefense;

    @Column(name = "speed")
    private int speed;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DbType getType1() {
        return type1;
    }

    public void setType1(DbType type1) {
        this.type1 = type1;
    }

    public DbType getType2() {
        return type2;
    }

    public void setType2(DbType type2) {
        this.type2 = type2;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public BigDecimal getHeight() {
        return height;
    }

    public void setHeight(BigDecimal height) {
        this.height = height;
    }

    public int getBaseHappiness() {
        return baseHappiness;
    }

    public void setBaseHappiness(int baseHappiness) {
        this.baseHappiness = baseHappiness;
    }

    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public int getAttack() {
        return attack;
    }

    public void setAttack(int attack) {
        this.attack = attack;
    }

    public int getDefense() {
        return defense;
    }

    public void setDefense(int defense) {
        this.defense = defense;
    }

    public int getSpAttack() {
        return spAttack;
    }

    public void setSpAttack(int spAttack) {
        this.spAttack = spAttack;
    }

    public int getSpDefense() {
        return spDefense;
    }

    public void setSpDefense(int spDefense) {
        this.spDefense = spDefense;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public UUID getId() {
        return id;
    }
}
