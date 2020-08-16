<?php
/**
 * Created by PhpStorm.
 * User: Mourad
 * Date: 21/6/2019
 * Time: 6:50 PM
 * Converted from Java (Cards.java) to PHP
 * Cards.java downloaded from "http://www.mathcs.emory.edu/~cheung/Courses/170/Syllabus/10/cards.html"
 */
/* -----------------------------------------------------
      Card: a card
      ----------------------------------------------------- */

/* -----------------------------------------------------------
   Encoding:

        Suit: 4 = Spade
              3 = Heart
              2 = Club
              1 = Diamond

        Rank:  A = 1
               2 = 2
               ...
               J = 11
               Q = 12
               K = 13

   Card:

         byte cardSuit;                -- contain 1, 2, 3, or 4
         byte cardRank;                -- contain 2, 3, ... 13, 14
   ----------------------------------------------------------- */
namespace App\Cards_Lib;
class Card
{
    const SPADE   = 4;
    const HEART   = 3;
    const CLUB    = 2;
    const DIAMOND = 1;

    private static $Suit = array("*", "D", "C", "H", "S");
    private static $Rank = array("*", "A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K");

   private $cardSuit;
   private $cardRank;

   public function __construct( int $suit, int $rank )
   {
       $this->setCard($suit, $rank);
   }

    public function  setCard($suit, $rank)
    {
        /*
        if ( $rank == 1 )
            $this->cardRank = 14;     // Give Ace the rank 14
        else
            $this->cardRank = (int) $rank;
*/
        $this->cardRank = (int) $rank;
        $this->cardSuit = (int) $suit;
    }

    public function  suit(): int
    {
      return ( $this->cardSuit );
   }

   public function suitStr():String
    {
      return( self::$Suit[ $this->cardSuit ] );
   }

   public function rank():int
    {
      return ($this->cardRank );
   }

   public  function rankStr():String
    {
      return ( self::$Rank[ $this->cardRank ] );
   }


   public  function __toString():String
    {
      return ( self::$Suit[ $this->cardSuit]  ."-". self::$Rank[ $this->cardRank ] );
   }
}
