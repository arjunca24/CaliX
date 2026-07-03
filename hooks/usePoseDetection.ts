import { FilesetResolver, PoseLandmarker,NormalizedLandmark} from "@mediapipe/tasks-vision";
import { useEffect, useRef } from "react";

 async function setupPoseLandmarker(poseLandmarker: React.MutableRefObject<PoseLandmarker | null>) {
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

function loadVideo(videoRef: React.RefObject<HTMLVideoElement | null>, canvasRef: React.RefObject<HTMLCanvasElement | null>,onReady : () => void) {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current && canvasRef.current)   {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
        }
      };
      videoRef.current.onplaying = () => {
        onReady();
      }
    }
  });
}

export function usePoseDetection() {
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const poseLandmarker = useRef<PoseLandmarker | null>(null);
      const videoRef = useRef<HTMLVideoElement | null>(null);
      const landmarks = useRef<NormalizedLandmark[][]>([]);
      useEffect(() => {
              setupPoseLandmarker(poseLandmarker);
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
                      landmarks.current = results.landmarks;
                      
                      
                      lastVideoTime.current = videoRef.current.currentTime;
                  }
                  requestAnimationFrame(renderLoop);
              }
          
              function start() {
              loadVideo(videoRef, canvasRef,renderLoop);

                  
              }
      return    { canvasRef, videoRef, start,landmarks};  
}