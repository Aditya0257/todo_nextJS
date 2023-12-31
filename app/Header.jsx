"use client"

import Link from 'next/link';
import React from 'react';
import {LogoutBtn} from '../components/Clients.jsx';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();
  return (
    <div className='header'>
      <div>
        <h2>Todo.</h2>
      </div>
      <article>
        <Link href='/' onClick={()=>router.refresh()}>Home</Link>
        <Link href='/profile'>Profile</Link>
        
        <LogoutBtn />
      </article>
    </div>
  )
}

export default Header
