import React from 'react'
import Link from 'next/link'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Image from 'next/image'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark'>
      <Link href='/' className='flex items-center gap-1'>
        {/* <Image src='/icons/logo.svg' width={32} height={32} alt='Yoom logo'/> */}
       <p className='text-[26px] font-extrabold text-white max-sm:hidden hover:underline'>SpeedX</p>
      </Link>

      <div className='flex flex-between gap-5'>
        {/* clerk authentication here */}
          <SignedIn>
            <UserButton />
          </SignedIn>


        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar