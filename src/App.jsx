import { useState } from "react";
import "./App.css";
import Pokedex from "./components/Pokedex/Pokedex";
import Search from "./components/Search/Search";
import PokemonList from "./components/PokemonList/PokemonList";
import CustomRoutes from "./Routes/CustomRoutes";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="outer-pokedex">
    <h1 id='pokedex-heading'>
      <Link to='/'>Pokedex</Link>
      </h1>
      <CustomRoutes />
    </div>
  );
}

export default App;
