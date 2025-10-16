import { Copy, Share2 } from "lucide-react";

export default function Savings({num}:{num: string}){
    return(
        <div>
            <p className="font-bolds text-2xl">Savings <span className="ml-2.5 text-red-400 font-light text-center text-[.8rem] text">(*not available to use yet)</span></p>
            <div className="flex gap-x-5 max-[500]:gap-x-2.5">
                <div className="card">
                    <p className="font-regular text-sm mb-2">Total Savings</p>
                    <div className="card1 w-50 bg-primary h-25 p-5 text-white rounded-xl flex">
                        <p className="font-bolds text-xl my-auto">&#8358; 0.00</p>
                    </div>
                </div>
                <div className="card">
                    <p className="font-regular text-sm mb-2">Add Money</p>
                    <div className="card2 relative w-50 max-[500]:w-45 h-25 p-1 bg-white rounded-xl flex-col hover:border-secondary border-2 border-primary">
                        <p className="font-regular text-sm pb-1 border-b-1 border-dashed max-[500]:text-[.8rem]">Neon Bank Account Number</p>
                        <p className="flex pt-1 items-center justify-between pr-5 font-bolds text-xl">{num} <Copy className="cursor-pointer max-[500]:w-4.5 hover:text-gray-700 text-gray-400"/></p>
                        <button className="flex h-8 rounded-lg items-center justify-center cursor-pointer hover:bg-secondary bg-primary text-white font-regular w-full"><Share2 className="h-4.5 max-[500]:w-4.5"/>Share Account</button>
                    </div>
                </div>       
            </div>
        <div className="flex mt-5 gap-x-2 max-[589]:flex-col-reverse max-[589]:gap-y-4">
            <div className="flex-3/4">
                <p className="font-bolds text-2xl my-5">Saved savings</p>
                <table className="w-full text-center">
                    <thead>
                        <tr className="border h-11 bg-primary font-bold text-white">
                        <th className="border-white border">Goals</th>
                        <th className="border-white border">Amount</th>
                        <th className="border-white border">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white h-8 border-primary">
                            <td className="border-primary border-l border-r"></td>
                            <td className="border-primary border-l border-r"></td>
                            <td className="border-primary border-l border-r"></td>
                        </tr>
                        <tr className="bg-white h-8 border-primary">
                            <td className="border-primary border-l border-r"></td>
                            <td className="border-primary border-l border-r"></td>
                            <td className="border-primary border-l border-r"></td>
                        </tr>
                        <tr className="bg-white h-8">
                            <td className="border-primary border-l border-r"></td>
                            <td className="border-primary border-l border-r"></td>
                            <td className="border-primary border-l border-r"></td>
                        </tr>
                        <tr className="bg-white h-8">
                            <td className="border-primary border-l border-r"></td>
                            <td className="border-primary border-l border-r"></td>
                            <td className="border-primary border-l border-r"></td>
                        </tr>
                        <tr className="bg-white h-8">
                            <td className="border-primary border-l border-r border-b"></td>
                            <td className="border-primary border-l border-r border-b"></td> 
                            <td className="border-primary border-l border-r border-b"></td>
                        </tr>
                    </tbody>   
                </table>
            </div>
            <div className="flex-1/4 my-auto">
                <p className="font-regular">Add new goal</p>
                <div className="goal border border-primary py-2 px-4">
                    <p className="font-regular">Goal</p>
                    <input type="text" className="w-full h-6 outline-0 border border-primary"/>
                    <p className="mt-2 font-regular">Amount</p>
                    <input type="text" className="w-full h-6 outline-0 border border-primary"/>
                    <p className="mt-2 font-regular">Date</p>
                    <input type="text" className="w-full h-6 outline-0 border border-primary"/>
                    <button className="w-full hover:bg-secondary hover:font-bolds cursor-pointer font-regular bg-primary rounded-4xl text-white mt-4 h-8">Save</button>
                </div>
            </div>
        </div>
    </div>
)
}