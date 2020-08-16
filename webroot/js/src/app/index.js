import  React from "react";
import {render} from "react-dom";
import {Header} from "./components/Header";
import {Home} from "./components/Home";
import {ModalDialog} from "./components/ModalDialog";
import {Alert} from "./components/Alert";

class App extends React.Component{
    constructor(){
        super();
        this.state={
            nbrPlayer:0,
            Show:false
        };
        this.dialogueElement=React.createRef();
        this.alertElement=React.createRef();
        this.homeElement=React.createRef();
    }
    updateStatusOfCardsTabs(distributionObject){
        this.homeElement.current.setCardsTabsNewState(distributionObject);
    }

    showDialog(){
        this.dialogueElement.current.showDialog();
    }

    showAlert(title, text){
        this.alertElement.current.show(title, text);
    }

    onDistributeCards(){
        this.showDialog();
    }
    /** ctrl + enter (example of standard coding)
     *
     */
    AjaxDistribute(nbrPlayer){
        let loc = window.location.pathname;
        let dir = loc.substring(0, loc.lastIndexOf('deck'));
        $.ajax({
            type:'GET',
            url:dir+'Deck/Distribute',
            dataType: "json",
            data:{nbrPlayer:nbrPlayer},
            success:function(data){
                console.log("data: "+data);
                if(data.Status === 'ok'){
                    this.updateStatusOfCardsTabs(data.Result);
                }else{
                    this.showAlert("Error", "distribute.php error: "+data.Result);
                }
            }.bind(this),
            error: function (jqXHR, exception) {
                console.log(exception);
                let msg = 'Ajax error: ';
                if (jqXHR.status === 0) {
                    msg += 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg += 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg += 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg += 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg += 'Time out error.';
                } else if (exception === 'abort') {
                    msg += 'Ajax request aborted.';
                } else {
                    msg += 'Uncaught Error.\n' + jqXHR.responseText;
                }
                this.showAlert("Error", msg);
            }.bind(this),
        });
    }

    onAbout(){
        let loc = window.location.pathname;
        let dir = loc.substring(0, loc.lastIndexOf('deck'));
        $.ajax({
            type:'GET',
            url:dir+'Deck/About',
            dataType: "json",
            success:function(data){
                console.log("data: "+data);
                if(data.Status === 'ok'){
                    this.showAlert("About playing cards with CakePHP", data.Result);
                }else{
                    this.showAlert("Error", "about.php error: "+data.Result);
                }
            }.bind(this),
            error: function (jqXHR, exception) {
                console.log(exception);
                let msg = 'Ajax error: ';
                if (jqXHR.status === 0) {
                    msg += 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg += 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg += 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg += 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg += 'Time out error.';
                } else if (exception === 'abort') {
                    msg += 'Ajax request aborted.';
                } else {
                    msg += 'Uncaught Error.\n' + jqXHR.responseText;
                }
                this.showAlert("Error", msg);
            }.bind(this),
        });
    }

    render(){
        return(

            <div className="container">
                <ModalDialog Show={this.state.Show}
                             initialNbrPlayers={this.state.nbrPlayer}
                             AjaxDistribute={this.AjaxDistribute.bind(this)}
                             ref={this.dialogueElement}
                />
                <Alert Show={this.state.Show}
                       ref={this.alertElement}
                />
                <Header Link1={"Distribute cards"}
                        Link2={"About"}
                        onDistributeCards={this.onDistributeCards.bind(this)}
                        onAbout={this.onAbout.bind(this)}
                />
                <div className="row">
                        <Home ref={this.homeElement}/>
                </div>
            </div>
        );
    }
}
render(<App/>, document.getElementById("app"));
