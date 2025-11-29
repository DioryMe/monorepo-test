import { Diory } from "@monorepo-nodemon/core";

const App = () => {
  const diory: Diory = { id: "1224", text: "jee" };
  return <div className="app">{JSON.stringify(diory)}</div>;
};

export default App;
