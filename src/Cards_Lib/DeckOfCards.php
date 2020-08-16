<?php
/**
 * Created by PhpStorm.
 * User: Mourad
 * Date: 21/6/2019
 * Time: 6:50 PM
 * Converted from Java (DeckOfCards.java) to PHP
 * DeckOfCards.java downloaded from "http://www.mathcs.emory.edu/~cheung/Courses/170/Syllabus/10/deck-of-cards.html"
 */

/* -----------------------------------------------------
      Deck: a deck of cards
      ----------------------------------------------------- */
namespace App\Cards_Lib;
class DeckOfCards
{
    const N_CARDS = 52;

    private $deckOfCards = [];         // Contains all 52 cards
    private $currentCard;            // deal this card in deck

    public function __construct( )    // Constructor
    {
        $this->deckOfCards = array_fill(0, DeckOfCards::N_CARDS, null);
        $suit = Card::DIAMOND;
        $rank = 1;
        foreach ($this->deckOfCards as &$val) { // 'reference' on $val
            if($rank > 13){
                $rank=1;
                $suit++;
            }
            $val=new Card($suit, $rank);;
            $rank++ ;
        }
        $this->currentCard = 0;
    }

    /* ---------------------------------
      shuffle(n): shuffle the deck
      --------------------------------- */
    public function shuffle(int $n)
    {
         for ( $k = 0; $k < $n; $k++ )
         {
             $i = (int) (rand(1, DeckOfCards::N_CARDS-1));  // Pick 2 random cards
             $j = (int) (rand(1, DeckOfCards::N_CARDS-1));  // in the deck

             /* ---------------------------------
            swap these randomly picked cards
            --------------------------------- */
             $tmp = $this->deckOfCards[$i];
             $this->deckOfCards[$i] = $this->deckOfCards[$j];
             $this->deckOfCards[$j] = $tmp;
         }

         $this->currentCard = 0;   // Reset current card to deal
     }
     /* -------------------------------------------
         deal(): deal deckOfCards[currentCard] out
     ------------------------------------------- */
     public function deal():Card
    {
         if ( $this->currentCard < DeckOfCards::N_CARDS )
         {
             $aCard = $this->deckOfCards[ $this->currentCard];
             $this->currentCard++;
             return (  $aCard );
         }
         else
         {
             //"Out of cards error");
             return ( null );  // Error;
         }
    }

    public function __toString():String
    {
         $s = "";
         $k = 0;
         for ( $i = 0; $i < 4; $i++ )
         {
             for ( $j = 0; $j < 13; $j++ )
             {
                 $s .= ($this->deckOfCards[$k] . ",");
                 $k++;

             }
             //$s .= "\n";
         }
         return ( $s );
          }
   }

?>
