import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { LogoutBtn } from '../index';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  // this can be used when application is extended, i.e when contains home page instead of direct login page
  const navItems = [
    { name: 'Dashboard', slug: '/dashboard', active: true },
    { name: 'Create form', slug: '/forms/create', active: authStatus },
    { name: 'View forms', slug: '/forms', active: authStatus }
  ];

  return (
    <header className='fixed z-50 py-3 shadow bg-zinc-600/10 text-white w-full backdrop-blur-[3px]'>
      <nav className='flex flex-col-reverse items-center justify-end w-full'>
        <ul className='flex space-x-4 justify-center items-center'>
          {navItems.map(navItem => navItem.active && (
            <li key={navItem.name}>
              <button className='font-semibold text-nowrap text-base lg:text-lg text-zinc-800 transition duration-200 ease-in-out' onClick={() => navigate(navItem.slug)}>{navItem.name}</button>
            </li>
          ))}
          {authStatus && <li><LogoutBtn /></li>}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
