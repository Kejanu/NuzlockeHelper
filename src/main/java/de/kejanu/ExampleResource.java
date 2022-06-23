package de.kejanu;

import de.kejanu.model.pokemon.DbPokemon;
import liquibase.pro.packaged.D;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class ExampleResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public DbPokemon hello() {
        DbPokemon dbPokemon = new DbPokemon();
        dbPokemon.setName("Patrick");
        return dbPokemon;
    }
}