'use client'
import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import {X, Check} from "lucide-react"

export default function Complete() {
  const router = useRouter()
    const [flex, setFlex] = useState(['flex', 'hidden'])
    const [img, setImg] = useState('/Images/p.png')
      const [display, setDisp] = useState(['','','','',''])
    const [show, setShow] = useState('hidden')
    const [disp, setDisplay] = useState(["block","hidden"])
    const[p, setP] = useState('')
    const[submit, setSubmit] = useState('Complete')
    const [check, setCheck] = useState(false)
    const [style, setStyle] = useState('mt-2 w-78 transition rounded-sm  font-bolds py-2 text-gray-600 bg-blue-200 cursor-arrow')
    const [data, setData] = useState<{Fullname: string, Nickname: string, phone: string, Address: string, BVN: string, Date: string, Profile: File | undefined
    }>({
      Fullname: "",
      Address: "",
      BVN: "",
      Date: "",
      Profile: undefined,
      Nickname: "",
      phone:  ""
    })
    useEffect(()=>{
      const me = async()=>{
        await fetch('../api/logic?action=check',{method: "GET"})
        .then(res=>res.json()
        .then(data=>{
          if(data.in == false){
            router.push('../Signup')
          }
        })
      )
      }
      me()
    },[])
    useEffect(()=>{
        if(check===true){
            setStyle('text-white bg-blue-400 border-2  border-primary cursor-pointer')
        }else{
            setStyle('mt-2 w-78 transition rounded-sm  font-bolds py-2 text-gray-600 bg-blue-200 cursor-arrow')
        }
    },[check])
    function handleB(e:React.MouseEvent<HTMLButtonElement>){
      e.preventDefault()
      const oldData = ["block","hidden"]
      setDisplay(oldData)
    }
    function handleFirst(e:React.MouseEvent<HTMLButtonElement>){
      if(data.Fullname === ""){
        e.preventDefault()
        setP('Please input your Fullname')
            setShow('flex animate-show')
            setTimeout(()=>{
              setShow('hidden');
              setP('')
            }, 900)
            return
        }else if(data.Address == ""){
          e.preventDefault()
            setP('Please input your Address')
            setShow('flex animate-show')
            setTimeout(()=>{
              setShow('hidden');
              setP('')
            }, 900)
            return
        }else if(data.Date==undefined || data.Date ==''){
            e.preventDefault()
            setP('Please input your Date of Birth')
            setShow('flex animate-show')
            setTimeout(()=>{
              setShow('hidden');
              setP('')
            }, 900)
            return
          }else if(data.Nickname == ''){
            e.preventDefault()
            setP('Please input a nickname')
            setShow('flex animate-show')
            setTimeout(()=>{
              setShow('hidden');
              setP('')
            }, 900)
            return
          }else if(data.BVN == undefined || data.BVN.toString().length != 11){
            e.preventDefault()
            setP('Please input a valid BVN')
            setShow('flex animate-show')
            setTimeout(()=>{
                setShow('hidden');
                setP('')
            }, 900)
            return
            }else if(data.phone == "" || data.phone.length < 10){
              e.preventDefault()
              setP('Please input a phone number')
              setShow('flex animate-show')
              setTimeout(()=>{
                setShow('hidden');
               setP('')
             }, 1000)
             return
            }else{
            e.preventDefault()
            const oldData = ["hidden","block","block"]
            setDisplay(oldData)
          }
        }
    function handleSubmit(e:React.MouseEvent<HTMLButtonElement>){
        if(check===false){
            e.preventDefault()
            setP('Read and accept the terms and condition')
            setShow('flex animate-show')
            setTimeout(()=>{
              setShow('hidden');
              setP('')
            }, 900)
            return
            }else if(!data.Profile || data.Profile.size > 1048576){
              e.preventDefault()
              setP('Please upload image less than 1MB(size)')
              setShow('flex animate-show')
              setTimeout(()=>{
                setShow('hidden');
               setP('')
             }, 1000)
             return
            }else{
              e.preventDefault()
              setDisp(['1','','','','5'])
              const formData = new FormData();
              formData.append('fullname',data.Fullname);
              formData.append('profile',data.Profile);
              formData.append('address',data.Address);
              formData.append('bvn',data.BVN);
              formData.append('phone',data.phone);
              formData.append('dob',data.Date);
              formData.append('nickName', data.Nickname)
              async function Upload(){
                  await fetch('../api/logic?action=complete',{
                    method: "POST",
                    body: formData
                  })
                  .then(res => res.json())
                  .then(data=>{
                    if(data.id){
                    setDisp(['1','','','4',''])
                    router.push(`../${data.id}`)
                    setFlex(['hidden','flex'])
                    }else{
                      setDisp(['1','2','3','',''])

                    }
                  })
              }
              Upload()
            }
          }
  return (<>
    <div className={`container ${flex[0]} min-w-screen`}>
      <div className="left bg-primary min-h-screen flex flex-col items-center justify-center text-white flex-50">
        <img src="/Images/Neon-1.png" className="mb-5"  alt="logo" />
        <h2 className="font-boldser text-3xl mb-2">Neon Bank</h2>
        <p className="font-light text-lg">Fortified security, seamless banking</p>
      </div>
      <form className="right bg-light flex-50 min-h-screen flex flex-col justify-center items-center ">
        {
          display[0] ?(
          <div className="overLay absolute top-auto bottom-auto right-auto left-auto bg-white w-100 h-90 p-6 rounded-lg flex flex-col justify-center items-center">
          {display[1] ?(
            <X strokeWidth={2} onClick={()=>setDisp(['','','','',''])} className="absolute cursor-pointer top-4 right-4"></X>
          ):null}
          {display[2] ?(
           <div className="wrong w-full">
            <div className="congrats bg-red-500 mx-auto flex rounded-full w-30 h-30 items-center justify-center">
                <X strokeWidth={5} className="text-white w-20 h-20"/>
            </div>
            <p className=" font-regular text-sm text-center mt-5">Account creation was unsuccessful</p>
          </div>
          ):null}
          {display[3] ?(
           <div className="wrong w-full">
            <div className="congrats bg-green-500 mx-auto flex rounded-full w-30 h-30 items-center justify-center">
                <Check strokeWidth={5} className="text-white w-20 h-20"/>
            </div>
            <p className=" font-regular text-sm text-center mt-5">Log in successfully, pls wait while we redirect you to your dashboard</p>
          </div>
          ):null}
          {display[4]?(
            <div className="flex items-center justify-between h-16">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-roll"></div>
            </div>
          ): null }
        </div>
          ) : null
        }
        <h2 className="font-boldser text-3xl text-primary mt-3 mb-4">Finish setting up</h2>
        <div className={`personal ${disp[0]}`}>
          <div className="each-part mb-2">
            <p className="text-primary font-regular text-lg mb-2">Fullname</p>
            <input type="text" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = e.target.value
              let prevData = {...data}
              prevData.Fullname = val
              setData(prevData)
            }} placeholder="John Doe" className="border-primary placeholder:text-[#D5C3C3] outline-0 rounded-lg h-8 w-78 px-3 py-2 border-2" />
          </div>
          <div className="each-part mb-2">
            <p className="text-primary font-regular text-lg mb-2">Nickname</p>
            <input type="text" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = e.target.value
              let prevData = {...data}
              prevData.Nickname = val
              setData(prevData)
            }} placeholder="Johnny" className="border-primary placeholder:text-[#D5C3C3] outline-0 rounded-lg h-8 w-78 px-3 py-2 border-2" />
          </div>
          <div className="each-part mt-2">
            <p className="text-primary font-regular text-lg mb-2">Address</p>
            <input type="text" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = e.target.value
              let prevData = {...data}
              prevData.Address = val
              setData(prevData)}} placeholder="Under G, Ogomoso,Nigeria" className="border-primary placeholder:text-[#D5C3C3] h-8 outline-0 rounded-lg w-78 px-3 py-2 border-2" />
          </div>
          <div className="each-part mt-2">
            <p className="text-primary font-regular text-lg mb-2">BVN</p>
            <input type="text" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = parseInt(e.target.value)
              let prevData = {...data}
              prevData.BVN = val.toString()
              setData(prevData)}} maxLength={11} pattern='[0-9]+' placeholder="12345678901" className="border-primary placeholder:text-[#D5C3C3] h-8 outline-0 rounded-lg w-78 px-3 py-2 border-2" />
          </div>
          <div className="each-part mt-2">
            <p className="text-primary font-regular text-lg mb-2">Phone number</p>
            <div className="relative">
              <p className="absolute font-regular my-auto pt-1.5 p-1 text-white pr-2 rounded-l-lg bg-primary h-8">+234</p>
              <input type="text" onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
                const val = parseInt(e.target.value)
                let prevData = {...data}
                prevData.phone = `+234${val}`
                setData(prevData)}} maxLength={10} pattern='[0-9]+' className="border-primary placeholder:text-[#D5C3C3] pl-11 h-8 outline-0 rounded-lg w-78 px-3 py-2 border-2" />
            </div>
          </div>
          <div className="each-part mt-1 flex items-center justify-between w-78">
            <p className="text-primary font-regular text-lg mb-2">Date of Birth</p>
            <input type="date"  onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = e.target.value
              let prevData = {...data}
              prevData.Date = val
              setData(prevData)}} className="text-secondary font-regular text-lg mb-2" />
          </div>
          
          <button className='mt-1 bg-secondary ml-[80%] transition duration-300 hover:bg-primary hover:text-blue-300 text-white px-4 py-1.5 rounded-sm cursor-pointer font-bolds ' onClick={handleFirst}>Next</button>
        </div>
        <div className={`submit ${disp[1]}`}>
              <Image src={img} width={124} className='mx-auto rounded-full max-w-31 max-h-31' height={124} alt='Profile'></Image>
            <div className="each-part mt-1 flex items-center justify-between w-78">
            <p className="text-primary font-regular text-sm">Upload profile picture</p>
            <input type="file" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              const val = e.target.files?.[0]
              if(val){
                let prevData = {...data}
                prevData.Profile = val
                setData(prevData)
                const url = URL.createObjectURL(val)
                setImg(url)
              }
            }} accept='image/*' className="text-secondary font-regular w-[160px] text-sm" />
        </div>
        <div className="each-part mt-1 flex items-center justify-start w-78">
          <input type="checkbox" onClick={()=>setCheck(!check)} className="font-regular mr-1 w-4 text-sm mb-2" />
          <a href="" className="text-black font-regular text-sm mb-2">Terms and Conditions</a>
        </div>
        <button type="submit" onClick={handleSubmit} className={`my-2 w-78 ${style} rounded-sm  font-bolds py-2`}>{submit}</button>
        <button onClick={handleB} className='bg-secondary block transition duration-300 hover:bg-primary hover:text-blue-300 text-white px-4 py-1.5 rounded-sm cursor-pointer font-bolds '>Back</button>
        </div>
        <p className={`absolute ${show} bg-white text-red-600 top-[7vh] text-shadow-2xs font-light rounded-sm px-1`}>{p}</p>
      </form>
    </div>
  </>
  )
}