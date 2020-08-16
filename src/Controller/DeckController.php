<?php
namespace App\Controller;
use App\Controller\AppController;
use App\Cards_Lib\Distribution;
use App\Cards_Lib\DeckOfCards;
use Cake\Event\Event;

/**
 * Deck Controller
 *
 *
 * @method \App\Model\Entity\Deck[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class DeckController extends AppController
{

    public function initialize()
    {
        parent::initialize();

        $this->viewBuilder()->setLayout('defaultDeck');

    }

    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);

        // Change layout for Ajax requests
        if ($this->request->is('ajax')) {
            $this->layout = 'ajax';
        }
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {

    }

    function getDeckOfCards(): DeckOfCards
    {
        $deckOfCards = new DeckOfCards();
        $deckOfCards->shuffle(1000);
        return $deckOfCards;
    }

    function getDistributionJsonObject($nbrPlayer)
    {
        $deckOfCards = $this->getDeckOfCards();
        $distributionObjectArray = array();
        array_push($distributionObjectArray, new Distribution("Deck of cards", (string)$deckOfCards));

        $playerNum = 1;
        $suitsRanks = "";
        $cardsParPlayer = 52 / $nbrPlayer;
        for ($i = 1; $i <= 52; $i++) {
            $playerName = "Player " . $playerNum;
            $suitsRanks .= $deckOfCards->deal() . ",";
            if ($i % $cardsParPlayer == 0) {
                array_push($distributionObjectArray, new Distribution($playerName, $suitsRanks));
                $suitsRanks = "";
                $playerNum++;
            }
        }
        return ($distributionObjectArray);
    }

    public function Distribute()
    {
        $data = array();
        $data['Status'] = 'err';
        $data['Result'] = 'Input value does not exist or value is invalid';

        if (!empty($_GET['nbrPlayer']) && is_numeric($_GET['nbrPlayer'])) {
            $nbrPlayer = $_GET['nbrPlayer'];

            if ($nbrPlayer > 52)
                $nbrPlayer = 52;

            if ($nbrPlayer > 0) {
                $data['Status'] = 'ok';
                $data['Result'] = $this->getDistributionJsonObject($nbrPlayer);
            }
        }
        $content = json_encode($data);
        $this->autoRender = false;
        $response = $this->response->withType('json')->withStringBody($content);
        return $response;
    }



    function getHTML(){
        return( "<div className='container'>
                <p>Playing cards with CakePHP was developed by Mahendran</p>
                <h2 id='usedtechnology'>Used technology</h2>
                <ul>
                <li><strong>CakePHP </strong>: Used to provide MVC (model–view–controller) architecture to the back end of the project.</li>  
                <li><strong>PHP 7</strong>: Used to create the logic of the back end of the project.</li>                
                <li><strong>React.js</strong>: Used to create the user interface for the front end of the project.</li>                
                <li><strong>Material-UI</strong>: Used to create some of the user interface components, like: Dialog and Tabs.</li>                
                <li><strong>Webpack</strong>: To bundle JavaScript files for usage in the browser.</li>                
                <li><strong>JavaScript</strong>: Part of the user interface to create a dynamic and interactive experience for the user.</li>                
                <li><strong>jQuery</strong>: Part of the user interface for HTML DOM manipulation, as well as event handling.</li>                
                <li><strong>Ajax (JQuery)</strong>: For asynchronous http requests.</li>                
                <li><strong>JSon</strong>: For Exchanging Data through the asynchronous http requests.</li>                          
                <li><strong>Bootstrap</strong>: provide styling for the user interface.</li>                
                <li><strong>CSS</strong>: provides the styles and animation for the cards</li>
                </ul>
</div>");
    }

    public function about()
    {
        $data = array();
        try{

            $data['Status'] = 'ok';
            $data['Result'] = $this->getHTML();
            //returns data as JSON format
            $content = json_encode($data);
            $this->autoRender = false;
            $response = $this->response->withType('json')->withStringBody($content);
            return $response;
        }
        catch(Exception $e) {
            echo $this->$e->getMessage();
        }

    }

}
