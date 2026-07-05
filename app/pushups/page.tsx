'use client';
import { useEffect, useRef, useState } from "react";
import draw from "../../lib/poseUtils"
import { elbowAngle, bodyAngle, feedbackMessage } from "../../lib/formUtils"
import {usePoseDetection} from "../../hooks/usePoseDetection"
import { Navbar } from "../home"




export default function HomePage() {

    const worstAngle = useRef<number>(180);
    const phase = useRef<"Up" | "Down">("Up"); 
    const [repCount, setRepCount] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");
    const worstBodyAngle = useRef<number>(180);
    const [isActive, setIsActive] = useState(false);

   

    const { canvasRef, videoRef, start, landmarks } = usePoseDetection();

    function renderLoop() {
    if (!landmarks.current[0]) {
        requestAnimationFrame(renderLoop);
        return;
    }
    const ctx = canvasRef.current?.getContext("2d")

    draw(landmarks.current[0], ctx, canvasRef.current);
          
                      const currentAngle = Math.min(elbowAngle(landmarks.current[0][13], landmarks.current[0][11], landmarks.current[0][15]), elbowAngle(landmarks.current[0][14], landmarks.current[0][12], landmarks.current[0][16]));
                      worstAngle.current = Math.min(worstAngle.current, currentAngle);  
                      
                      const currentBodyAngle = Math.min(bodyAngle(landmarks.current[0][11], landmarks.current[0][23], landmarks.current[0][27]), bodyAngle(landmarks.current[0][12], landmarks.current[0][24], landmarks.current[0][28]));            
                      worstBodyAngle.current = Math.min(worstBodyAngle.current, currentBodyAngle);
          
                      if (currentAngle < 120 && phase.current === "Up") {
                          phase.current = "Down";
                      }
                      else if (currentAngle > 160 && phase.current === "Down") {
                          phase.current = "Up";
                          setRepCount(prevCount => prevCount + 1);
                          setFeedback(feedbackMessage(worstAngle.current, worstBodyAngle.current));
                          worstBodyAngle.current = 180; // Reset worst body angle for the next rep
                          worstAngle.current = 180; // Reset worst angle for the next rep
                      }
                      requestAnimationFrame(renderLoop);
                    }
    useEffect(() => {
        requestAnimationFrame(renderLoop);
    }, []);
    return (
        <div className="h-screen bg-[#f5ecdf] flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 overflow-hidden">
            <div className="w-full max-w-2xl flex flex-col gap-5 relative">

                {/* Feedback — above the frame */}
                <div className="h-9 flex items-center justify-center">
                    {feedback && (
                        <span className={`text-base font-black tracking-widest uppercase ${
                            feedback.includes("Perfect")
                                ? "text-emerald-600"
                                : feedback.includes("Good")
                                ? "text-sky-600"
                                : "text-rose-600"
                        }`}>
                            {feedback}
                        </span>
                    )}
                </div>

                {/* Video hero */}
                <div className="relative rounded-2xl overflow-hidden p-[1px] bg-[#e6dcc9] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] max-h-[60vh] aspect-video">
                <div className="relative rounded-[15px] overflow-hidden w-full h-full bg-[#ffffff]">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full max-h-[60vh] object-cover block" />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

                    {/* Idle placeholder */}
                    {!isActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
                            <div className="p-4 rounded-2xl bg-black/5 backdrop-blur-md border border-black/10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10 text-[#16a34a]">
                                    <circle cx="12" cy="12" r="10" strokeOpacity={0.3} />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5l3 3M19.5 5.5l-3 3M4.5 18.5l3-3M19.5 18.5l-3-3" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#1c1917] font-semibold text-lg tracking-tight">Get in position</p>
                                <p className="text-[#846f5c] text-sm mt-1.5 max-w-xs">Line up in frame for pushups, then press Start to begin form analysis</p>
                            </div>
                        </div>
                    )}

                    {/* Rep counter — top left */}
                    <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md border border-black/10 rounded-xl px-5 py-3 flex flex-col items-center shadow-lg">
                        <span className="text-[#171717] text-4xl font-bold leading-none tabular-nums">{repCount}</span>
                        <span className="text-[#171717]/50 text-[10px] font-medium uppercase tracking-[0.15em] mt-1">reps</span>
                    </div>

                    {/* Phase indicator — top right */}
                    <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-md border border-black/10 rounded-xl px-5 py-3 flex items-center gap-2 shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shadow-[0_0_8px_2px_rgba(22,163,74,0.4)]" />
                        <span className="text-[#16a34a] text-sm font-semibold uppercase tracking-wide">{phase.current}</span>
                    </div>

                </div>
                </div>

                {/* Start button */}
                <button
                    onClick={() => { start(); setIsActive(true); }}
                    className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-base py-4 rounded-xl transition-all duration-150 shadow-[0_10px_30px_-10px_rgba(22,163,74,0.5)] hover:shadow-[0_10px_35px_-8px_rgba(22,163,74,0.65)]"
                >
                    Start
                </button>


            </div>
            </div>
        </div>
    );
}