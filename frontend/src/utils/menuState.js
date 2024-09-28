'use client';

import {
  createContext,
  useContext,
  useState,
} from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function MenuStateProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function openMenu() {
    setMenuOpen(true);
  }

  return (
    <LocalStateProvider value={{
      menuOpen,
      toggleMenu,
      closeMenu,
      openMenu,
      setMenuOpen,
    }}>
      {children}
    </LocalStateProvider>
  );
}

function useMenu() {
  const all = useContext(LocalStateContext);

  return all;
}

export {
  MenuStateProvider,
  useMenu,
};
