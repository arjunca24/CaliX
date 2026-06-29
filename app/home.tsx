import { useEffect, useRef, useState } from "react";
import { FilesetResolver, NormalizedLandmark, PoseLandmarker } from "@mediapipe/tasks-vision";

function elbowAngle(elbow: NormalizedLandmark, shoulder: NormalizedLandmark, wrist: NormalizedLandmark) {
    if (elbow.visibility < 0.5 || shoulder.visibility < 0.5 || wrist.visibility < 0.5) {
        return 180; // Return 180 if any of the landmarks are not visible enough
    }
    const v1 = { x: shoulder.x - elbow.x, y: shoulder.y - elbow.y };
    const v2 = { x: wrist.x - elbow.x, y: wrist.y - elbow.y };

    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
    const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
    if (mag1 === 0 || mag2 === 0) return 180; // Avoid division by zero

    return Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2)))) * (180 / Math.PI); 
}
    


function draw(result: NormalizedLandmark[], ctx: CanvasRenderingContext2D | null | undefined, canvas: HTMLCanvasElement | null) {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const connections = [
        [7, 3], [3, 2], [2, 1], [1, 0], [0, 4], [4, 5], [5, 6], [6, 8],
        [11, 13], [13, 15], [15, 21], [21, 15], [15, 19], [19, 17], [17, 15],
        [12, 14], [14, 16], [16, 22], [22, 16], [16, 20], [20, 18], [18, 16],
        [11, 12], [12, 24], [24, 23], [23, 11],
        [23, 25], [25, 27], [27, 29], [29, 31],
        [24, 26], [26, 28], [28, 30], [30, 32],
    ];
    connections.forEach(([a, b]) => {
        if (result[a].visibility < 0.5 || result[b].visibility < 0.5) return;
        ctx.beginPath();
        ctx.moveTo(result[a].x*canvas.width, result[a].y*canvas.height);
        ctx.lineTo(result[b].x*canvas.width, result[b].y*canvas.height);
        ctx.stroke();
    });
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
    const worstAngle = useRef<number>(180);

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
            
            const ctx = canvasRef.current?.getContext("2d")
           // console.log(results.landmarks[0]);
            draw(results.landmarks[0], ctx, canvasRef.current);
            worstAngle.current = Math.min(worstAngle.current, elbowAngle(results.landmarks[0][13], results.landmarks[0][11], results.landmarks[0][15]));
            worstAngle.current = Math.min(worstAngle.current, elbowAngle(results.landmarks[0][14], results.landmarks[0][12], results.landmarks[0][16]));

            
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