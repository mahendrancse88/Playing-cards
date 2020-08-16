import  React from "react";
import Assignment from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import {Card} from "./Card"
import './cards.css';
import {Alert} from "./Alert";

export class HandOfCards extends React.Component{
    static ranks=[];
    static suits=[];
    static liKeys=[];
    static Refs=[];
    constructor(props){
        super(props);
        this.state = {
            suitsRanksStr: props.suitsRanks,
        };
        this.alertElement=React.createRef();
    }

    setNewState_Cards(){
        try{
            HandOfCards.Refs.forEach(function(ref, i) {
                ref.current.setNewState(HandOfCards.ranks[i], HandOfCards.suits[i], HandOfCards.liKeys[i]);
            });
        }catch (e) {
        }
    }

    setNewState(distributionSuitsRanks){
        this.setState({
            suitsRanksStr:distributionSuitsRanks,
        });
        this.setNewState_Cards();
    }

    showAlert(title, text){
        this.alertElement.current.show(title, text);
    }

    showSolution(){
        this.showAlert("Solution", this.state.suitsRanksStr);
    }

    render(){
        let rows=[];
        HandOfCards.Refs=[];
        HandOfCards.ranks=[];
        HandOfCards.suits=[];
        HandOfCards.liKeys=[];
        let rows_13_Cards=[];// one rotate (round) hand can only have 13 cards.
        let suitsRanks=this.state.suitsRanksStr.split(",");
        let i = 1;
        for (; i <= suitsRanks.length; i++) {
            if(suitsRanks[i-1].length >0){
                let v=suitsRanks[i-1].split("-")
                let suit_=v[0];
                let rank_=v[1];
                let myRef = React.createRef();
                rows_13_Cards.push(<Card ref={myRef} liKey={i.toString()} suit={suit_} rank={rank_}/>);
                HandOfCards.Refs.push(myRef);
                HandOfCards.ranks.push(rank_);
                HandOfCards.suits.push(suit_);
                HandOfCards.liKeys.push(i.toString());
            }
            if(i%13===0){ // one rotate (round) hand can only have 13 cards.
                rows.push(<div style={{flex: '1'}}><ul className="hand">{rows_13_Cards}</ul></div>);
                rows_13_Cards=[];
            }
        }
        if((i%13!==0)&&(i<52)){ // one rotate (round) hand can only have 13 cards.
            rows.push(<div style={{flex: '1'}}><ul className="hand">{rows_13_Cards}</ul></div>);
        }
        return (
            <div className="playingCards fourColours simpleCards rotateHand">
                    <Alert Show={false}
                           ref={this.alertElement}
                    />
                    <IconButton href={"#"} onClick={()=> this.showSolution()}>
                        <Assignment />
                    </IconButton>
                    <div style={{display: 'flex'}}>{rows}</div>
                </div>
        );
    }
}
