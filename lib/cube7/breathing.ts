export type BreathingPhase = "inhale" | "hold" | "exhale" | "rest";

export const BREATHING_SEQUENCE = {
  inhale: 4,
  hold: 2,
  exhale: 6,
  rest: 2,
} as const;

export function getBreathingState(elapsedSeconds: number) {
  const cycleDuration =
    BREATHING_SEQUENCE.inhale +
    BREATHING_SEQUENCE.hold +
    BREATHING_SEQUENCE.exhale +
    BREATHING_SEQUENCE.rest;

  const wrapped = ((elapsedSeconds % cycleDuration) + cycleDuration) % cycleDuration;

  if (wrapped < BREATHING_SEQUENCE.inhale) {
    const progress = wrapped / BREATHING_SEQUENCE.inhale;
    return { phase: "inhale" as const, breathProgress: progress };
  }

  const holdEnd = BREATHING_SEQUENCE.inhale + BREATHING_SEQUENCE.hold;
  if (wrapped < holdEnd) {
    return { phase: "hold" as const, breathProgress: 1 };
  }

  const exhaleEnd = holdEnd + BREATHING_SEQUENCE.exhale;
  if (wrapped < exhaleEnd) {
    const progress = 1 - (wrapped - holdEnd) / BREATHING_SEQUENCE.exhale;
    return { phase: "exhale" as const, breathProgress: progress };
  }

  return { phase: "rest" as const, breathProgress: 0 };
}
