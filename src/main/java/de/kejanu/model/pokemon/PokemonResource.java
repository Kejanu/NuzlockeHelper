package de.kejanu.model.pokemon;

import de.kejanu.model.pokemon.DbPokemon;
import de.kejanu.model.pokemon.PokemonRepository;
import org.openapitools.api.PokemonApi;
import org.openapitools.model.PokemonDto;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

public class PokemonResource implements PokemonApi {

    @Inject
    PokemonRepository pokemonRepository;

    @Override
    public List<PokemonDto> getFilteredPokemon(String search) {
        return pokemonRepository
                .filtered(search)
                .stream()
                .map(this::serializePokemon)
                .collect(Collectors.toList());
    }

    private PokemonDto serializePokemon(DbPokemon pokemon) {
        return new PokemonDto()
                .id(pokemon.getId().toString())
                .name(pokemon.getName())
                .type1(pokemon.getType1().getName())
                .type2(pokemon.getType2() != null ? pokemon.getType2().getName() : null);
    }
}
