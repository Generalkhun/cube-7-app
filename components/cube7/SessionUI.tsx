import Link from "next/link";

export type SessionUIProps = {
  phase: string;
  timerLabel: string;
  isPaused: boolean;
  isComplete: boolean;
  onTogglePause: () => void;
  onExit: () => void;
};

export function SessionUI({
  phase,
  timerLabel,
  isPaused,
  isComplete,
  onTogglePause,
  onExit,
}: SessionUIProps) {
  return (
    <div className="session-overlay">
      <header className="session-topbar">
        <div className="session-brand">FOCUS CUBE</div>
        <div className="session-controls">
          {!isComplete && (
            <button type="button" className="session-button" onClick={onTogglePause}>
              {isPaused ? "Resume" : "Pause"}
            </button>
          )}
          <button type="button" className="session-button subtle" onClick={onExit}>
            {isComplete ? "Exit" : "Exit"}
          </button>
        </div>
      </header>

      <div className="session-readout">
        <div className="phase-pill">{phase}</div>
        <div className="timer-display">{timerLabel}</div>
      </div>

      {isComplete && (
        <div className="completion-state" aria-live="polite">
          <p className="completion-label">SESSION COMPLETE</p>
          <p className="completion-note">Take a moment.</p>
          <Link href="/" className="completion-link">
            EXIT
          </Link>
        </div>
      )}
    </div>
  );
}
