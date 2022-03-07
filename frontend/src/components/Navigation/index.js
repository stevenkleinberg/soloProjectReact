import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logo from '../../assets/logo.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton className='navItem' user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal className='navItem' />
        <NavLink className='navItem' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='navList'>
      <li>
        <NavLink className='navItem' exact to="/"><a href="" className=''><img className='logo' src={logo} alt=""/></a> </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
