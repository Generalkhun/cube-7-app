"use client";

import { Canvas, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FocusCube } from "@/components/cube7/FocusCube";
import { SessionUI } from "@/components/cube7/SessionUI";
import { getBreathingState } from "@/lib/cube7/breathing";
import { SESSION_DURATION_SECONDS, formatSessionTime } from "@/lib/cube7/session";

function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    gsap.to(camera.position, {
      x: 0,
      y: 0.18,
      z: 5.6,
      duration: 1.8,
      ease: "power2.out",
    });
    gsap.to(camera.rotation, {
      x: -0.12,
      y: 0.18,
      z: 0,
      duration: 1.8,
      ease: "power2.out",
    });
  }, [camera]);

  return null;
}

export function SessionExperience() {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isPaused || isComplete) return;

    const timerId = window.setInterval(() => {
      setElapsed((current) => {
        const next = current + 0.1;
        if (next >= SESSION_DURATION_SECONDS) {
          setIsComplete(true);
          return SESSION_DURATION_SECONDS;
        }
        return next;
      });
    }, 100);

    return () => window.clearInterval(timerId);
  }, [isMounted, isPaused, isComplete]);

  useEffect(() => {
    if (!rootRef.current || !isComplete) return;

    gsap.to(rootRef.current, {
      opacity: 0.14,
      duration: 1.6,
      ease: "power2.inOut",
    });
  }, [isComplete]);

  useEffect(() => {
    if (!rootRef.current || !isMounted) return;

    gsap.fromTo(
      rootRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
    );
  }, [isMounted]);

  const breathing = getBreathingState(elapsed);
  const remaining = Math.max(0, SESSION_DURATION_SECONDS - elapsed);

  const handleTogglePause = () => setIsPaused((current) => !current);
  const handleExit = () => router.push("/");

  return (
    <div className="session-page" ref={rootRef}>
      <Canvas camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 2]}>
        <CameraRig />
        <color attach="background" args={["#050a10"]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 4, 5]} intensity={1.6} color="#dfe9ff" />
        <pointLight position={[-3, -2, -2]} intensity={1.4} color="#7ea9ff" />
        <FocusCube
          breathProgress={breathing.breathProgress}
          phase={breathing.phase}
          isComplete={isComplete}
        />
      </Canvas>

      <SessionUI
        phase={breathing.phase.toUpperCase()}
        timerLabel={formatSessionTime(remaining)}
        isPaused={isPaused}
        isComplete={isComplete}
        onTogglePause={handleTogglePause}
        onExit={handleExit}
      />
    </div>
  );
}
