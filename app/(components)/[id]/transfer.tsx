'use client'
import { useEffect, useState } from "react"
import { X, Check } from "lucide-react"
export default function Transfer({num, name, bal, update}:{num: string, name: string, bal: number, update: ()=>void}) {
    const [finish, setFinish ] = useState(false)
    const [display, setDisplay] = useState(["","","","","",""])
    const [spiner, setSpiner] = useState('')
    const [aShow, setAShow] = useState('')
    const [data, setData] = useState({name: "", code: ""})
    const [show, setShow] = useState(1)
    const [account, setAccount] = useState<{number: string, name: string, amount: number, bank: string}>({number: "", name: "", amount: 0, bank: ""})
    const [banks, setBanks] = useState<[]>([])
    const [spin, setSpin] = useState('')
    const [p, setP] = useState('')
    const [names, setNames] = useState<string[]>([])
    useEffect(()=>{
        if(data.name != "" && data.code != ""){
            setShow(0)
            setP("")
            const me = {...account}
            me.bank = data.name
            setAccount(me)
        }
    },[data])
    async function handleBank(e: React.ChangeEvent<HTMLInputElement>){
        const accName = e.target.value
        if(accName != ""){
            setSpiner('1')
            await fetch("https://api.paystack.co/bank")
            .then(res=>res.json())
            .then(data=>{
                if(data){
                    setSpiner("")
                    const me = data.data.filter((e : {name: string})=> e.name.toLowerCase().includes(accName.toLowerCase()))
                    setBanks(me)
                    setP("1")
                }
            })
        }
        }
    async function handleComplete(e:React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value
            if(value.length == 10){
                setSpin('1')
                const getDetails = async()=>{
                    await fetch(`https://api.paystack.co/bank/resolve?account_number=${value}&bank_code=${data.code}`,{
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`
                        }
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.data){
                            setSpin("")
                            const acc = {...account}
                            acc.name = data.data.account_name
                            acc.number = data.data.account_number
                            setAccount(acc)
                            setAShow("1")
                        }
                    })
                }
                getDetails()
            }
    }
    const handleTransfer = async() =>{
        setFinish(true)
        setDisplay(["","1","","","",""])
        if(typeof(account.amount) != "number" || (bal-account.amount) < 0){
            setDisplay(["1","","","1","","1"])
            console.log(typeof(account.amount))
            console.log(bal-account.amount)
            return
        }else{
            await fetch('../api/logic?action=transfer',{
                method: "POST",
                headers:{
                    "content-Type": "application/json"
                },
                body: JSON.stringify(account)
            })
            .then(res=>res.json())
            .then(data=>{
                if(!data.transfer){
                    console.log(data)
                    setDisplay(["1","","","1","","1"])
                }else if(!data){
                    setDisplay(["1","","","1","","1"])
                }else{
                    setDisplay(["1", "", "1", "", "1","" ])
                    console.log(data.lengt)
                    update()
                }
            })
        }
    }
    return(
        <div>
            <p className="font-bolds text-2xl">Transfer</p>
            <div className="flex max-[810]:flex-col max-w-full mt-4 gap-5">
                <div className="flex-2/3">
                    <div className="eachfield cursor-pointer mb-4">
                        <p className="pb-2 font-bolds">From</p>
                        <div className="flex items-center hover:bg-gray-200 w-full justify-between border-gray-600 border-2 px-2 py-1 rounded-lg">
                            <p>{num}</p>
                            <p>{name}</p>
                            <img src="./Images/Neon-dark.png" alt="" className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="eachfield cursor-pointer w-full mb-4 ">
                        <p className="pb-2 font-bolds">To</p>
                        <div className="flex truncate items-center hover:bg-gray-200 h-9 w-full justify-between border-gray-600 border-2 px-2 py-1 rounded-lg">
                            <p>{data.name}</p>
                            <p>{account.name}</p>
                        </div>
                    </div>
                    <fieldset className="border rounded-lg px-2">
                    <legend className="font-bolds">Recipient</legend>
                    <div className="eachfield cursor-pointer w-full mb-1 relative">
                        <p className="pb-2 font-regular">Recipient&apos;s bank</p>
                        {
                            show == 1 ? (
                                <input type="text" onInput={handleBank} placeholder="Neon Bank" className="w-full outline-0 border-2 hover:bg-gray-200 border-gray-600 px-2 py-1 rounded-lg" />
                            ) : (
                                <div onClick={()=>setShow(1)} className="flex items-center hover:bg-gray-200 w-full justify-between border-gray-600 border-2 px-2 py-1 rounded-lg">
                                    {data.name}
                                </div>
                            )
                        }
                        { spiner != ""  ? (
                            <div className="w-5 h-5 border-2 absolute top-10 right-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        ):null}
                        {
                            p != "" ? (
                               <div className="bg-gray-300 max-h-50 px-2 z-10 absolute left-0 top-17 rounded-sm w-full overflow-y-scroll">
                               {
                                banks.map((e: {name: string, code: string})=>(
                                <button key={e.name} onClick={()=>{
                                    const me = {...data}
                                    me.name = e.name
                                    me.code = e.code
                                    setData(me)
                                }} className="cursor-pointer p-2 h-10 font-regular">{e.name}</button>
                            ))
                               }
                               </div>
                            ): (<div className="hidden"></div>)
                        }
                    </div>
                    <div className="eachfield relative cursor-pointer w-full mb-1">
                        <p className="pb-2 font-regular">Recipients account number</p>
                        { 
                            names.length > 0 ? (
                                <div onClick={()=>setNames([])} className="flex hover:bg-gray-200 w-full justify-between border-gray-600 border-2 px-4 py-1 rounded-lg">
                                    <p>{names[0]}</p><p>{names[1]}</p>
                                </div>                       
                                ):(
                            <input type="text" onInput={handleComplete} placeholder={num} maxLength={10} className="w-full outline-0 border-2 hover:bg-gray-200 border-gray-600 px-2 py-1 rounded-lg" />)
                        }
                        { spin != "" ? (
                            <div className="w-5 h-5 border-2 absolute top-10 right-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        ):
                        null
                        }
                        {
                            aShow != "" ? (
                                <button onClick={()=>{
                                    setNames([account.name, account.number])
                                    setAShow("")
                                }} className="flex bg-gray-300 w-full justify-center gap-x-1.5 cursor-pointer p-2 h-10 font-regular"><p>{account.name}</p><p>{account.number}</p></button>
                            ):null
                        }
                    </div>
                    <div className="eachfield cursor-pointer w-full mb-1">
                        <p className="pb-2 font-regular">Amount</p>
                        <input onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            const value = Number(e.target.value)
                            const newValue = {...account}
                            newValue.amount = value
                            setAccount(newValue)
                        }} type="number" placeholder="0.00" className="w-full outline-0 border-2 hover:bg-gray-200 border-gray-600 px-2 py-1 rounded-lg" />
                    </div>
                    <div className="eachfield cursor-pointer w-full mb-4">
                        <p className="pb-2 font-regular">Note<span className="font-regular">(optional)</span></p>
                        <input type="text" placeholder="" className="w-full outline-0 border-2 hover:bg-gray-200 border-gray-600 px-2 py-1 rounded-lg" />
                    </div>
                    </fieldset>
                </div>
                <div className="flex-1/3 m-auto border-2 relative border-black p-4 rounded-lg max-[810]:w-full">
                    {
                        finish ? (
                            <div className="absolute flex flex-col items-center justify-center w-full top-0 left-0 h-full z-10 bg-white">
                                {
                                    display[0] == "" ? null : (
                                        <X onClick={()=>setFinish(false)} className="cursor-pointer absolute top-1 right-1"/>
                                    )
                                }
                                {
                                    display[1] == "" ? null : (
                                        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                    )
                                }
                                {
                                    display[2] == "" ? null : (
                                        <div className="congrats bg-green-500 mx-auto flex rounded-full w-30 h-30 items-center justify-center">
                                            <Check strokeWidth={5} className="text-white w-20 h-20"/>
                                        </div>
                                    )
                                }
                                {
                                    display[3] == "" ? null : (
                                        <div className="congrats bg-red-500 mx-auto flex rounded-full w-30 h-30 items-center justify-center">
                                            <X strokeWidth={5} className="text-white w-20 h-20"/>
                                        </div>
                                    )
                                }
                                {
                                    display[4] == "" ? null : (
                                        <p className=" font-regular text-sm text-center mt-5">Transfer successful</p>
                                    )
                                }
                                {
                                    display[5] == "" ? null : (
                                        <p className=" font-regular text-sm text-center mt-5">You cannot transfer this amount</p>
                                    )
                                }
                            </div>
                        ):null
                    }
                    <p className="font-bolds text-center my-2">Tranfer summary</p>
                    <p className="mb-2 flex items-center gap-2 font-light">From: <b className="font-regular text-sm text-black">{name}</b></p>
                    <p className="mb-2 flex items-center gap-2 font-light">To: <b className="font-regular text-sm text-black">{account.name}</b></p>
                    <p className="mb-2 flex gap-2 items-center font-light">Amount: <b className="font-regular text-black">&#8358; {account.amount}</b></p>
                    <button onClick={handleTransfer} className="bg-secondary w-full text-white font-bolds px-4 py-2 rounded-3xl hover:bg-primary cursor-pointer">Transfer</button>
                </div>
            </div> 
        </div>
    )
}
