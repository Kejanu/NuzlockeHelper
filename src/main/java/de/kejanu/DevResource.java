package de.kejanu;

import de.kejanu.core.CsvToDb;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/dev")
public class DevResource {

    @Inject
    CsvToDb csvToDb;

    @GET
    public String hello() {

        csvToDb.insertCsvIntoDb();

        return null;
    }
}