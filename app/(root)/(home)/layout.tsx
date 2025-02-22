import React, {ReactNode} from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const homeLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='relative'>
        <Navbar />

        <div className='flex'>
            <Sidebar />

            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-26 max-md:pb-14 sm:px-14'>

                <div className='w-full'>
                    {children}
                </div>
            </section>

        </div>
        
    </div>
  )
}

export default homeLayout