import  React from "react";
import CardsTabs from "./CardsTabs"
import Assignment from "@material-ui/icons/Assignment";
import PropTypes from 'prop-types'

export class Home extends React.Component{
    constructor(){
        super();
        this.state={
            distributionObject:this.generateInitialDistribution() //generate Initial Distribution which is unshuffled deck of cards
        };
        this.cardsTabsElement=React.createRef();
        this.setCardsTabsNewState = this.setCardsTabsNewState.bind(this);
    }

    generateInitialDistribution(){
        let Suit = ["D", "C", "H", "S"];
        let Rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K"];
        let distributionObject ={playerName:"Deck of cards", suitsRanks:""};

        for(let i =0; i < 4; i++){
            for(let j =0; j < 13; j++)
                distributionObject.suitsRanks+= Suit[i]+"-"+Rank[j]+",";
        }
        let distributionArrayObject=[];
        distributionArrayObject.push(distributionObject);
        return distributionArrayObject;
    }
    /**
     *
     * @param distributionObject
     */
    setCardsTabsNewState(distributionObject){
        this.cardsTabsElement.current.setNewState(distributionObject);
    }

    render(){
        return(
                <div className="container">
                    <h1>Playing cards with CakePHP</h1>
                    Please click "distribute cards" to start. You may use Options and Languages menus, or click About for more information.
                    In order to see the solution please click the button <Assignment /> in the Tabs bellow.
                    <hr/>
                    <CardsTabs ref={this.cardsTabsElement} distributionObject={this.state.distributionObject}/>
                </div>
        );
    }
}
