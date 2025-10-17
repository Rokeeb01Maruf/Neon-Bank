import { Send, PiggyBank, Banknote, PlusIcon, ArrowUpCircle} from "lucide-react";
type dashboardPrps={
    handleSavings: ()=> void;
    handleTransfer: ()=> void;
    handleLoan: ()=> void;
    transfer: [{bank: string, name: string, amount: number, number: string}] | []
    bal: number
}

export default function Dashboard({handleSavings, handleTransfer, bal,handleLoan, transfer}: dashboardPrps
    ) {
  return (
    <div>
        <p className="font-bolds text-2xl">Dashboard</p>
        <div className="w-full flex justify-between p-3 bg-white h-37.5 shadow-lg rounded-xl">
            <div className="">
                <p className="font-regular">Account Balance</p>
                <h2 className="font-bolds mt-3 text-3xl max-[918]:text-2xl max-[717]:text-xl max-[666]:text-lg max-[582]:text-sm">&#8358; {bal}.00</h2>
            </div>
            <button onClick={handleSavings} className="text-white gap-x-1 rounded-lg cursor-pointer hover:bg-primary h-max bg-secondary py-2 px-4 flex font-bolds"><PlusIcon/>Add fund</button>
        </div>
        <div className="w-full flex gap-x-5 mt-5 max-[496]:truncate max-sm:gap-x-2">
            <button onClick={handleTransfer} className="max-[582]:truncate rounded-lg max-[496]:justify-between max-[496]:max-w-[250px] max-[717]:text-lg max-[666]:text-sm hover:bg-primary hover:text-white max-[918]:text- max-[582]:text-[.6rem] font-bolds text-2xl flex-1/3 flex max-[582]:font-regular items-center justify-between max-sm:px-2 max-sm:py-1 px-4 py-2 bg-white shadow-lg"><Send className="max-[500]:w-2 max-[500]:h-2 text-white rounded-sm p-1 w-[28px] bg-secondary h-[28]"/><p className="max-[496]:text-sm">Transfer</p></button>
            <button onClick={handleSavings} className="max-[582]:truncate rounded-lg max-[496]:justify-between max-[496]:max-w-[250px] max-[717]:text-lg max-[666]:text-sm hover:bg-primary hover:text-white font-bolds max-[918]:text-xl max-[582]:text-[.6rem] max-[582]:font-regular text-2xl flex-1/3 flex items-center justify-between max-sm:px-2 max-sm:py-1 px-4 py-2 bg-white shadow-lg"><PiggyBank className="max-[500]:h-2 max-[500]:w-2 text-white rounded-sm p-1 w-[28px] bg-secondary h-[28]"/><p className="max-[496]:text-sm">Add to savings</p></button>
            <button onClick={handleLoan} className=" max-[582]:truncate rounded-lg max-[496]:justify-between max-[666]:text-sm max-[496]:max-w-[250px] max-[717]:text-lg hover:bg-primary hover:text-white font-bolds max-[918]:text-xl max-[582]:text-[.6rem] max-[582]:font-regular text-2xl flex-1/3 flex items-center justify-between max-sm:px-2 max-sm:py-1 px-4 py-2 bg-white shadow-lg"><Banknote className="text-white max-[500]:h-2 rounded-sm p-1 w-[28px] bg-secondary h-[28] max-[500]:w-2"/><p className="max-[496]:text-sm">Apply for loan</p></button>
        </div>
        <div className="w-full flex mt-5 h-70 max-sm:h-fit gap-x-4 max-sm:flex-col max-sm:gap-y-2">
            <div className="flex-2/3 p-4 bg-white rounded-lg shadow-lg h-full">
            <p className="font-regular text-sm text-center fixed">Recent transactions</p>
            {
                transfer.length != 0 ? (<div className="overflow-y-scroll h-full">
                    {
                        transfer.map((e, index)=>(<div key={index} className="flex border-t border-gray-400 mt-2 items-center justify-between font-regular text-sm py-1">
                            <div>
                                <ArrowUpCircle fill="green" stroke="#b9f8cf"/>
                            </div>
                            <div className="">
                                <p className="text-lg font-bolds max-sm:text-sm">Transfer to {e.name}</p>
                                <p className="font-regular max-sm:text-sm">{e.bank.toLocaleLowerCase()}, {e.number}</p>
                            </div>
                            <div>
                                <p className="font-bold max-sm:text-sm">&#8358; {e.amount.toFixed(2)}</p>
                                <p className="text-green-200 text-sm px-1 font-regular rounded-sm bg-green-700">successful</p>
                            </div>
                        </div>))
                    }
                </div>) : null
            }
            </div>
            <div className="flex-1/3 max-sm:w-full p-4 bg-white rounded-lg shadow-lg h-full">
                <p className="font-regular text-sm">Analysis</p>
            </div>
        </div>
    </div>
  )
}
