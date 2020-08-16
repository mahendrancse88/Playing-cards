import  React from "react";
import PropTypes from 'prop-types';

export class Card extends React.Component{//String.fromCharCode(183)
    constructor(props){
        super(props);
        let stateObj=this.getStateObject(props.rank, props.suit, props.liKey);
        this.state = {
            rank: stateObj.rank,
            suit: stateObj.suit,
            liKey:stateObj.liKey,
            suitHtmlCode:stateObj.suitHtmlCode
        };
    }
    getStateObject(rank, suit, liKey){
        if(rank==="X")
            rank="A";
        let suit_ = "diams",
            suitHtmlCode = "&diams;";
        switch(suit){
            case "C":suit_="clubs";suitHtmlCode ="&clubs;"; break;
            case "H":suit_="hearts";suitHtmlCode ="&hearts;"; break;
            case "S":suit_="spades";suitHtmlCode ="&spades;"; break;
        }
        return({
            rank: rank,
            suit: suit_,
            liKey:liKey,
            suitHtmlCode:suitHtmlCode
        });
    }
    setNewState(rank, suit, liKey){
        let stateObj=this.getStateObject(rank, suit, liKey);
        this.setState({
            rank: stateObj.rank,
            suit: stateObj.suit,
            liKey:stateObj.liKey,
            suitHtmlCode:stateObj.suitHtmlCode
        });
    }
    render(){
        return(
                <li key={this.state.rank+this.state.suit+this.state.liKey.toString()}>
                    <a className={"card rank-"+this.state.rank+" "+this.state.suit} href="#">
                        <span className="rank">{this.state.rank}</span>
                        <span className="suit"  dangerouslySetInnerHTML={{__html: this.state.suitHtmlCode}/*avoid converting & to &amp; because of HTML Entities.*/} ></span>
                    </a>
                </li>
        );

    }
}
