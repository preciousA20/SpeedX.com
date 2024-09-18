"use client"
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import {useState} from 'react'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import { useGetCallById } from '@/hooks/useGetCallById'
import Loader from '@/components/Loader'

const meeting = ({ params: {id}}: {params: {id: string}}) => {
  const {user, isLoaded} = useUser()
  const [isSetUpComplete, setIsSetUpComplete] = useState<boolean>(false)
  const { call, isCallLoading} = useGetCallById(id)

  if(!isLoaded || isCallLoading) return <Loader />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete}/>
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default meeting