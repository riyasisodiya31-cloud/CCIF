import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { getCases } from "../services/caseService";

export default function Cases() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    async function loadCases() {
      const data = await getCases();
      setCases(data);
    }

    loadCases();
  }, []);

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase">
            Intelligence Network
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Active Investigations
          </h1>

          <p className="text-zinc-400 mt-3">
            Connected criminal activity monitored by CCIF
          </p>
        </div>

        <Link to="/cases/new" className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200">
          <Plus size={18} />
          Add Case
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {cases.map((item, index) => (

          <Link key={item.id} to={`/cases/${item.id}`}>
          <motion.div
            initial={{ opacity:0,y:30 }}
            animate={{ opacity:1,y:0 }}
            transition={{
              delay:index*0.1
            }}
            whileHover={{
              scale:1.02
            }}
            className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-cyan-500/20
            bg-white/5
            backdrop-blur-xl
            p-6
            shadow-[0_0_40px_rgba(0,255,255,0.08)]
            cursor-pointer
            "
          >
            <Link to={`/cases/${item.id}`} className="absolute inset-0 z-10" aria-label={`Open ${item.title}`} />

            <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/10 blur-3xl"/>

            <div className="flex justify-between">

              <div>

                <p className="text-zinc-500 text-xs">
                  {item.id}
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                  {item.title}
                </h2>

                <p className="text-zinc-400 mt-3">
                  📍 {item.location}
                </p>

              </div>

              <div>

                <div className="
                px-4
                py-2
                rounded-full
                bg-cyan-500/10
                text-cyan-400
                text-sm
                ">
                  {item.status}
                </div>

              </div>

            </div>

          </motion.div>
          </Link>

        ))}

      </div>
    </div>
  )
}
