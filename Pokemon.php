<?php

class Pokemon {
    private $name;
    private $height;
    private $weight;
    private $sprite;
    private $types;
    private $abilities;
    private $stats;

    public function __construct($name, $height, $weight, $sprite, $types, $abilities, $stats) {
        $this->name = $name;
        $this->height = $height;
        $this->weight = $weight;
        $this->sprite = $sprite;
        $this->types = $types;
        $this->abilities = $abilities;
        $this->stats = $stats;
    }

    public function getName() {
        return $this->name;
    }

    public function getHeight() {
        return $this->height;
    }

    public function getWeight() {
        return $this->weight;
    }

    public function getSprite() {
        return $this->sprite;
    }

    public function getTypes() {
        return $this->types;
    }

    public function getAbilities() {
        return $this->abilities;
    }

    public function getStats() {
        return $this->stats;
    }
}
?>
