package de.kejanu.model.route;

import de.kejanu.util.DtoMapper;
import org.openapitools.api.RoutesApi;
import org.openapitools.model.RouteDto;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

public class RouteResource implements RoutesApi {

    @Inject
    RouteRepository routeRepository;

    @Override
    public List<RouteDto> getFilteredRoutes(String search) {
        return routeRepository
            .filtered(search)
            .stream()
            .map(DtoMapper::serializeRoute)
            .collect(Collectors.toList());
    }
}
