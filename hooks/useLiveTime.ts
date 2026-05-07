"use client";

import { useEffect, useState } from "react";

function formatLiveTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(new Date());
}

export function useLiveTime(timeZone = "Asia/Dubai") {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setTime(formatLiveTime(timeZone));
    }, 0);

    const interval = window.setInterval(() => {
      setTime(formatLiveTime(timeZone));
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [timeZone]);

  return time;
}
