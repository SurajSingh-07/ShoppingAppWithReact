import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Details from "./Components/Details.jsx";
import Create from "./Components/Create.jsx";
import Edit from "./Components/Edit.jsx";

function App() {
  const { search, pathname } = useLocation();

  return (
    <>
      <div className="h-screen w-screen flex">
        {(pathname != "/" || search.length > 0) && (
          <Link
            to="/"
            className="text-red-400 absolute left-[18%] top-[3%] border border-zinc-900 px-2 py-1 rounded font-bold"
          >
            Home
          </Link>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
