'use client';
import { useEffect, useRef, useState } from "react";
import draw from "../../lib/poseUtils"
import { elbowAngle, bodyAngle, feedbackMessage } from "../../lib/formUtils"
import {usePoseDetection} from "../../hooks/usePoseDetection"




export default function HomePage() {

    const worstAngle = useRef<number>(180);
    const phase = useRef<"Up" | "Down">("Up"); 
    const [repCount, setRepCount] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");
    const worstBodyAngle = useRef<number>(180);

   

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
        <div
            style={{ position: "absolute", left: "30%", top: "10%", width: "40%", height: "40%" }}
        >   
            <button onClick={start}>Launch</button>
            <div>Reps: {repCount}</div>
            <div style = {{position: 'relative'}}>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "100%" }} />
            <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
            </div>
            <div>{feedback}</div>
        </div>
    );
}