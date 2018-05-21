import React, { Component } from "react";
import "./App.css";
import {
    Switch,
    Redirect,
    Route} from "react-router-dom";
import Menu from "./Menu/Menu";

import QAPage from "./QAPage/QAPage";


class App extends Component {

    //Some sample data for our demo
    state = {
      menuItems: [
          {id: 1, name: "QA", shortName: "qa", isActive: true},
          {id: 2, name: "QT", shortName: "qt", isActive: false},
          ],
    };

    menuOnClickHandler(menuItemId) {
        const menuItemsCopy = [...this.state.menuItems ];
        menuItemsCopy.map(menuItem => {
           return (
               menuItem.isActive = (menuItem.id === menuItemId) ? true : false
           )
        });
        this.setState({menuItems : menuItemsCopy});
        
    };


    
  render() {


    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">TEST PAGE</p>
        </header>
          <div className="content">
            <Menu that={this} click={this.menuOnClickHandler} menuItems = {this.state.menuItems}/>
              <Switch>

                  <Route name="qa" exact path="/qa" component={QAPage} />
                  <Route exact path="/qt"
                         name="qt"
                         render={ props => <div {...props}></div> } />

                  <Redirect from="/" to="qa" />

              </Switch>


          </div>
      </div>
    );
  }
}

export default App;
