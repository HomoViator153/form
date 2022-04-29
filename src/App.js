import { useState } from "react";

import "./App.css";

function App() {
  const [formState, setFormState] = useState({
    description: "",
    confirmation: "",
    vatValue: "",
    priceNetto: "",
    priceBrutto: "",
  });
  return (
    <div className="App">
      <form></form>
    </div>
  );
}

export default App;
