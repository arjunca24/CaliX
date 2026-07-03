import {NormalizedLandmark} from "@mediapipe/tasks-vision";

export default function draw(result: NormalizedLandmark[], ctx: CanvasRenderingContext2D | null | undefined, canvas: HTMLCanvasElement | null) {
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