"use client"
import { DeviceSettings, VideoPreview, useCall} from '@stream-io/video-react-sdk'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setIsSetUpComplete}: {setIsSetUpComplete: (value: boolean)=>void}) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState<boolean>(false)
    const call = useCall()

    if(!call){
        throw new Error("useCall must be used within streamCall component!")
    }

    useEffect(()=>{

        if(isMicCamToggledOn){
            call?.camera.disable()
            call?.microphone.disable()
        }else{
            call?.camera.enable()
            call?.microphone.enable()
        }
    },[isMicCamToggledOn, call?.camera, call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 bg-gray-800 text-white'>
        <h3 className='text-2xl font-bold'>Set Up</h3>

        <VideoPreview />

        <div className='flex h-16 items-center justify-center gap-3'>

            <label className='flex items-center justify-center gap-2 font-medium'>
                <input 
                    type='checkbox'
                    checked={isMicCamToggledOn}
                    onChange={(e: any)=>setIsMicCamToggledOn(e.target.checked)}
                />
                Join with Mic and Camera off
            </label>
            <DeviceSettings />
        </div>

        <Button className='rounded-md bg-green-600 px-4 py-2.5' onClick={()=>{
            call.join()
            setIsSetUpComplete(true)
        }}>
            Join Call 
        </Button>
    </div>
  )
}

export default MeetingSetup