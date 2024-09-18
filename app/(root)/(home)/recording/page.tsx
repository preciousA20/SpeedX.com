import CallList from '@/components/CallList'
import React from 'react'

const Recording = () => {
  return (
    <section className='flex size-full flex-col gap-2 text-white'>
    <h1 className='text-2xl font-bold'>Recording</h1>

    <CallList type="recordings"/>
</section>
  )
}

export default Recording