import { supabase } from "@/lib/supabaseClient"
import { NextRequest, NextResponse } from "next/server"

let password :string;
let mail :string;
export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const action = searchParams.get("action");
    if (action === 'signup'){
        const formData = await req.json()
        const url = new URL(req.url)
        const origin = url.origin
        const redirectUrl = `${origin}/verified`
        const {data, error} = await supabase.auth.signInWithPassword({email: formData.email, password: formData.password})
        if(data.user){
            await supabase.auth.signOut({scope:"global"})
            return NextResponse.json({answer: "account already exist"})
        }else if(error?.code=="Invalid login credentials"){
            return NextResponse.json({answer: error.code})
        }else if(error?.code == "invalid_credentials"){
            const {data, error} = await supabase.auth.signUp({email: formData.email, password: formData.password, options:{
                emailRedirectTo: redirectUrl
            }})
            password = formData.password
            mail = formData.email
            if(error){
                return NextResponse.json({error: error.message})
            }else if(data){
                return NextResponse.json({answer: "success"})
            }
        }

    }

    if(action=="complete"){
        const formData = await req.formData()
        const fullname = formData.get('fullname') as string
        const profile = formData.get('profile') as File
        const address = formData.get('address') as string
        const bvn = formData.get('bvn') as string
        const dob = formData.get('dob') as string
        const nickName = formData.get('nickName') as string
        const phone = formData.get('phone') as string
        const loanDate = ''
        const loanAmount = 0
        const accountBal = 5000
        const code = Math.floor(10000000 + Math.random() * 90000000)
        const accountNumber = `13${code}`
        
        const {data, error} = await supabase.auth.signInWithPassword({email: mail, password: password})
        if(error){
            console.error(error)
            return NextResponse.json({answer: error.code})
        }else if(data){
            const userId  = data.user.id
            const filePath = `${userId}/${profile.name}`
            const store = await supabase.storage
            .from("avatar")
            .upload(filePath, profile)
            if(store.error){
                NextResponse.json({error: store.error.message})
                console.error('failed to upload file', store.error.message)
            }else{
                const {data:{ publicUrl }} = supabase.storage
                .from("avatar")
                .getPublicUrl(filePath)
                const database = await supabase
                .from("users")
                .insert({id: userId, fullname: fullname, accountBalance: accountBal, address: address,
                    BVN: bvn, dob: dob, profile: publicUrl ,loanAmount: loanAmount, loanDate: loanDate, 
                    accountNumber: accountNumber, nickName: nickName, phone: phone, email: mail
                })
                if(database.error){
                    return NextResponse.json({error: database.error.code})
                }else{
                    return NextResponse.json({id: nickName})
                }
            }
        }
    }
    if(action == 'getuser'){
        const body = await req.json()
        const id = body.id
        const {data, error} = await supabase.auth.getUser()
        if(data){
            const owner = await supabase
            .from('users')
            .select("*")
            .eq("id", data.user?.id)
            .eq("nickName", id)
            .single()
            if(owner.data){
                const transfer = await supabase.from("transfer").select("transfer_details").eq("id", data.user?.id).single()
                if(transfer.data?.transfer_details){
                    const own = owner.data
                    const me = transfer.data
                    const newData = []
                    newData.push(own, me)
                    return NextResponse.json({data: newData})
                }else{
                    return NextResponse.json({data: owner.data})
                }
            }
        }else if(error){
            return NextResponse.json({error: error.code})
        }
    }

    if(action == 'login'){
        const body = await req.formData()
        const email = body.get('email') as string
        const password = body.get('password') as string
        const {data, error} = await supabase.auth.signInWithPassword({email: email, password: password})
        if(error){
            return NextResponse.json({login: error ,error: error.code})
        }else{
            const id = data.user.id
            const details = await supabase
            .from('users')
            .select('nickName')
            .eq("id", id)
            .single()
            return NextResponse.json({nickName: details.data?.nickName})
        }
    }

    if(action == 'name'){
        const body = await req.json()
        const {data, error} = await supabase.auth.getUser()
        if(error){
            return NextResponse.json({error: error.code})
        }else if(data.user){
            const owner = await supabase
            .from("users")
            .update({fullname: body.name})
            .eq('id',data.user.id)
            .select()
            if(error){
                return NextResponse.json({error: owner.error?.code})
            }else if(typeof(owner.data) != 'undefined'){
                return NextResponse.json({answer: 'updated'})
            }
        }else{
            return NextResponse.json({data: data.user})
        }
    }
    if(action == 'phone'){
        const body = await req.json()
        const {data, error} = await supabase.auth.getUser()
        if(error){
            return NextResponse.json({error: error.code})
        }else if(data.user){
            const owner = await supabase
            .from("users")
            .update({phone: body.phone})
            .eq('id',data.user.id)
            .select()
            if(error){
                return NextResponse.json({error: owner.error?.code})
            }else if(typeof(owner.data) != 'undefined'){
                return NextResponse.json({answer: 'updated'})
            }
        }else{
            return NextResponse.json({data: data.user})
        }
    }

    if(action == 'mail'){
        const body = await req.json()
        const {data, error} = await supabase.auth.getUser()
        if(error){
            return NextResponse.json({error: error.code})
        }else if(data.user){
            const owner = await supabase
            .from("users")
            .update({email: body.mail})
            .eq('id',data.user.id)
            .select()
            if(error){
                return NextResponse.json({error: owner.error?.code})
            }else if(typeof(owner.data) != 'undefined'){
                return NextResponse.json({answer: 'updated'})
            }
        }else{
            return NextResponse.json({data: data.user})
        }
    }

    if(action == "loan"){
        const body = await req.json()
        const user = await supabase.auth.getUser()
        if(user.error){
            return NextResponse.json({error: user.error.code})
        }else{
            const userId = user.data.user.id
            const {data, error} = await supabase
            .from("users")
            .select("accountBalance")
            .eq("id",userId)
            .single()
            if(error){
                return NextResponse.json({error: error.code})
            }else{
                const them = data.accountBalance
                const me = body.data.lAmount + them
                const user = await supabase
                .from("users")
                .update({accountBalance: me, loanAmount: body.data.estimatedAmount, loanDate: body.data.Date})
                .eq("id",userId)
                .select()
                if(user.data){
                    return NextResponse.json({answer: "updated"})
                }else{
                    return NextResponse.json({error: user.error})
                }
            }
        }
    }

    if(action == "payback"){
        const body = await req.json()
        const user = await supabase.auth.getUser()
        if(user.error){
            return NextResponse.json({error: user.error.code})
        }else{
            const userId = user.data.user.id
            const {data, error} = await supabase
            .from("users")
            .select("accountBalance")
            .eq("id",userId)
            .single()
            if(error){
                return NextResponse.json({error: error.code})
            }else{
                const them = data.accountBalance
                const me = them - body.money
                const user = await supabase
                .from("users")
                .update({accountBalance: me, loanAmount: 0, loanDate: ''})
                .eq("id",userId)
                .select()
                if(user.data){
                    return NextResponse.json({answer: "payed"})
                }else{
                    return NextResponse.json({error: user.error})
                }
            }
        }
    }
    if(action == "transfer"){
        async function updateAccount({id, num}:{id:string, num: number}){
            const user = await supabase.from('users').select('accountBalance').eq('id', id).single()
            if (user.data?.accountBalance){
                const me = user.data.accountBalance
                const newMe = me-num
                const { data, error } = await supabase.from('users').update({accountBalance: newMe}).eq("id", id).select()
                if(data){
                    return NextResponse.json({transfer: "successful"})
                }else{
                    return NextResponse.json({error: error.message})
                }
            }
        }
        const body :{amount: number}= await req.json()
        const file = await supabase.auth.getUser()
        if(file.data.user){
            const id: string= file.data.user.id
            const {data, error} = await supabase
            .from("transfer")
            .select('transfer_details')
            .eq("id", id)
            .single()
            if(error?.details.includes("The result contains 0 rows")){
                const create = await supabase.from("transfer").insert({id: id, transfer_details: [body]}).single()
                if(create.error){
                    return NextResponse.json({error: create.error})
                }else{
                    updateAccount({id, num: body.amount})
                    return NextResponse.json({transfer: "successful"})
                }
            }else if(data){
                const array = data?.transfer_details
                if(array.length == 5){
                    array.pop()
                    const newArray = [body, ...array]
                    const update = await supabase.from("transfer").update({transfer_details: newArray}).eq("id", id).select()
                    if(update.data){
                        updateAccount({id, num: body.amount})
                        return NextResponse.json({transfer: "successful"})
                    }else{
                        return NextResponse.json({error: update.error.message})
                    }
                }else if(array.length < 5){
                    const oldArray = [body, ...array]
                    const  newArray = oldArray
                    const update = await supabase.from("transfer").update({transfer_details: newArray}).eq("id", id).select()
                    if(update.data){
                        updateAccount({id, num: body.amount})
                        return NextResponse.json({transfer: "successful", lengt: update})
                    }else{
                        return NextResponse.json({error: update.error})
                    }
                }
            }else{
                return NextResponse.json(error)
            }
        }
    }
}

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url)
    const action = searchParams.get("action");
    if(action == "verify"){
        const {data, error} = await supabase.auth.signInWithPassword({email: mail, password: password})
        if(data.user){
            return NextResponse.json({verified: data.user})
        }else if(error){
            return NextResponse.json({verified: false})
        }
    }

    if(action == 'check'){
        const {data, error} = await supabase.auth.getUser()
        if(!data.user || error){
            return NextResponse.json({in: false})
        }else{
            return  NextResponse.json({in: true})
        }
    }
}
