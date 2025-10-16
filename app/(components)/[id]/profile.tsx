import { CircleUserRound, LogOut } from "lucide-react"

export default function Profile({details}:{details: string[]}){
    return(
        <div className="min-h-screen max-h-screen">
            <p className="font-bolds text-2xl">Profile</p>
            <div className="profile">
                <div className="profile py-2" >
                    {
                        details[5]==""?
                            (<CircleUserRound width={128} height={128}/>):
                            (<img src={details[5]} alt="profile" className="max-w-32 max-h-32 rounded-full" width={128} height={128}/>)
                    }
                </div>
                <div className="items font-regular my-2 flex gap-x-2">
                    <p className="font-bolds">Name:</p>
                    <p>{details[0]}</p>
                </div>
                <div className="items font-regular my-2 flex gap-x-2">
                    <p className="font-bolds">Email:</p>
                    <p>{details[3]}</p>
                </div>
                <div className="items font-regular my-2 flex gap-x-2">
                    <p className="font-bolds">Phone:</p>
                    <p>{details[2]}</p>
                </div>
                <div className="items font-regular my-2 flex gap-x-2">
                    <p className="font-bolds">Account Number:</p>
                    <p>{details[1]}</p>
                </div>
                <div className="items font-regular my-2 flex gap-x-2">
                    <p className="font-bolds">Account Balance:</p>
                    <p>&#8358; {Number(details[4]).toLocaleString()}.00</p>
                </div>
                <div className="items font-regular my-2 flex gap-x-2">
                    <p className="font-bolds">Account type:</p>
                    <p>Savings</p>
                </div>
                <button className="items font-regular mt-30 cursor-pointer flex gap-x-2">
                    <LogOut />
                    <p>Log Out</p>
                </button>
            </div>
        </div>
    )
}
