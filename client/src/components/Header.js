import React from 'react';
import { connect } from 'react-redux';

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
        return <li><a>Logout</a></li>
    }
  }
  render(){
    // console.log(this.props);
    return(
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Emaily
          </a>
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