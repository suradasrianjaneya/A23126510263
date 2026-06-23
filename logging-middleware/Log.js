require("dotenv").config();

const logapi = process.env.LOG_API;
const token = process.env.API_TOKEN;

export async function Log(stack,level,packageName,message) {
    try{
        const res = await fetch(logapi,{
            method : "POST",
            headers : {
                'content-type':"application/json",
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                stack,
                level,
                package:packageName,
                message
            })
        });
        const data = await res.json();
        console.log("Log Created",data);
    }
    catch(error)
    {
        console.log(error);
    }
}
