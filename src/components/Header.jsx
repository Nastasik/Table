import React from 'react';

const Header = ({children}) => {
  console.count('Header');
    return (
      <header className="header">
        { children }
      </header>
    );
  }


export default Header;
