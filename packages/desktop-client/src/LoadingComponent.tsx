import { useEffect, useState } from "react";

type LoadingState = "loading" | "done" | "error";

export const LoadingComponent = () => {
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<LoadingState>("loading");

  useEffect(() => {
    const unsubscribe = window.electronAPI.folder.progress((data: any) => {
      setProgress(data);
    });

    return () => (unsubscribe as any)();
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
