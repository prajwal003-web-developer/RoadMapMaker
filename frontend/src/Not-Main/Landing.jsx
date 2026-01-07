import React from "react";
import Navbar from "./Components/Navbar";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-200">
      <Navbar />

      {/* HERO — visually different */}
      <section className="relative h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <p className="text-sm tracking-wider text-purple-400 mb-2">
              BUILD FASTER, LEARN SMARTER
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="text-purple-500">AI-Generated</span> Learning
              Roadmaps
            </h1>

            <p className="mt-4 text-lg text-gray-300">
              Turn your goals into step-by-step learning plans using
              <span className="text-blue-400"> Gemini Flash</span>.
              Track progress, mark topics done, and stay consistent.
            </p>

            <div className="mt-8 flex gap-4">
              {isSignedIn ? (
                <button
                  onClick={() => navigate("/home")}
                  className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition shadow-lg shadow-green-800/30"
                >
                  Go To Home
                </button>
              ) : (
                <button
                  onClick={() => navigate("/sign-in")}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition shadow-lg shadow-purple-800/30"
                >
                  Get Started
                </button>
              )}

              <button
                onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}
                className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1">
            <div className="rounded-3xl bg-gray-800/40 overflow-hidden backdrop-blur-xl h-72 md:h-96 flex items-center justify-center border border-gray-700 shadow-2xl shadow-purple-900/20">
              <img src="/Head.jpg" className="h-full w-full" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-6xl mx-auto px-6 space-y-16 py-16">

        {/* CARD 1 */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden bg-gray-800/30 backdrop-blur-xl border border-gray-700 flex items-center justify-center">
             <img src="/1.png" className="h-full w-full " alt="" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-purple-400">
              1. Tell Us Your Goal
            </h2>

            <p className="mt-3 text-gray-300">
              Start by describing your learning goal. Choose your:
            </p>

            <ul className="mt-3 list-disc ml-6 space-y-1 text-gray-300">
              <li>Beginner / Intermediate / Advanced level</li>
              <li>8-week / 6-month / 12-month duration</li>
            </ul>

            <p className="mt-3 text-gray-400">
              Our AI generates a fully structured roadmap for you.
            </p>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* CARD 2 */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              2. Explore Your Roadmap
            </h2>

            <p className="mt-3 text-gray-300">
              Your generated roadmap includes a sidebar to jump between topics.
            </p>

            <ul className="mt-3 list-disc ml-6 space-y-1 text-gray-300">
              <li>Topics and steps</li>
              <li>Subtopics</li>
              <li>Explanation and guidance</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-gray-800/30 backdrop-blur-xl overflow-clip h-72 border border-gray-700 flex items-center justify-center">
            <img src="/2.png" className="h-full w-full" alt="" />
          </div>
        </section>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* CARD 3 */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-clip bg-gray-800/30 backdrop-blur-xl h-72 border border-gray-700 flex items-center justify-center">
             <img src="/3.png" className="h-full w-full" alt="" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-pink-400">
              3. Week-wise & Full View
            </h2>

            <p className="mt-3 text-gray-300">
              Switch between:
            </p>

            <ul className="mt-3 list-disc ml-6 text-gray-300 space-y-1">
              <li>Week-wise structured plan</li>
              <li>Full roadmap view</li>
            </ul>

            <p className="mt-2 text-gray-400">
              Each view has its own progress indicator.
            </p>
          </div>
        </section>

        {/* CARD 4 */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-400">
              4. Track & Update Progress
            </h2>

            <ul className="mt-3 list-disc ml-6 text-gray-300 space-y-1">
              <li>Mark topics as read/unread</li>
              <li>See total progress percentage</li>
              <li>Week-wise progress bars</li>
            </ul>

            <p className="mt-3 text-gray-400">
              Upcoming features:
            </p>

            <ul className="mt-3 list-disc ml-6 text-gray-400 space-y-1">
              <li>Add notes</li>
              <li>Save resources</li>
              <li>Share roadmaps</li>
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden bg-gray-800/30 backdrop-blur-xl h-72 border border-gray-700 flex items-center justify-center">
             <img src="/4.png" className="h-full w-full" alt="" />
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-gray-800 py-8 text-center text-gray-400">
        <div className="text-lg font-semibold tracking-wide">
          Roadmap Generator © {new Date().getFullYear()}
        </div>
        <div className="text-sm mt-2">
          Built with React • Clerk • Gemini Flash • 
        </div>
      </footer>
    </div>
  );
};

export default Landing;
