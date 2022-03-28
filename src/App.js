import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import CharacterInfo from "./components/CharacterInfo";
import Characters from "./components/Characters";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element = {<ProtectedRoutes />}>
              <Route path="/characters" element={<Characters />} />
              <Route path="/characters/:id" element={<CharacterInfo />} />
          </Route>
          
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
