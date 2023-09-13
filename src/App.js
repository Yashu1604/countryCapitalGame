import "./App.css";
import CountryCapitalGame from "./CountryCapitalGame";

function App() {
  const data = {
    Germany: "Berlin",
    Azerbaijan: "Baku",
    Poland: "Warsaw",
    "Papua New Guinea": "Port Moresby",
  };
  return (
    <div className="App">
      <CountryCapitalGame data={data} />
    </div>
  );
}

export default App;
