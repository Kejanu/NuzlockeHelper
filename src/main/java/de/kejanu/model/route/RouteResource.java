package de.kejanu.model.route;

import de.kejanu.util.Serializer;
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
            .map(Serializer::serializeRoute)
            .collect(Collectors.toList());
    }
}
