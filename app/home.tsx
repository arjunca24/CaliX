import { useEffect, useRef, useState } from "react";
import { FilesetResolver, NormalizedLandmark, PoseLandmarker } from "@mediapipe/tasks-vision";

function draw(result: NormalizedLandmark[], ctx: CanvasRenderingContext2D | null | undefined, canvas: HTMLCanvasElement | null) {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    result.forEach((landmark) => {
        if (landmark.visibility < 0.5) return;
        ctx.beginPath();
        ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 5, 0, Math.PI * 2);
        ctx.stroke();
    });
   }
export default function HomePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const poseLandmarker = useRef<PoseLandmarker | null>(null);

    useEffect(() => {
        async function setupPoseLandmarker() {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );
            const landmarker = await PoseLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
                },
                runningMode: "VIDEO",
            });
            poseLandmarker.current = landmarker;
        }
        setupPoseLandmarker();
    }, []);

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current && canvasRef.current) {
                        canvasRef.current.width = videoRef.current.videoWidth;
                        canvasRef.current.height = videoRef.current.videoHeight;
                        
                    }
            }
        }});
    }, []);

    const lastVideoTime = useRef<number>(-1);
    function renderLoop() {
        if (
            poseLandmarker.current &&
            videoRef.current &&
            videoRef.current.currentTime !== lastVideoTime.current
        ) {
            const results = poseLandmarker.current.detectForVideo(
                videoRef.current,
                videoRef.current.currentTime * 1000
            );
            const canvas = canvasRef.current
            const ctx = canvas?.getContext("2d")
           // console.log(results.landmarks[0]);
            draw(results.landmarks[0], ctx, canvas);
            canvasRef.current = canvas;
            lastVideoTime.current = videoRef.current.currentTime;
        }
        requestAnimationFrame(renderLoop);
    }

    async function start() {
        if (videoRef.current) {
            renderLoop();
        }
    }

    return (
        <div
            style={{ position: "absolute", left: "30%", top: "10%", width: "40%", height: "40%" }}
        >
            <button onClick={start}>Launch</button>
            <div style = {{position: 'relative'}}>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "100%" }} />
            <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
            </div>
        </div>
    );
}