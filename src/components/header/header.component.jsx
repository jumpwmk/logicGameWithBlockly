import React from 'react';

import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../images/code.svg';
// import { ReactComponent as Profile } from '../../images/user.svg';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = props => {
  const { user } = props;

  console.log('user');
  console.log(user.currentUser);

  return (
    <div className='header'>
      <Link to='/'>
        <Logo className='logo-container' />
      </Link>
      <div className='options'>
        {user.currentUser ? (
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
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Header);
