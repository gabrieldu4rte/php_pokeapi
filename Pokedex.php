<?php
require_once 'Pokemon.php';

class Pokedex {
    public function getPokemon($name) {
        $apiUrl = "https://pokeapi.co/api/v2/pokemon/{$name}";
        $response = @file_get_contents($apiUrl);

        if ($response === FALSE) {
            return null;
        } else {
            $pokemonData = json_decode($response, true);
            return new Pokemon(
                $pokemonData['name'],
                $pokemonData['height'],
                $pokemonData['weight'],
                $pokemonData['sprites']['front_default'],
                array_map(function($type) {
                    return $type['type']['name'];
                }, $pokemonData['types']),
                array_map(function($ability) {
                    return $ability['ability']['name'];
                }, $pokemonData['abilities']),
                array_reduce($pokemonData['stats'], function($carry, $stat) {
                    $carry[$stat['stat']['name']] = $stat['base_stat'];
                    return $carry;
                }, [])
            );
        }
    }

    public function getRandomPokemon() {
        $randomId = rand(1, 151); // Limite inicial de Pokémon
        return $this->getPokemon($randomId);
    }
}
?>
