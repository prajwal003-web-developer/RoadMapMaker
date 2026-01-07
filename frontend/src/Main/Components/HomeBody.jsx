import { useAuth } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import {
  FaBullseye,
  FaUserGraduate,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { io } from "socket.io-client";
import api from "../../api";

const URL = import.meta.env.VITE_URL

const steps = [
  "Processing data",
  "Fetching roadmap data",
  "Saving to database",
  "Saved successfully",
];

const HomeBody = () => {
  const [aim, setAim] = useState("");
  const [level, setLevel] = useState("");
  const [timeline, setTimeline] = useState("");

  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const { userId } = useAuth();

  const [Socket, setSocket] = useState(null);

  useEffect(() => {
    let socket;
    if (userId) {
      socket = io(URL, {
        query: {
          userId: userId,
        },
      });
      setSocket(socket);
    }

    socket.on('passedLevel',()=>{
      setStepIndex(p=>p+1)
    })


    return () => socket?.close();
  }, [userId]);




  const handleSubmit = async () => {
    if (!aim || !level || !timeline) {
      toast.error("Please Fill Properly");
      return;
    }
    setLoading(true);

    try {
      const data = await api.post('/project/get-roadmap',{aim,level,timeline})

      console.log(data.data[0])
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed To Do So"
      );
    }
    finally{
      //setLoading(false)
      setStepIndex(5)
      location.reload()
    }

    
  };

  // simulate backend steps
  

  return (
    <div className="bg-black flex justify-center items-center rounded h-[98dvh] text-zinc-200">
      {/* FORM BOX */}
      {!loading && (
        <div className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h1 className="text-zinc-100 font-semibold md:text-3xl text-xl mb-4 flex items-center gap-2">
            <FaBullseye className="text-zinc-400" />
            Make Your Roadmap
          </h1>

          {/* Aim */}
          <textarea
            placeholder="Write your aim..."
            value={aim}
            onChange={(e) => setAim(e.target.value)}
            className="w-full min-h-[90px] resize-none p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-500 mb-5"
          />

          {/* Level */}
          <div className="mb-5">
            <p className="flex items-center gap-2 text-sm mb-2 text-zinc-400">
              <FaUserGraduate />
              Level
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Beginner", "Intermediate", "Experienced"].map((item) => (
                <button
                  key={item}
                  onClick={() => setLevel(item)}
                  className={`px-4 py-2 rounded-lg text-sm transition
                    ${
                      level === item
                        ? "bg-zinc-700"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <p className="flex items-center gap-2 text-sm mb-2 text-zinc-400">
              <FaClock />
              Timeline
            </p>
            <div className="flex gap-2 flex-wrap">
              {["8 Weeks", "6 Months", "12 Months"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTimeline(item)}
                  className={`px-4 py-2 rounded-lg text-sm transition
                    ${
                      timeline === item
                        ? "bg-zinc-700"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition font-medium"
          >
            <FaPaperPlane />
            Create Roadmap
          </button>
        </div>
      )}

      {/* PROCESSING BOX */}
      {loading && (
        <div className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-zinc-100">
            Creating your roadmap
          </h2>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 text-sm">
                {index < stepIndex ? (
                  <FaCheckCircle className="text-green-500" />
                ) : index === stepIndex ? (
                  <FaSpinner className="animate-spin text-zinc-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-zinc-600" />
                )}

                <span
                  className={
                    index <= stepIndex ? "text-zinc-200" : "text-zinc-500"
                  }
                >
                  {step}
                </span>
              </div>
            ))}
          </div>

          {stepIndex === steps.length-1 && (
            <button className="mt-6 w-full py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition">
              Visit Roadmap →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeBody;
