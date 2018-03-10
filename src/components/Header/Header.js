import React from 'react';
import {connect} from 'react-redux';
import {start__Logout} from '../../actions';

const Header = ({startLogout}) => {
  return (
    <div className="Header">
      <div className="container">
        <div className="title">
          <img src="img/quick-notes-brand-logo.svg" alt=""/>
        </div>
        <div className="options">
          <button onClick={startLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(start__Logout())
});

export default connect(undefined, mapDispatchToProps)(Header);