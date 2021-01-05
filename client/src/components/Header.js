import React from 'react';
import { render } from 'react-dom';

class Header extends React.Component {
  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <a href="" className="left brand-logo">
            Emaily
          </a>
          <ul className="right">
            <li><a href="">Login with Google</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;