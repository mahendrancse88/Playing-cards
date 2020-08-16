import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {HandOfCards} from "./HandOfCards";

function TabContainer({ children}) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default class CardsTabs  extends React.Component{
    static tabs=[];
    static tabContainers=[];
    static Refs=[];
    static distributionSuitsRanksArray=[];

    constructor(props)
    {
        super(props);
        this.state={
            distributionObject:props.distributionObject,
            value:0
        };
    }

    setNewState(distributionObject){
        this.setState({
                                distributionObject:distributionObject,
                            });
        this.setNewState_HandOfCards();
    }

    setNewState_HandOfCards(){
        try{
            CardsTabs.Refs.forEach(function(ref, i) {
                ref.current.setNewState(CardsTabs.distributionSuitsRanksArray[i]);
            });
        }catch (e) {
        }
    }

    handleChange=(event, newValue) =>{
        this.setState({ value: newValue});
    }

    handleChangeIndex=(index) =>{
        this.setState({ value: index});
    }
    componentDidMount(){
    }
    render() {
        let distributionObject=this.state.distributionObject;
        CardsTabs.tabs = [];
        CardsTabs.tabContainers = [];
        CardsTabs.Refs = [];
        CardsTabs.distributionSuitsRanksArray = [];
        let nbrPlayer=distributionObject.length;
        for (let i=0; i < nbrPlayer; i++) {
            let distributionName=distributionObject[i].playerName;
            let distributionSuitsRanks=distributionObject[i].suitsRanks;
            CardsTabs.tabs.push(<Tab id={"Tab"+i} key={i} label={distributionName} />);
            let myRef = React.createRef();
            CardsTabs.tabContainers.push(<TabContainer key={i}><HandOfCards ref={myRef} suitsRanks={distributionSuitsRanks}/></TabContainer>);
            CardsTabs.Refs.push(myRef);
            CardsTabs.distributionSuitsRanksArray.push(distributionSuitsRanks);
        }
        return (
            <div>
            <AppBar position="static" color={"inherit"}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {CardsTabs.tabs}
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
            >
                {CardsTabs.tabContainers}
            </SwipeableViews>
            </div>);
    }
}