import { Diory } from "@monorepo-nodemon/core";

const App = () => {
  const diory: Diory = { id: "1224", text: "jee" };
  const handleSelectFolder = async () => {
    window.electronAPI.selectFolder();
  };
  return (
    <>
      <div className="app">{JSON.stringify(diory)}</div>;
      <button onClick={handleSelectFolder}>Select folder</button>
    </>
  );
};

export default App;
