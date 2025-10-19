'use client'
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function Congratulations(){
    const router = useRouter()
    useEffect(()=>{
        let isActive = true
        async function verify (){
            try{
                const res = await fetch('../api/logic?action=verify',{method: "GET"})
                const data = await res.json()
                if(data.verified){
                        router.push('../complete')
                    }else if(isActive){
                        console.log(data)
                        setTimeout(verify, 3000)
                    }
            }catch(err){
                console.error("fetch failed: ",err);
                if(isActive) setTimeout(verify, 3000)
            }
        }
        verify()
        return ()=>{
            isActive = false
        }
    },[])
    return(
        <div className="h-screen bg-light w-full flex justify-center items-center flex-col gap-y-2">
            <div className="congrats bg-green-500 flex rounded-full w-30 h-30 items-center justify-center">
                <Check strokeWidth={5} className="text-white w-20 h-20"/>
            </div>
            <p className="text-lg font-bolds text-center">Congratulations, you&apos;ve successfully create a Neon Bank Account</p>
            <p className="text-sm font-regular">Please check your email for email confirmation</p>
      </div>
    )
}
