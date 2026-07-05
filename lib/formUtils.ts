import { NormalizedLandmark } from "@mediapipe/tasks-vision";
export function elbowAngle(elbow: NormalizedLandmark, shoulder: NormalizedLandmark, wrist: NormalizedLandmark) {
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
    
export function bodyAngle(shoulder: NormalizedLandmark, hip: NormalizedLandmark, ankle: NormalizedLandmark) {
    if (shoulder.visibility < 0.5 || hip.visibility < 0.5 || ankle.visibility < 0.5) {
        return 180; // Return 180 if any of the landmarks are not visible enough
    }
    const v1 = { x: hip.x - shoulder.x, y: hip.y - shoulder.y };
    const v2 = { x: ankle.x - hip.x, y: ankle.y - hip.y };      

    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
    const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
    if (mag1 === 0 || mag2 === 0) return 180; // Avoid division by zero
    return Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2)))) * (180 / Math.PI);
}

export function feedbackMessage(worstAngle: number, worstBodyAngle: number): string {
    // Score each dimension: 2 = great, 1 = good, 0 = needs work
    const elbowScore = worstAngle < 90 ? 2 : worstAngle < 110 ? 1 : 0;
    const bodyScore = worstBodyAngle >= 170 ? 2 : worstBodyAngle >= 160 ? 1 : 0;
    const overall = Math.min(elbowScore, bodyScore);

    if (overall === 2) {
        return "Perfect rep — flawless form!";
    }

    if (overall === 1) {
        // Solid rep, nudge the weaker dimension
        if (elbowScore <= bodyScore) {
            return "Good rep — try going a little lower";
        }
        return "Good rep — keep your hips level";
    }

    // Needs improvement — call out the specific fault(s)
    if (elbowScore === 0 && bodyScore === 0) {
        return "Go lower and keep your back straight";
    }
    if (elbowScore === 0) {
        return "Bend your elbows more — go deeper";
    }
    return "Keep your back straight — no sagging";
}