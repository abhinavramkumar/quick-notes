import React, { Component } from "react";
import { connect } from "react-redux";
import { start__Login } from "../../actions";

class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage">
        <div className="LoginPage__container">
          <div className="LoginPage__form">
            <button onClick={this.props.startLogin}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(start__Login())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
