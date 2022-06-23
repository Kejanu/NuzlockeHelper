package de.kejanu.util;

import de.kejanu.model.account.DbAccount;
import de.kejanu.model.route.DbRoute;
import de.kejanu.model.run.DbRun;
import org.openapitools.model.AccountDto;
import org.openapitools.model.RouteDto;
import org.openapitools.model.RunDto;

import java.util.Comparator;

public class Serializer {
    public static AccountDto serializeAccount(DbAccount dbAccount) {
        return new AccountDto()
            .id(dbAccount.getId().toString())
            .name(dbAccount.getName());
    }

    public static RouteDto serializeRoute(DbRoute dbRoute) {
        return new RouteDto()
            .id(dbRoute.getId().toString())
            .name(dbRoute.getName());
    }

    public static RunDto serializeRunToRunDto(DbRun dbRun) {
        return new RunDto()
            .id(dbRun.getId().toString())
            .name(dbRun.getName())
            .createdAt(dbRun.getCreatedAt().toEpochMilli())
            .accounts(dbRun.getAccounts() != null
                ? dbRun.getAccounts()
                .stream()
                .sorted(Comparator.comparing(DbAccount::getName))
                .map(Serializer::serializeAccount)
                .toList()
                : null
            );
    }
}
