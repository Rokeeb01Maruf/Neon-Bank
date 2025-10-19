import { Check } from "lucide-react"

export default function Congrats(){
    return(
        <div className="h-screen bg-light w-full flex justify-center items-center flex-col gap-y-2">
            <div className="congrats bg-green-500 flex rounded-full w-30 h-30 items-center justify-center">
                <Check strokeWidth={5} className="text-white w-20 h-20"/>
            </div>
            <p className="text-lg font-bolds">Email verified</p>
            <p className="text-sm font-regular text-center">You can proceed to finish setting up your account</p>
      </div>
    )
}
