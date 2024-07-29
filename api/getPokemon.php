<?php
require_once '../Pokedex.php';

header('Content-Type: application/json');

if (isset($_GET['name'])) {
    $pokemonName = strtolower($_GET['name']);
    $pokedex = new Pokedex();
    $pokemon = $pokedex->getPokemon($pokemonName);

    if ($pokemon === null) {
        echo json_encode(['error' => 'Pokémon not found']);
    } else {
        echo json_encode([
            'name' => $pokemon->getName(),
            'height' => $pokemon->getHeight(),
            'weight' => $pokemon->getWeight(),
            'sprite' => $pokemon->getSprite(),
            'types' => $pokemon->getTypes(),
            'abilities' => $pokemon->getAbilities(),
            'stats' => $pokemon->getStats()
        ]);
    }
} else if (isset($_GET['random'])) {
    $pokedex = new Pokedex();
    $pokemon = $pokedex->getRandomPokemon();

    if ($pokemon === null) {
        echo json_encode(['error' => 'Pokémon not found']);
    } else {
        echo json_encode([
            'name' => $pokemon->getName(),
            'sprite' => $pokemon->getSprite()
        ]);
    }
} else {
    echo json_encode(['error' => 'No Pokémon name provided']);
}
?>
