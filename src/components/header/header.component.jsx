import React from 'react';

import { ReactComponent as Logo } from '../../images/code.svg';
import { ReactComponent as Profile } from '../../images/user.svg';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Logo className='logo-container' />
    <div className='options'>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

export default Header;
