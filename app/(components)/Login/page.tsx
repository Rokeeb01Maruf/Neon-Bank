'use client'
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function LogIn() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [disp, setDisplay] = useState(['','','','',''])
  const router = useRouter()
  const handleSubmit=async(e:React.MouseEvent<HTMLFormElement>)=>{
    setDisplay(['1','','','','5'])
    e.preventDefault()
    if(mail == '' || password == ''){
      setDisplay(['1','2','3','',''])
    }else{
      const formdata = new FormData()
      formdata.append("email",mail)
      formdata.append("password",password)
      await fetch('../api/logic?action=login',{method: "POST", body: formdata})
      .then(res=>res.json())
      .then(data =>{
        if(data.nickName){
          setDisplay(['1','','','4',''])
          const me = data.nickName
          router.push(`../${me}`)
        }else{
          console.log(data)
          setDisplay(['1','2','3','',''])
        }
      })
    }
  }
  return (
    <div className="container flex min-w-screen">
      <div className="max-[800]:hidden left bg-primary h-screen flex flex-col items-center justify-center text-white flex-50">
        <img src="/Images/Neon-1.png" className="mb-5 max-w-66.75"  alt="logo" />
        <h2 className="font-boldser text-3xl mb-2">Neon Bank</h2>
        <p className="font-light text-lg">Fortified security, seamless banking</p>
      </div>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" className="right bg-light flex-50 h-screen flex flex-col justify-center items-center ">
        {
          disp[0] ?(
          <div className="overLay absolute top-auto bottom-auto right-auto left-auto bg-white w-100 h-80 p-6 rounded-lg flex flex-col justify-center items-center">
          {disp[1] ?(
            <X strokeWidth={2} onClick={()=>setDisplay(['','','','',''])} className="absolute cursor-pointer top-4 right-4"></X>
          ):null}
          {disp[2] ?(
           <div className="wrong w-full">
            <div className="congrats bg-red-500 mx-auto flex rounded-full w-30 h-30 items-center justify-center">
                <X strokeWidth={5} className="text-white w-20 h-20"/>
            </div>
            <p className=" font-regular text-sm text-center mt-5">Please check your Email and Password correctly</p>
          </div>
          ):null}
          {disp[3] ?(
           <div className="wrong w-full">
            <div className="congrats bg-green-500 mx-auto flex rounded-full w-30 h-30 items-center justify-center">
                <Check strokeWidth={5} className="text-white w-20 h-20"/>
            </div>
            <p className=" font-regular text-sm text-center mt-5">Log in successfully</p>
          </div>
          ):null}
          {disp[4]?(
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
        <h2 className="font-boldser text-3xl text-primary mb-8">Log in</h2>
        <div className="each-part">
          <p className="text-primary font-regular text-lg mb-2">Email</p>
          <input type="email" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
            const me = e.target.value
            setMail(me)
          }} placeholder="example@gmail.com" className="border-primary placeholder:text-[#D5C3C3] outline-0 rounded-lg w-78 px-3 py-2 border-2" />
        </div>
        <div className="each-part mt-2">
          <p className="text-primary font-regular text-lg mb-2">Password</p>
          <input type="password" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
            const me = e.target.value
            setPassword(me)
          }} maxLength={10} name="password" placeholder="********" className="border-primary placeholder:text-[#D5C3C3] outline-0 rounded-lg w-78 px-3 py-2 border-2" />
        </div>
        <button type="submit" className="mt-8 bg-blue-500 w-78 border-2 border-primary cursor-pointer hover:bg-secondary transition duration-500 rounded-sm text-white font-bolds py-2">Log in</button>
      </form>
    </div>
  )
}
