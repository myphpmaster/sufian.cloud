import { Navbar } from './NavbarFull';
import React from 'react';
import Head from 'next/head';

export default function Layout({ children }) {
  
  return (
    <>
      <style jsx global>
        {`
        // Add CSSstyle here
        `}
      </style>
      <Head />
      <Navbar />
      <main>{children}</main>
    </>
  );
};
