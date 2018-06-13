import React from 'react';
import { Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import UserChart from '../containers/UserChart';
import { removeError } from "../store/actions/errors";      

const Main = props => {
    return (
        <div className="container">
            <Switch>
                <Route path="/:name" render={props => <UserChart {...props}/>} />
                <Route exact path="/" render={props => <Homepage {...props}/>} />
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      errors: state.errors
    };
  }
  

export default withRouter(
    connect(mapStateToProps, { removeError })(Main)
);