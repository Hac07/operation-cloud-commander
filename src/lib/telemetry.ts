import type { TelemetryEvent } from "./types";

type TrackFn = (eventName: string, properties?: Record<string, string>) => void;

function getTrackFn(): TrackFn | null {
  if (typeof window === "undefined") return null;
  try {
    // Vercel Analytics injects window.va
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const va = (window as any).va;
    if (typeof va === "function") return va;
    return null;
  } catch {
    return null;
  }
}

export function trackEvent(
  name: TelemetryEvent["name"],
  extras?: Partial<Omit<TelemetryEvent, "name" | "timestamp">>
): void {
  try {
    const event: TelemetryEvent = {
      name,
      source: extras?.source ?? "unknown",
      timestamp: new Date().toISOString(),
      ...(extras?.missionId ? { missionId: extras.missionId } : {}),
    };

    const track = getTrackFn();
    if (track) {
      track(event.name, {
        source: event.source,
        ...(event.missionId ? { missionId: event.missionId } : {}),
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.debug("[telemetry]", event);
    }
  } catch {
    // Fail silently — analytics must never crash the app
  }
}
