
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileBeamsBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    speed: number;
    opacity: number;
    hue: number;
}

function createBeam(width: number, height: number): Beam {
    return {
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * height * 1.2 - height * 0.1,
        width: 20 + Math.random() * 30, // Reduced width
        length: height * 1.5, // Reduced length
        speed: 0.3 + Math.random() * 0.5, // Reduced speed
        opacity: 0.08 + Math.random() * 0.08, // Reduced opacity
        hue: 200 + Math.random() * 60,
    };
}

export function MobileBeamsBackground({
    className,
    intensity = "medium",
    children,
}: MobileBeamsBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 8; // Reduced beam count

    const opacityMap = {
        subtle: 0.5,
        medium: 0.7,
        strong: 0.9,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            // Lower DPR for mobile performance
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            beamsRef.current = Array.from({ length: MINIMUM_BEAMS }, () =>
                createBeam(canvas.width, canvas.height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam) {
            if (!canvas) return beam;
            
            beam.y = canvas.height + 50;
            beam.x = Math.random() * canvas.width;
            beam.width = 20 + Math.random() * 30;
            beam.speed = 0.3 + Math.random() * 0.3;
            beam.hue = 200 + Math.random() * 60;
            beam.opacity = 0.08 + Math.random() * 0.06;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate(-30 * Math.PI / 180); // Fixed angle for simplicity

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            const adjustedOpacity = beam.opacity * opacityMap[intensity];

            gradient.addColorStop(0, `hsla(${beam.hue}, 70%, 60%, 0)`);
            gradient.addColorStop(0.3, `hsla(${beam.hue}, 70%, 60%, ${adjustedOpacity})`);
            gradient.addColorStop(0.7, `hsla(${beam.hue}, 70%, 60%, ${adjustedOpacity})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, 70%, 60%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        let lastFrameTime = 0;
        const targetFPS = 30; // Limit FPS for mobile
        const frameInterval = 1000 / targetFPS;

        function animate(currentTime: number) {
            if (currentTime - lastFrameTime < frameInterval) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime = currentTime;

            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(20px)"; // Reduced blur

            beamsRef.current.forEach((beam) => {
                beam.y -= beam.speed;

                if (beam.y + beam.length < -50) {
                    resetBeam(beam);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate(0);

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity]);

    return (
        <div
            className={cn(
                "relative min-h-screen w-full overflow-hidden bg-slate-900",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ filter: "blur(8px)" }} // Reduced blur
            />

            <motion.div
                className="absolute inset-0 bg-slate-950/20"
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                }}
            />

            {children}
        </div>
    );
}
