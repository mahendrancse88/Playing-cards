import  React from "react";
import PropTypes from 'prop-types';

export class Header extends React.Component{

    onDistributeCards(){
        this.props.onDistributeCards();
    }

    onAbout(){
        this.props.onAbout();
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="#" onClick={()=> this.onDistributeCards()}>{this.props.Link1}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={()=> this.onAbout()}>{this.props.Link2}</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}
