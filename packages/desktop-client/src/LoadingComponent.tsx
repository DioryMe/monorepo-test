import { useEffect, useState } from "react";

type LoadingState = "loading" | "done" | "error";

export const LoadingComponent = () => {
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<LoadingState>("loading");

  useEffect(() => {
    const handleProgressEvent = (eventData: any) => {
      console.log("progressEventData", eventData);
      setProgress(eventData);
    };
    const unsubscribe = window.electronAPI.folder.progress(handleProgressEvent);

    return () => unsubscribe();
  }, []);

  if (state === "loading") {
    return <div>Loading... {progress}%</div>;
  }

  if (state === "done") {
    return <div>Done!</div>;
  }

  if (state === "error") {
    return <div>Error</div>;
  }
};
