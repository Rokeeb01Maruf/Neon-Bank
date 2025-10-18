'use client'
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState('hidden')
  const [switc, setSwitch] = useState(1)
  return (
    <div className="bg-light min-h-screen">
      <header className="h-16 bg-primary text-white flex px-25 max-[1134]:px-20 max-[871]:px-15 max-[809]:px-10 max-[500]:px-2.5 justify-between items-center">
        <Link href='' className="logo flex gap-x-2.5">
          <img src="./Images/Neon-light.png" className="w-6 h-6" alt="" />
          <h3 className="font-boldser text-xl">Neon Bank</h3>
        </Link>
        <nav className={`nav max-[990]:border-t-light max-[990]:border-t ${show} min-[990]:flex flex items-center font-bolds max-[990]:absolute max-[990]:top-15 max-[990]:w-full
        max-[990]:bg-primary max-[990]:items-start max-[990]:left-0 max-[990]:items-left z-10 max-[990]:flex-col gap-x-12`}>
          <Link href='' className="hover:text-blue-400 max-[990]:hover:bg-blue-400 max-[990]:font-regular max-[990]:hover:text-primary max-[990]:w-full max-[990]:px-4 transition ease-in-out duration-500 px-5 py-2">Home</Link>
          <Link href='' className="hover:text-blue-400 max-[990]:hover:bg-blue-400 max-[990]:font-regular max-[990]:hover:text-primary transition max-[990]:px-4 max-[990]:w-full  ease-in-out duration-500 px-5 py-2">Dashboard</Link>
          <Link href='' className="hover:text-blue-400 max-[990]:hover:bg-blue-400 max-[990]:font-regular max-[990]:hover:text-primary transition max-[990]:px-4 ease-in-out max-[990]:w-full duration-500 px-5 py-2">Transaction</Link>
          <Link href='/Login' className="hover:text-blue-400 max-[990]:hover:bg-blue-400 max-[990]:font-regular max-[990]:hover:text-primary transition max-[990]:px-4 ease-in-out max-[990]:w-full duration-500 px-5 py-2">Log in</Link>
          <Link href='/Signup' className="bg-secondary max-[990]:bg-primary rounded-3xl max-[990]:px-4 max-[990]:rounded-none max-[990]:font-regular hover:bg-blue-400 max-[990]:w-full  transition duration-500 hover:text-primary px-5 py-2">Sign Up</Link>
        </nav>
        {
          switc == 1 ?(
        <Menu onClick={()=>{
          setSwitch(0)
          setShow('')
        }} className={`cursor-pointer hidden max-[990]:flex hover:text-secondary`}/>
          ):(
          <X onClick={()=>{
          setSwitch(1)
          setShow('max-[990]:hidden')
        }} className={`cursor-pointer hidden max-[990]:flex hover:text-secondary`}/>
          )
        }
      </header>
      <main className="flex mx-25 max-[1134]:mx-20 max-[871]:mx-15 max-[809]:mx-10 max-[500]:mx-2.5 max-[981]:flex-col">
        <div className="hero">
          <h2 className="font-boldser text-primary max-sm:text-2xl max-[871]:text-3xl max-[871]:py-6  py-10 text-4xl">Fortified security, seamless banking</h2>
          <p className="font-regular text-hash w-full :">We provide a safe and secured environment for you to make transfers, payments and track your accounteasily with our internet banking anytimeand anywhere. Sign up or log in to our internet banking now.</p>
          <button className="my-5 font-bolds hover:bg-blue-400 transition duration-500 hover:text-primary p bg-secondary rounded-3xl px-5 py-2 cursor-pointer text-white">Get Started</button>
        </div>
        <img src="/Images/hero.png" className="rotate-z-12 max-[981]:w-[500] max-[500]:w-full  max-[981]:mx-auto  w-91.5  min-[980]:animate-roll" alt="" />
      </main>
      <aside className="mx-25 max-[1134]:mx-20 max-[871]:mx-15 max-[809]:mx-10 max-[500]:mx-2.5">
        <h2 className="font-boldser text-primary max-[871]:text-3xl max-sm:text-2xl text-4xl">Our Services</h2>
          <div className="service mt-5 grid max-[1134]:grid-cols-3 gap-y-3.5 grid-cols-5 gap-x-3.5 max-sm:grid-cols-2">
            <div className="each-service text-center shadow-[0px_3px_6px_rgba(0,0,0,0.4)] bg-[#E4E3E8] p-3 rounded-2xl">
              <img src="/Images/savings.png" className="w-13 mx-auto" alt="" />
              <h3 className="font-bolds">Savings</h3>
              <p className="text-sm font-light text-hash">Grow your money securely with flexible savings options</p>
            </div>
            <div className="each-service text-center shadow-[0px_3px_6px_rgba(0,0,0,0.4)] bg-[#E4E3E8] p-3 rounded-2xl">
              <img src="/Images/loan.png" className="w-13 mx-auto" alt="" />
              <h3 className="font-bolds">Loan</h3>
              <p className="text-sm font-light text-hash">Get the funds you need when you need them</p>
            </div>
            <div className="each-service text-center shadow-[0px_3px_6px_rgba(0,0,0,0.4)] bg-[#E4E3E8] p-3 rounded-2xl">
              <img src="/Images/transfer.png" className="w-13 mx-auto" alt="" />
              <h3 className="font-bolds">Transfer</h3>
              <p className="text-sm font-light text-hash">Grow your money securely with flexible savings options</p>
            </div>
            <div className="each-service text-center shadow-[0px_3px_6px_rgba(0,0,0,0.4)] bg-[#E4E3E8] p-3 rounded-2xl">
              <img src="/Images/security.png" className="w-13 mx-auto" alt="" />
              <h3 className="font-bolds">Security</h3>
              <p className="text-sm font-light text-hash">Get the funds you need when you need them</p>
            </div>
            <div className="each-service text-center shadow-[0px_3px_6px_rgba(0,0,0,0.4)] bg-[#E4E3E8] p-3 rounded-2xl">
              <img src="/Images/transfer.png" className="w-13 mx-auto" alt="" />
              <h3 className="font-bolds">Transfer</h3>
              <p className="text-sm font-light text-hash">Grow your money securely with flexible savings options</p>
            </div>
          </div>
      </aside>
      <footer className="bg-primary px-25 mt-5 pt-5 flex justify-between max-[1041]:flex-col max-[1043]:justify-center
      max-[832]:text-sm max-[1134]:px-20 max-[871]:px-15 max-[809]:px-10 max-[500]:px-2.5">
        <div className="details flex flex-col max-[763]:gap-y-2 max-[763]:mb-5">
          <div className="faq flex text-blue-200 font-light gap-x-5 max-[763]:flex-col max-[763]:gap-y-5 max-[763]:text-[.8rem]">
            <Link href="" className="hover:text-white cursor-pointer underline max-[763]:no-underline">Disclaimer</Link>
            <Link href="" className="hover:text-[#E4E3E8] cursor-pointer underline max-[763]:no-underline">Terms and Condition</Link>
            <Link href="" className="hover:text-[#E4E3E8] cursor-pointer underline max-[763]:no-underline">Privacy and Security Statement</Link>
            <Link href="" className="hover:text-[#E4E3E8] cursor-pointer underline max-[763]:no-underline">Manage Cookies</Link>
          </div>
          <h3 className="text-white mt-3 font-regular w-150 max-[1041]:w-full"><strong>Neon bank, </strong>a member of the Global Digital Finance Network, is a licensed financial service provider regulated by the Central Bank of Nigeria. RC45097</h3>
        </div>
        <div className="s">
          <div className="socials flex gap-x-5">
            <Link href=''><img src="/Images/gmail.png" alt="" className="w-6" /></Link>
            <Link href=''><img src="/Images/instagram.png" alt="" className="w-6" /></Link>
            <Link href=''><img src="/Images/phone.png" alt="" className="w-6" /></Link>
            <Link href=''><img src="/Images/linkedin.png" alt="" className="w-6" /></Link>
          </div>
          <div className="text-secondary text-sm leading-[1.2] my-1">
            <h3 className="font-bolds underline">Support</h3>
            <p className="font-light">Local: +234 808 124 2090</p>
            <p className="font-light">International: +1 808 124 2090</p>
            <p className="font-light">Email: dayorokeeb234@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
