import { MainContextProvider } from "./contexts/mainContextProvider";
import ReactRouter from "./Router";

function App() {
  return (
    <MainContextProvider>
      <ReactRouter />
    </MainContextProvider>
  );
}

export default App;
