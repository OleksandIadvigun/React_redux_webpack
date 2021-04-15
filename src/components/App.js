import React, { Component } from "react";
import '../styles/App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import AllPosts from "./Posts/AllPosts";
import {Provider} from "react-redux";
import {store} from "../redux/Store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
            <div> Home page
                <hr/>
                <Link to={'/posts'}> posts</Link>
                <Switch>
                    <Route path={'/posts'} render={()=>{
                        return <AllPosts/>
                    }}/>
                </Switch>
            </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
