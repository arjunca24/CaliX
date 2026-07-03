import { useEffect, useRef, useState } from "react";
import { FilesetResolver, NormalizedLandmark, PoseLandmarker } from "@mediapipe/tasks-vision";
import Link from "next/link";

export default function HomePage() {
    
    return (
        <div>
            <Link href = "/pushups">Push-ups</Link>
        </div>
    );
}