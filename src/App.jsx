import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import AppLayout from "./components/AppLayout/appLayout";
import Analytics from "./pages/Analytics/analytics";
import Strategy from "./pages/Strategy/strategy";
import Briefs from "./pages/Briefs/briefs";
import Saved from "./pages/Saved/saved";
import Library from "./pages/Library/library";
import Settings from "./pages/Settings/settings";
import Help from "./pages/Help/help";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/briefs" element={<Briefs />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/library" element={<Library />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
