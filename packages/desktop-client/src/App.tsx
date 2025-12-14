import { useEffect, useState } from "react";

const App = () => {
  const handleSelectFolder = async () => {
    window.electronAPI.folder.select();
  };

  const [loadProgress, setLoadProgress] = useState<number>(0);

  useEffect(() => {
    // This adds event listener but doesn't remove it so there will be several
    window.electronAPI.folder.progress((data: any) => {
      console.log("tock", data);
      setLoadProgress(data);
    });
  });

  return (
    <>
      <div id="hello">Hello</div>;
      <div className="app">Progress: {loadProgress}</div>;
      <button onClick={handleSelectFolder}>Select folder</button>
    </>
  );
};

export default App;
