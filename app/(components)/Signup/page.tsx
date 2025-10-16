'use client'
import {EyeIcon, EyeOff, Check, X} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function SignUp(){
  const router = useRouter()
  const [data, setData] = useState({email: '', password:  ''})
  const [disp, setDisplay] = useState(['',''])
  const [type, setType] = useState(['password', 'password'])
  const [cPassword, setCPassword] = useState('')
  const [eye, setEye] = useState([true, true])
  const [border, setBorder] = useState('border-primary')
  const [p, setP] =  useState(['','hidden'])
  async function handleSubmit(e:React.MouseEvent<HTMLButtonElement>){
     if(!data.email.includes('.com') || !data.email.includes('@')){
        e.preventDefault()
        setP(['Please input a valid email',"flex"])
        setTimeout(()=>{
          setP(['',"hidden"])
        },2000)
        return
    }else if(data.password.length < 8){
      e.preventDefault()
        setP(['Please input a password of 8-10 character long',"flex"])
        setTimeout(()=>{
          setP(['',"hidden"])
        },4000)
        return
    }else if(border == "border-red-500" || cPassword == ""){
      e.preventDefault()
      setP(["Your passwords aren't matching","flex"])
        setTimeout(()=>{
          setP(['',"hidden"])
        },3000)
        return
    }else{
        e.preventDefault()
      setDisplay(['1','2'])
        async function Upload(){
          await fetch('../api/logic?action=signup',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(data => {
            console.log(data.answer)
            if(data.answer.includes('success')){
              router.push('../congratulation')
            }else if(data.answer == "account already exist" || data.answer == "Invalid login credentials"){
              router.push('../Login')
            }
          })
        }
        Upload()
     }
  }
  return(<>
    <div className="flex">
      <div className="left bg-primary min-h-screen flex flex-col max-[800]:hidden items-center justify-center text-white flex-50">
        <img src="/Images/Neon-1.png" className="mb-5 max-w-66.75 "  alt="logo" />
        <h2 className="font-boldser text-3xl mb-2">Neon Bank</h2>
        <p className="font-light text-lg">Fortified security, seamless banking</p>
      </div>
      <form action="" className="right bg-light flex-50 min-h-screen flex flex-col justify-center items-center " method="post">
        {
          disp[0] ?(
          <div className="overLay absolute top-auto bottom-auto right-auto left-auto z-50 bg-white w-100 h-90 p-6 rounded-lg flex flex-col justify-center items-center">
          {disp[1]?(
            <div className="flex items-center justify-between h-16">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ): null }
        </div>
          ) : null
        }
        <div className="logo gap-x-2.5 mx-auto items-center justify-center mb-5 hidden max-[800]:flex">
          <img src="./Images/Neon-dark.png" className="w-10 h-10" alt="" />
          <h3 className="font-boldser text-4xl">Neon Bank</h3>
        </div>
        <h2 className="font-boldser text-3xl text-primary mt-3 mb-4">Sign Up</h2>
        <div className="data">
          <div className="each-part mb-2">
            <p className="text-primary font-regular text-lg mb-2">Email</p>
            <input type="email" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = e.target.value
              let prevData = {...data}
              prevData.email = val
              setData(prevData)
            }} placeholder="example@gmail.com" className="border-primary placeholder:text-[#D5C3C3] outline-0 rounded-lg h-8 w-78 px-3 py-2 border-2" />
          </div>
          <div className="each-part mb-2 relative">
            <p className="text-primary font-regular text-lg mb-2">Create password</p>
            <input type={`${type[0]}`} onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = e.target.value
              let prevData = {...data}
              prevData.password = val
              setData(prevData)
            }} placeholder="**********" maxLength={10} className="border-primary placeholder:text-[#D5C3C3] outline-0 rounded-lg h-8 w-78 px-3 py-2 border-2" />
            {
              eye[0] == true?(<EyeIcon onClick={()=>{
                const newEye = [...eye]
                newEye[0] = false
                setEye(newEye)
                const newtype = [...type]
                newtype[0] = 'text'
                setType(newtype)
              }} className="cursor-pointer w-4 h-4 absolute top-11.5 right-3"/>):
              (<EyeOff onClick={()=>{
                const newEye = [...eye]
                newEye[0] = true
                setEye(newEye)
                const newtype = [...type]
                newtype[0] = 'password'
                setType(newtype)
              }}  className="cursor-pointer w-4 h-4 absolute top-11.5 right-3"/>)
            }
          </div>
          <div className="each-part mb-2 relative">
            <p className="text-primary font-regular text-lg mb-2">Confirm password</p>
            <input type={`${type[1]}`} onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = e.target.value
              setCPassword(val)
              if(val != data.password){
                setBorder('border-red-500')
              }else{
                setBorder('border-primary')
              }
            }} placeholder="**********" maxLength={10} className={`${border} placeholder:text-[#D5C3C3] outline-0 rounded-lg h-8 w-78 px-3 py-2 border-2`} />
            {
              eye[1] == true?(<EyeIcon onClick={()=>{
                const newEye = [...eye]
                newEye[1] = false
                setEye(newEye)
                const newtype = [...type]
                newtype[1] = 'text'
                setType(newtype)
              }} className="cursor-pointer w-4 h-4 absolute top-11.5 right-3"/>):
              (<EyeOff onClick={()=>{
                const newEye = [...eye]
                newEye[1] = true
                setEye(newEye)
                const newtype = [...type]
                newtype[1] = 'password'
                setType(newtype)
              }}  className="cursor-pointer w-4 h-4 absolute top-11.5 right-3"/>)
            }
          </div>
        </div>
          <button type="submit" onClick={handleSubmit} className={`bg-primary py-2 font-bolds cursor-pointer hover:bg-secondary duration-300 hover:text-primary mt-2 text-white px-4 rounded-lg`}>Sign Up</button>
          <p className={`z-50 font-light text-red-500 absolute top-[7vh] animate-show ${p[1]}`}>{p[0]}</p>
      </form>
    </div>
  </>)
}