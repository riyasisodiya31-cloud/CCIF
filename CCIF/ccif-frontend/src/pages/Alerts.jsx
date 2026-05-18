import {useEffect,useState} from "react";
import {motion} from "framer-motion";

import {getAlerts}
from "../services/alertService";

export default function Alerts(){

const [alerts,setAlerts]=useState([]);

useEffect(()=>{

async function load(){

const data=
await getAlerts();

setAlerts(data);

}

load();

},[])

return(

<div className="space-y-8">

<div>

<p className="text-cyan-400 uppercase tracking-[0.3em]">
Live Intelligence
</p>

<h1 className="text-5xl font-bold">
Threat Alerts
</h1>

</div>

<div className="space-y-6">

{alerts.map((alert,index)=>(

<motion.div
key={alert.id}

initial={{
opacity:0,
x:-40
}}

animate={{
opacity:1,
x:0
}}

transition={{
delay:index*0.1
}}

className="
rounded-3xl
bg-white/5
border
border-red-500/20
backdrop-blur-xl
p-6
"
>

<div className="flex justify-between">

<div>

<h2 className="text-xl">
{alert.type}
</h2>

<p className="text-zinc-400 mt-2">
{alert.message}
</p>

</div>

<div>

<div className="
px-3
py-2
rounded-full
bg-red-500/10
text-red-400
">

{alert.severity}

</div>

</div>

</div>

</motion.div>

))}

</div>

</div>

)

}