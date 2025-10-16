import { UserRound, Edit2, Lock, Bell } from "lucide-react"
import { useEffect, useState } from "react"
export default function Settings({details, onName, onMail, onPhone }:{details: string[], onName: (data:string)=>void, onPhone: (data:string)=>void, onMail: (data: string)=>void}){
    const [me, setMe] = useState([0,0,0])
    const [name, setName] = useState('')
    const [mail, setmail] = useState('')
    const [phone, setPhone] = useState('')
    const [update, setUpdate] = useState([false, false, false])
    useEffect(()=>{
        if(update[0]){
            onName(name)
        }else{
            setName('')
        }
    },[update])
    useEffect(()=>{
        if(update[1]){
            onMail(mail)
        }else{
            setName('')
        }
    },[update])
    useEffect(()=>{
        if(update[2]){
            onPhone(phone)
        }else{
            setName('')
        }
    },[update])
    return(
        <div>
            { me[0] == 1 ? 
            (<div className="absolute flex max-w-screen justify-center items-center max-h-full min-h-full min-w-screen bg-[rgba(0,0,0,0.7)] inset-0">
                <div className="w-75">
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        const me = e.target.value
                        setName(me)
                    }} type="text" placeholder={details[0]} className="px-2 h-10 font-regular outline-0 w-full border-2 shadow-sm bg-white border-primary rounded-lg"/>
                    <div className="flex gap-2 justify-end">
                        <button onClick={()=>{
                            setMe([0,0,0])
                            setUpdate([true, false, false])
                            }} className="bg-secondary cursor-pointer rounded-sm px-3 hover:bg-primary hover:text-secondary py-1 font-bolds text-gray-200">Update</button>
                        <button onClick={()=>{
                            setMe([0,0,0])
                            setName('')
                            }} className="bg-red-800 cursor-pointer hover:bg-red-900 rounded-sm px-3 py-1 font-bolds text-gray-200">Cancel</button>    
                    </div>
                </div>
            </div>):null}
            { me[1] == 1 ? 
            (<div className="absolute flex max-w-screen justify-center items-center max-h-full min-h-full min-w-screen bg-[rgba(0,0,0,0.7)] inset-0">
                <div className="w-75">
                    <input type="text" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        const me = e.target.value
                        setmail(me)
                    }} placeholder={details[2]} className="px-2 h-10 font-regular outline-0 w-full border-2 shadow-sm bg-white border-primary rounded-lg"/>
                    <div className="flex gap-2 justify-end">
                        <button onClick={()=>{
                            setUpdate([false, true, false])
                            setMe([0,0,0])
                        }} className="bg-secondary cursor-pointer rounded-sm px-3 hover:bg-primary hover:text-secondary py-1 font-bolds text-gray-200">Update</button>
                        <button onClick={()=>{
                            setMe([0,0,0])
                            setmail('')}} className="bg-red-800 cursor-pointer hover:bg-red-900 rounded-sm px-3 py-1 font-bolds text-gray-200">Cancel</button>    
                    </div>
                </div>
            </div>):null}
            { me[2] == 1 ? 
            (<div className="absolute flex max-w-screen justify-center items-center max-h-full min-h-full min-w-screen bg-[rgba(0,0,0,0.7)] inset-0">
                <div className="w-75">
                    <input onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        const me = e.target.value
                        setPhone(`+234${me}`)
                    }} maxLength={10} type="text" placeholder={details[1].slice(4).slice(-10)} className="px-2 h-10 font-regular outline-0 w-full border-2 shadow-sm bg-white border-primary rounded-lg"/>
                    <div className="flex gap-2 justify-end">
                        <button onClick={()=>{
                            setUpdate([false, false, true])
                            setMe([0,0,0])
                        }} className="bg-secondary cursor-pointer rounded-sm px-3 hover:bg-primary hover:text-secondary py-1 font-bolds text-gray-200">Update</button>
                        <button onClick={()=>{
                            setMe([0,0,0])
                            setPhone('')
                            }} className="bg-red-800 cursor-pointer hover:bg-red-900 rounded-sm px-3 py-1 font-bolds text-gray-200">Cancel</button>    
                    </div>
                </div>
            </div>):null}
            
            <p className="font-bolds text-2xl">Settings</p>
            <div className="profileSettings font-regular">
                <div className="flex text-primary items-center gap-x-1">
                    <UserRound className="w-4 h-4" strokeWidth={3}/>
                    <p className="font-bolds">Profile</p>
                </div>
                <div className="name flex py-2">
                    <p className="ml-5 mr-3">Name:</p>
                    <input type="text" className="min-w-40" value={details[0]} disabled/>
                    <Edit2 className="w-4 cursor-pointer" onClick={()=>setMe([1,0,0])}/>
                </div>
                <div className="name flex py-2">
                    <p className="ml-5 mr-3">Email:</p>
                    <input type="text" className="min-w-50" value={details[2]} disabled/>
                    <Edit2 className="w-4 cursor-pointer" onClick={()=>setMe([0,1,0])}/>
                </div>
                <div className="name flex py-2">
                    <p className="ml-5 mr-3">Phone:</p>
                    <input type="text" className="w-29" value={details[1]} disabled/>
                    <Edit2 className="w-4 cursor-pointer" onClick={()=>setMe([0,0,1])}/>
                </div>
            </div>
            <div className="security">
                <div className="flex text-primary items-center gap-x-1">
                    <Lock className="w-4 h-4" strokeWidth={3}/>
                    <p className="font-bolds">Security</p>
                </div>
                <div className="name flex py-2">
                    <p className="ml-5 mr-3">Change Password:</p>
                    <button className="cursor-pointer text-white bg-secondary px-2 rounded-sm font-light">Change</button>
                </div>
            </div>
            <div className="notification">
                 <div className="flex text-primary items-center gap-x-1">
                    <Bell className="w-4 h-4" strokeWidth={3}/>
                    <p className="font-bolds">Notifications</p>
                </div>
                <div className="ml-5 gap-x-2 items-center name flex py-2">
                    <input type="checkbox" name="" id="" />
                    <p>SMS alert</p>
                </div>
                <div className="ml-5 gap-x-2 items-center name flex py-2">
                  <input type="checkbox" name="" id="" />
                    <p>Email alert</p>
                </div>
                <div className="ml-5 gap-x-2 items-center name flex py-2">
                    <input type="checkbox" name="" id="" />
                    <p>Notification alert</p>
                </div>
            </div>
        </div>
    )
}
