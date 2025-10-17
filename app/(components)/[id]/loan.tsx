import { useEffect, useState } from "react"

export default function Loan({loanDetails, loaned, handleLoan, payed, loanState, onActivate}:{loanDetails: {estimatedLoan: number, date: string}, loaned:number, onActivate: (data: {lAmount: number, estimatedAmount: number, Date: string})=> void, payed: ()=> void,handleLoan: ()=> void, loanState: string}){
    const [amount, setAmount] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0) 
    const [type, setType] = useState<string>('')
    const [eAmount, setEAmount] = useState<number>(0)
    const [loan, setLoan] = useState<string>('')
    const [activated, setActivate] = useState(false)
    const [loaning, setLoaning] = useState('Apply')
    const [status, setStatus] = useState(false)
    useEffect(() => {
      const [p, r]: [number, number] = [Number(amount), Number(duration)];
      const today = new Date();
      today.setDate(today.getDate() + r);
      const dueDate = today.toLocaleDateString();
    
      if (type === 'Personal Loan') setEAmount(p + (p * r * 2) / 100);
      else if (type === 'Educational Loan') setEAmount(p + (p * r * 1.8) / 100);
      else if (type === 'Business Loan') setEAmount(p + (p * r * 2.1) / 100);
    
      setLoan(dueDate);
}, [amount, duration, type]);
    useEffect(()=>{
        if(activated == true){
            const loans :{Date: string, estimatedAmount: number, lAmount: number}= {Date: loan, estimatedAmount: eAmount, lAmount: amount}
            onActivate(loans)
        }
    },[activated])
    useEffect(() => {
      setLoaning(status ? 'Applying' : 'Apply');
    }, [status]);

    return(
        <div>
            {
                loaned == 1?(
                <div>
                <p className="font-bolds text-2xl mb-2">Loan</p>
                <div className="loan-form flex max-sm:flex-col">
                    <div className="flex-3/4 pr-5">
                        <div className="eachfield cursor-pointer w-full mb-4">
                            <p className="pb-2 font-bolds">Loan amount</p>
                            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{
                                const value = e.target.value
                                setAmount(Number(value))
                                }}name="Loan type" className="w-full outline-0 border-2 hover:bg-gray-200 border-gray-600 px-2 py-1 rounded-lg" id="">
                                <option value={0.00}>Select Amount</option>
                                <option value={1000.00} >&#8358; 1,000.00</option>
                                <option value={3000.00}>&#8358; 3,000.00</option>
                                <option value={5000.00}>&#8358; 5,000.00</option>
                            </select>
                        </div>
                        <div className="eachfield cursor-pointer w-full mb-4">
                            <p className="pb-2 font-bolds">Duration</p>
                            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{
                                const value = Number(e.target.value)
                                setDuration(value)
                            }}name="Loan type" className="w-full outline-0 border-2 hover:bg-gray-200 border-gray-600 px-2 py-1 rounded-lg" id="">
                                <option value={0} >Select days</option>
                                <option value={30} >30 days</option>
                                <option value={90} >3 Months</option>
                                <option value={180} >6 Months</option>
                            </select>
                        </div>
                        <div className="eachfield cursor-pointer w-full mb-4">
                            <p className="pb-2 font-bolds">Loan type</p>
                            <select name="Loan type" onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{
                                const value = e.target.value
                                setType(String(value))
                                }}className="w-full outline-0 border-2 hover:bg-gray-200 border-gray-600 px-2 py-1 rounded-lg" id="">
                                <option value="">Select Type</option>
                                <option value="Personal Loan">Personal Loan</option>
                                <option value="Educational Loan">Educational Loan</option>
                                <option value="Business Loan">Business Loan</option>
                            </select>
                        </div>
                        <p className="font-bolds mt-10">Estimated loan amount: <span className="text-secondary">&#8358; {eAmount?.toLocaleString()}.00</span></p>
                    </div>
                    <div className="flex-1/4 my-auto">
                        <p className="font-bolds">Loan summary</p>
                        <div className="goal border border-primary py-2 px-4">
                            <p className="font-regular">Loan amount</p>
                            <input type="text" value={amount} readOnly className="w-full px-1 h-6 outline-0 border border-primary"/>
                            <p className="mt-2 font-regular">Loan duration</p>
                            <input type="text" value={`${duration} days`} readOnly className="w-full px-1 h-6 outline-0 border border-primary"/>
                            <p className="mt-2 font-regular">Loan type</p>
                            <input type="text" value={type} readOnly className="w-full px-1 h-6 outline-0 border border-primary"/>
                            <p className="mt-2 font-regular">Estimated amount</p>
                            <div className="px-1 w-full h-7 outline-0 border border-primary">&#8358; {eAmount}.00</div>
                            <button onClick={()=>{
                                if(amount != 0 && duration != 0 && type != ''){
                                    handleLoan()
                                    setActivate(true)
                                    setStatus(false)
                                    setLoaning('Apply')
                                }
                                }} className="w-full hover:bg-secondary hover:font-bolds cursor-pointer font-regular bg-primary rounded-4xl text-white mt-4 h-8">{loaning}</button>
                        </div>
                    </div>
                </div>
            </div>):
            (<div className="w-full min-h-50">
                <p className="font-bolds text-2xl mb-2">Loan</p>
                {loaned == 0? (<div className="w-full mt-5">
                    <div className="flex items-center bg-red-50 font-regular my-1 p-2 justify-between">
                        <p className="font-bolds">&#8358; {loanDetails.estimatedLoan}.00</p>
                        <div className="flex gap-x-1">
                            <p className="">Due on</p>
                            <p>{loanDetails.date}</p>
                        </div>
                            {
                                loanState == "Pending"?(
                                    <p className="font-light text-sm text-red-700">{loanState}</p>
                                ):(
                                    <p className="font-light text-sm text-green-600">{loanState}</p>
                                )
                            }
                            <button onClick={payed} className="text-white hover:bg-secondary duration-300 bg-primary font-bolds px-3 py-1 rounded-lg cursor-pointer">Payback</button>
                    </div>                  
                </div>):null}
            </div>)
            }
            
        </div>
    )
}
