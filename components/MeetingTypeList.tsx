"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import HomeCard from './HomeCard'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/hooks/use-toast"
import ReactDatePicker from 'react-datepicker'


const MeetingTypeList = () => {
    const [meeting, setMeeting] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const [callDetails, setCallDetails] = useState<Call>()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })

    const router = useRouter()
    const { toast } = useToast()
    const {user} = useUser()
    const client = useStreamVideoClient()

    const createMeeting = async() =>{
        if(!client || !user) return 

        try {
            // if(!values.dateTime){
            //     toast({
            //         title: "Please select a date and time"
            //     })
            // }
            const id = crypto.randomUUID()
            const call = client.call("default", id)

            if(!call) throw new Error("falied to create call")

            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()

            const description = values.description || 'Instant Meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetails(call)

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
            toast({title: "Call initiated successfully..."})
        } catch (error) {
            console.log(error)
            toast({
            title: "Failed to initiate a call..."})
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard 
            img="https://raw.githubusercontent.com/adrianhajdin/zoom-clone/29cc1b776a82f804451dc56064df7de6c742a204/public/icons/add-meeting.svg"
            title="New Meeting"
            description="Via invitaion link"
            handleClick={()=>setMeeting('isJoiningMeeting')}
            className="bg-orange-1"
        />
        <HomeCard 
            img="https://raw.githubusercontent.com/adrianhajdin/zoom-clone/29cc1b776a82f804451dc56064df7de6c742a204/public/icons/schedule.svg"
            title="Schedule Meeting"
            description="Plan a Meeting"
            handleClick={()=>setMeeting('isScheduleMeeting')}
            className="bg-blue-1"
        />
        <HomeCard 
            img="https://raw.githubusercontent.com/adrianhajdin/zoom-clone/29cc1b776a82f804451dc56064df7de6c742a204/public/icons/recordings.svg"
            title="View Recordings"
            description="Check Out Your Recordings"
            handleClick={()=>router.push('/recording')}
            className="bg-purple-1"
        />
        <HomeCard 
            img="https://raw.githubusercontent.com/adrianhajdin/zoom-clone/29cc1b776a82f804451dc56064df7de6c742a204/public/icons/join-meeting.svg"
            title="Instant Meeting"
            description="Start An Instant Meeting"
            handleClick={()=>setMeeting('isInstantMeeting')}
            className="bg-yellow-1"
        />
        {!callDetails ? (
            <MeetingModel 
            isOpen={meeting==="isScheduleMeeting"}
            onClose={()=>setMeeting(undefined)}
            title="Create Meeting"
    
            
            handleClick={createMeeting}
        >
            <div className='flex flex-col gap-2.5'>
                <label className='text-base text-normal leading-[22px] text-sky-2'>
                    Add a description 
                </label>
                    
            <input className="w-full h-[40px] text-black" onChange={(e: any)=>{
                setValues({...values, description: e.target.value})
            }}/>
            </div>
            <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
                Select date and time 
                </label>
                <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
            </div>
        </MeetingModel>
        ) : (<MeetingModel 
        isOpen={meeting==="isScheduleMeeting"}
        onClose={()=>setMeeting(undefined)}
        title="Meeting Created"
        image='https://raw.githubusercontent.com/adrianhajdin/zoom-clone/29cc1b776a82f804451dc56064df7de6c742a204/public/icons/checked.svg'
        buttonText='Copy meeting Link'
        buttonIcon='https://raw.githubusercontent.com/adrianhajdin/zoom-clone/29cc1b776a82f804451dc56064df7de6c742a204/public/icons/copy.svg'
        handleClick={()=>{
            navigator.clipboard.writeText(meetingLink)
            toast({title: "Link Copied!"})
        }}
    />)}
        <MeetingModel 
            isOpen={meeting==="isInstantMeeting"}
            onClose={()=>setMeeting(undefined)}
            title="Start Now"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
        />


        <MeetingModel 
            isOpen={meeting==="isJoiningMeeting"}
            onClose={()=>setMeeting(undefined)}
            title="Paste the link here"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={()=>router.push(values.link)}
        >
            <input className='h-[50px] w-full text-black rounded-md' onChange={(e: any)=>setValues({
                ...values, link: e.target.value
            })}/>
        </MeetingModel>


    </div>
  )
}

export default MeetingTypeList