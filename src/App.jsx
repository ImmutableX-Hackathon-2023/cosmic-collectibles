import { Route, Routes } from "react-router-dom";

import About from "./components/About";
import Controls from "./components/Controls";
import Error from "./components/Error";
import Game from "./components/Game";
import Login from "./components/Login2"

export default function App() {
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen bg-gradient-to-r from-indigo-900 via-violet-700 to-pink-500 ">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/about" element={<About />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}
