import React from 'react';

import { ReactComponent as Logo } from '../../images/code.svg';
import { ReactComponent as Profile } from '../../images/user.svg';

import './header.styles.scss';

const Header = () => (
    <div className = 'header'>
        <Logo className='logo-container'/>
        <div className='spacer'/>
        <div className='spacer'/>
        <div className='spacer'/>
        <div className='profile'>
            <div className='name'>Jumpwmk</div> 
            <Profile className='pic'/>
        </div>
    </div>
);

export default Header;