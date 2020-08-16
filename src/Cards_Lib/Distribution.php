<?php
namespace App\Cards_Lib;
class Distribution
{
    public $playerName;
    public $suitsRanks;

    public function __construct($playerName, $suitsRanks)
    {
        $this->playerName = $playerName;
        $this->suitsRanks = $suitsRanks;
    }
}
