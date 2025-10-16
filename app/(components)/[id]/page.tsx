'use client'
import { useState, useEffect } from "react";
import  Dashboard  from "./dashboard";
import  Transfer  from "./transfer";
import  Savings  from "./savings";
import  Loan  from "./loan";
import  Setting from "./settings";
import  Profile from "./profile";
import { HomeIcon, Send, PiggyBank, Banknote, Settings, CircleUser, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {Menu, X} from "lucide-react"
    

export default function Main(){
    const [menu, setMenu] = useState(true)
    const [hidden, setHidden] = useState('hidden')
    const router = useRouter()
    const {id} = useParams()
    const [loaned, setLoaned] = useState(1)
    const [transfer, setTransfer] = useState<[{bank: string, name: string, amount: number, number: string}] | []>([])
    const [loan, setLoan] = useState({estimatedLoan: 0, date: ''})
    const [state, setState] = useState('')
    const [url, setUrl] = useState('')
    const [mail, setMail] = useState('')
    const [accountBal, setAccountBal] = useState(0)
    const [accountNum, setAccountNum] = useState('')
    const [phone, setPhone] = useState('')
    const [accountName, setAccountName] = useState('')
    const [nav, setNav] = useState(["block","hidden", "hidden","hidden","hidden","hidden", "hidden" ])
    const [bg, setBg] = useState(["bg-light","","","","",""])
    function Save(){
        setNav(["hidden","hidden", "block","hidden","hidden","hidden", "hidden" ])
        setBg(["","","bg-light","","",""])
    }
    function Trans(){
        setNav(["hidden","block", "hidden","hidden","hidden","hidden", "hidden" ])
        setBg(["","bg-light","","","",""])
    }
    function Loans(){
        setNav(["hidden","hidden", "hidden","block","hidden","hidden", "hidden" ])
        setBg(["","","","bg-light","",""])
    }
    const handleName= async (data: string)=>{
        await fetch('../api/logic?action=name',{method: "POST", body: JSON.stringify({name: data})})
        .then(res=>res.json())
        .then(data=>{
            if(data.answer == 'updated'){
                console.log(data)
                getUser()
            }else{
                console.log(data)
            }
        })
    }
    const handleMail= async (data: string)=>{
        await fetch('../api/logic?action=mail',{method: "POST", body: JSON.stringify({mail: data})})
        .then(res=>res.json())
        .then(data=>{
            if(data.answer == 'updated'){
                console.log(data)
                getUser()
            }else{
                console.log(data)
            }
        })
    }
    const handlePhone= async (data: string)=>{
        await fetch('../api/logic?action=phone',{method: "POST", body: JSON.stringify({phone: data})})
        .then(res=>res.json())
        .then(data=>{
            if(data.answer == 'updated'){
                console.log(data)
                getUser()
            }
        })
        setPhone(data)
    }
    const activateLoan = async (data:{lAmount: number, estimatedAmount: number, Date: string})=>{
        await fetch('../api/logic?action=loan',{method: "POST", body: JSON.stringify({data})})
        .then(res=>res.json())
        .then(data=>{
            if(data.answer == 'updated'){
                setState('Approved')
                getUser()
            }else{
                setState('Pending')
            }
        })
    }
    const getUser = async()=>{
            await fetch("../api/logic?action=getuser",{
                method: "POST",
                body: JSON.stringify({id: id})
            })
            .then(res=>res.json())
            .then(data=>{
                let me;
                if(data.data){
                    if(data.data[1]){
                        const mine = data?.data[1]
                        setTransfer(mine.transfer_details)
                        me = data.data[0]
                    }else{
                        me = data.data
                    }
                    setAccountBal(me.accountBalance)
                    setAccountName(me.fullname)
                    setAccountNum(me.accountNumber)
                    setLoan({estimatedLoan: me.loanAmount, date: me.loanDate})
                    setUrl(me.profile)
                    setPhone(me.phone)
                    setMail(me.email)
                    if(loan.estimatedLoan != 0 || loan.date != "" ){
                        setLoaned(0)
                    }else{
                        setLoaned(1)
                    }
                }
                else{
                    router.push('../Login')
                }
            })
        }
    useEffect(()=>{
        getUser()
    },[])
    return(
        // main cotainer
        <div className="max-h-fit flex overflow-hidden max-[1188]:mx-17 max-[1164]:mx-15 max-[1138]:mx-14 max-[1134]:mx-10
         max-[1108]:mx-0 max-[1320]:mx-35 max-[1306]:mx-32 max-[1284]:mx-29 max-[1255]:mx-25 max-[1224]:mx-20 
         gap-x-12.5 mx-37.5 border-x-2 border-primary
          bg-light">
            <aside className={`flex-1/4 max-[967]:absolute ${hidden == "hidden" ? "max-[966]:hidden":"flex" }
             duration-300 max-[966]:z-10 max-[984]:max-w-46 
                max-[1030]:max-w-60 max-[1030]:pl-10 max-[1024]:max-w-55 max-[1024]:pl-8 max-[1006]:max-w-50 pl-12 min-h-screen
                  h-full max-h-full shadow-mg justify-between flex-col items-end text-primary
                   pt-5 bg-white`}>
                <div className="flex flex-col items-end">
                    <Link href='' className="logo w-max flex max-[966]:mt-10 gap-x-2.5 pr-15 max-[1030]:pr-10">
                        <img src="./Images/Neon-dark.png" className="w-6 h-6" alt="" />
                        <h3 className="font-boldser text-xl">Neon Bank</h3>
                    </Link>
                    <button onClick={()=>{
                        setNav(["block","hidden", "hidden","hidden","hidden","hidden", "hidden" ])
                        setBg(["bg-light","","","","",""])     
                    }} className={`cursor-pointer flex gap-x-2.5 mt-12.5 w-37 items-center px-5 py-2 hover:bg-light ${bg[0]}`}>
                        <HomeIcon width={18} height={18} className="text-black"/>
                        <p className="text-black font-bolds">Dashboard</p>
                    </button>
                    <button onClick={Trans} className={`cursor-pointer flex gap-x-2.5 mt-5 w-37 items-center px-5 py-2 hover:bg-light ${bg[1]}`}>
                        <Send width={18} height={18} className="text-black"/>
                        <p className="text-black font-bolds">Transfer</p>
                    </button>
                    <button onClick={()=>{
                        setNav(["hidden","hidden", "block","hidden","hidden","hidden", "hidden" ])
                        setBg(["","","bg-light","","",""])     
                    }} className={`cursor-pointer flex gap-x-2.5 mt-5 w-37 items-center px-5 py-2 hover:bg-light ${bg[2]}`}>
                        <PiggyBank width={18} height={18} className="text-black"/>
                        <p className="text-black font-bolds">Savings</p>
                    </button>
                    <button onClick={Loans} className={`cursor-pointer flex gap-x-2.5 mt-5 w-37 items-center px-5 py-2 hover:bg-light ${bg[3]}`}>
                        <Banknote width={18} height={18} className="text-black"/>
                        <p className="text-black font-bolds">Loan</p>
                    </button>
                    <button onClick={()=>{
                        setNav(["hidden","hidden", "hidden","hidden","block", "hidden" ])
                        setBg(["","","","","bg-light",""])     
                    }} className={`cursor-pointer flex gap-x-2.5 mt-5 w-37 items-center px-5 py-2 hover:bg-light ${bg[4]}`}>
                        <Settings width={18} height={18} className="text-black"/>
                        <p className="text-black font-bolds">Settings</p>
                    </button>
                </div>
                <button onClick={()=>{
                    setNav(["hidden","hidden", "hidden","hidden","hidden", "block" ])
                    setBg(["","","","","","bg-secondary text-white"])     
                }} className={`cursor-pointer ${bg[5]} mt-[80%] flex gap-x-2.5 w-37 items-center rounded-lg text-black px-5  py-2 [w-31.25] hover:bg-secondary hover:text-white`}>
                    {
                        url == ''? (<CircleUser width={18} height={18}/>):
                        (<img width={18} src={url} alt='profile' className="rounded-full max-w-4.5 max-h-4.5" height={18}/>)
                    }
                    <p className=" font-bolds">Profile</p>
                </button>
            </aside>
            <main className="bg-light pt-5 pr-5 flex-3/4 min-h-screen max-[966]:px-25 max-[853]:px-20 max-[830]:px-10
            max-[500]:px-5">
            {
                menu?(
                    <Menu onClick={()=>{
                        setMenu(!menu)
                        setHidden('flex')
                    }} className="hidden max-[966]:block text-primary z-20 absolute top-6 left-6 cursor-pointer"/>
                ):(
                    <X onClick={()=>{
                        setMenu(!menu)
                        setHidden('hidden')
                    }} className="hidden max-[966]:flex z-20 absolute top-6 left-35 cursor-pointer"/>
                )

            }
                <div className="profile w-full flex justify-end" >
                    {
                        url == ''? (<CircleUserRound width={48} onClick={()=>{
                    setNav(["hidden","hidden", "hidden","hidden","hidden", "block" ])
                    setBg(["","","","","","bg-secondary text-white"])     
                }} height={48}/>):
                        (<img width={48} src={url} className="rounded-full max-h-12 max-w-12" onClick={()=>{
                    setNav(["hidden","hidden", "hidden","hidden","hidden", "block" ])
                    setBg(["","","","","","bg-secondary text-white"])     
                }} alt='profile' height={48}/>)
                    }
                </div>
                {
                    nav[0] == "block"?(<Dashboard bal={accountBal} transfer = {transfer} handleSavings={Save} handleTransfer={Trans} handleLoan={Loans}/>):
                    nav[1] == "block"?(<Transfer update={()=>getUser()} num={accountNum} name={accountName} bal={accountBal}/>):
                    nav[2] == "block"?(<Savings num={accountNum}/>):
                    nav[3] == "block"?(<Loan loanDetails={loan} loaned={loaned} onActivate={activateLoan} loanState={state} payed={()=>{
                        const payBack = async() =>{
                            await fetch('../api/logic?action=payback',{
                                method: "POST",
                                body: JSON.stringify({money: loan.estimatedLoan})
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                if(data.answer == "payed"){
                                    getUser()
                                    setLoaned(1)
                                }else{
                                    console.log(data)
                                }
                            })
                        }
                        payBack()
                    }} handleLoan={()=>{
                        setLoaned(0)
                        setState('Pending')
                        setTimeout(()=>{
                            setState('Approved')
                        },4000)
                    }}/>):
                    nav[4] == "block"?(<Setting details={[accountName, phone, mail]} onName={handleName} onMail={handleMail} onPhone={handlePhone}/>):
                    (<Profile details={[accountName, accountNum, phone, mail, accountBal.toString(), url]}/>)
                }
            </main>
        </div>
    )
}