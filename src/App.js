import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import FrontPage from "./pages/Frontpage";
import About from "./pages/About";
import Content from "./components/Content";
import LanguageSelect from "./components/LanguageSelect";
import "./i18n";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Content>
          <Routes>
            <Route  path="/" element={<FrontPage />}/>
            <Route  path="/about" element={<About />}/>
          </Routes>
        </Content>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
