import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./components/AllRoutes";

function App(): JSX.Element {
  return (
    <Router>
      <AllRoutes />
    </Router>
  );
}

export default App;
