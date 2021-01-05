import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        // return 'Still deciding';
        return;
      case false:
        // return 'I\'m logged out';
        return <li><a href="/auth/google">Login with Google</a></li>
      default:
        // return 'I\'m logged in';
        return [
          <li><Payments /></li>,
          <li><a href="/api/logout">Logout</a></li>
        ]
    }
  }
  render(){
    // console.log(this.props);
    return(
      <nav>
        <div className="nav-wrapper">
          <Link 
            to={ this.props.auth ? '/surveys' : '/' } 
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);