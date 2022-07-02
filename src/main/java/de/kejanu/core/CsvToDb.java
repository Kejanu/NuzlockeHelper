package de.kejanu.core;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import de.kejanu.model.pokemon.*;
import de.kejanu.model.account.AccountRepository;
import de.kejanu.model.account.DbAccount;
import de.kejanu.model.account.DbRunAccount;
import de.kejanu.model.route.RouteRepository;
import de.kejanu.model.run.DbRun;
import de.kejanu.model.type.TypeRepository;
import de.kejanu.model.route.DbRoute;
import de.kejanu.model.type.DbType;
import de.kejanu.model.type.DbTypeEffectiveness;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URL;
import java.util.HashMap;
import java.util.List;

@RequestScoped
public class CsvToDb {

    @Inject
    EntityManager entityManager;

    @Inject
    TypeRepository typeRepository;

    @Inject
    PokemonRepository pokemonRepository;

    @Inject
    RouteRepository routeRepository;

    @Inject
    AccountRepository accountRepository;

    @Inject
    EncounterPokemonRepository encounterPokemonRepository;

    @Transactional
    public void insertSetUp() {
        List<DbEncounterPokemon> all = encounterPokemonRepository.listAll();
        if (all.size() > 0) {
            return;
        }

        DbPokemon squirtle = pokemonRepository.filtered("Squirtle").get(0);
        DbRoute dbRoute = routeRepository.findByName("Starter");
        List<DbAccount> accountList = accountRepository.getAll();

        DbRun dbRun = new DbRun();
        dbRun.setName("ERSTER RUN BOYZ");
        entityManager.persist(dbRun);

        for (DbAccount account : accountList) {
            DbRunAccount dbRunAccount = new DbRunAccount();
            dbRunAccount.setRun(dbRun);
            dbRunAccount.setAccount(account);
            entityManager.persist(dbRunAccount);
        }

        DbEncounter dbEncounter = new DbEncounter();
        dbEncounter.setRoute(dbRoute);
        dbEncounter.setRun(dbRun);
        entityManager.persist(dbEncounter);

        for (DbAccount account : accountList) {
            DbEncounterPokemon dbEncounterPokemon = new DbEncounterPokemon();
            dbEncounterPokemon.setPokemon(squirtle);
            dbEncounterPokemon.setCaughtBy(account);
            dbEncounterPokemon.setEncounter(dbEncounter);
            entityManager.persist(dbEncounterPokemon);
        }
    }

    @Transactional
    public void insertAccountsIntoDb() {
        List<DbAccount> all = accountRepository.getAll();
        if (all.size() > 0) {
            return;
        }

        String[] accounts = {"Aaron", "Till", "Kevin"};

        for (String account : accounts) {
            DbAccount dbAccount = new DbAccount();
            dbAccount.setName(account);
            entityManager.persist(dbAccount);
        }
    }

    @Transactional
    public void insertRoutesIntoDb() {
        List<DbRoute> all = routeRepository.getAll();
        if (all.size() > 0) {
            return;
        }

        String[] routes = {"Starter", "Route 19", "Route 20", "Floccosy Ranch", "Virbank Complex", "Castelia Sewers",
                "Relic Passage", "Castelia City", "Route 4", "Desert Resort", "Desert Ruins", "Route 16",
                "Lostlorn Forest", "Route 5", "Driftveil Drawbridge", "Route 6"};

        for (String route : routes) {
            DbRoute dbRoute = new DbRoute();
            dbRoute.setName(route);
            entityManager.persist(dbRoute);
        }
    }

    @Transactional
    public void insertCsvIntoDb() {
        insertTypesIntoDb();
        insertRoutesIntoDb();
        insertAccountsIntoDb();

        List<DbPokemon> dbPokemons = pokemonRepository.getAll();
        if (dbPokemons.size() > 0) {
            return;
        }
        try (CSVReader csvReader = createReader("db/pokemon.csv")) {
            String[] headers = csvReader.readNext();
            HashMap<String, Integer> headerIndexes = createHeaderMap(headers);

            String[] nextLine;
            List<DbType> dbTypeList = typeRepository.getAll();

            int batchSize = 50;
            int i = 0;
            while ((nextLine = csvReader.readNext()) != null) {
                DbPokemon dbPokemon = new DbPokemon();
                dbPokemon.setName(nextLine[headerIndexes.get("name")]);
                dbPokemon.setHeight(bigDecimalOrZero(nextLine[headerIndexes.get("height_m")]));
                dbPokemon.setWeight(bigDecimalOrZero(nextLine[headerIndexes.get("weight_kg")]));
                dbPokemon.setBaseHappiness(Integer.parseInt(nextLine[headerIndexes.get("base_happiness")]));

                String type1Str = nextLine[headerIndexes.get("type1")];
                DbType type1 = findTypeByName(dbTypeList, type1Str);
                dbPokemon.setType1(type1);

                String type2Str = nextLine[headerIndexes.get("type2")];
                if (!type2Str.isBlank()) {
                    DbType type2 = findTypeByName(dbTypeList, type2Str);
                    dbPokemon.setType2(type2);
                }

                dbPokemon.setHp(Integer.parseInt(nextLine[headerIndexes.get("hp")]));
                dbPokemon.setAttack(Integer.parseInt(nextLine[headerIndexes.get("attack")]));
                dbPokemon.setDefense(Integer.parseInt(nextLine[headerIndexes.get("defense")]));
                dbPokemon.setSpAttack(Integer.parseInt(nextLine[headerIndexes.get("sp_attack")]));
                dbPokemon.setSpDefense(Integer.parseInt(nextLine[headerIndexes.get("sp_defense")]));
                dbPokemon.setSpeed(Integer.parseInt(nextLine[headerIndexes.get("speed")]));

                if (i % batchSize == 0) {
                    entityManager.flush();
                    entityManager.clear();
                }

                entityManager.persist(dbPokemon);
                ++i;
            }

        } catch (IOException | CsvValidationException e) {
            throw new RuntimeException(e);
        }

        insertSetUp();
    }

    private BigDecimal bigDecimalOrZero(String value) {
        if (value.isBlank()) {
            return BigDecimal.ZERO;
        }
        return BigDecimal.valueOf(Double.parseDouble(value));
    }

    private DbType findTypeByName(List<DbType> dbTypeList, String name) {
        return dbTypeList
                .stream()
                .filter(t -> t.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Couldn't find Type: " + name));
    }

    @Transactional
    public void insertTypesIntoDb() {
        List<DbType> all = typeRepository.getAll();
        if (all.size() > 0) {
            return;
        }

        try (CSVReader csvReader = createReader("db/types.csv")) {
            String[] headers = csvReader.readNext();
            HashMap<String, Integer> headerIndexes = createHeaderMap(headers);

            // Skipping first cause no type
            for (int i = 1; i < headers.length; i++) {
                DbType type = new DbType();
                type.setName(headers[i]);
                entityManager.persist(type);
            }

            String[] nextLine;

            while ((nextLine = csvReader.readNext()) != null) {

                DbType dbAttackType = typeRepository.findByName(nextLine[0]);

                for (int i = 1; i < headers.length; i++) {
                    DbTypeEffectiveness typeEffectiveness = new DbTypeEffectiveness();
                    typeEffectiveness.setAttackType(dbAttackType);

                    DbType dbDefenseType = typeRepository.findByName(headers[i]);
                    typeEffectiveness.setDefenseType(dbDefenseType);

                    typeEffectiveness.setMultiplier(BigDecimal.valueOf(Float.parseFloat(nextLine[i])));
                    entityManager.persist(typeEffectiveness);

                    /* Log.info(
                            "TypeEffectiveness[ Attacking: " + typeEffectiveness.getAttackType().getName() + ", " +
                            "Defending: " + typeEffectiveness.getDefenseType().getName() + " with: " +
                            typeEffectiveness.getMultiplier() + " ]"
                    );*/
                }
            }

        } catch (IOException | CsvValidationException e) {
            throw new RuntimeException(e);
        }
    }

    private CSVReader createReader(String fileName) {
        try {
            URL resource = CsvToDb.class.getClassLoader().getResource(fileName);
            if (resource == null) {
                throw new RuntimeException("Resource not found");
            }
            return new CSVReader(new FileReader(resource.getFile()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private HashMap<String, Integer> createHeaderMap(String[] header) {
        HashMap<String, Integer> headerIndexes = new HashMap<>();

        for (int i = 0; i < header.length; i++) {
            headerIndexes.put(header[i], i);
        }

        return headerIndexes;
    }

}
