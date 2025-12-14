import { useEffect, useState } from "react";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [loading, setLoading] = useState(false);
  const handleSelectFolder = async () => {
    try {
      const result = await window.electronAPI.folder.select();
      if (result.success) {
        setLoading(true);
      }
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <>
      <div id="hello">Hello</div>
      {loading && <LoadingComponent />}
      <button onClick={handleSelectFolder}>Select folder</button>
    </>
  );
};

export default App;
