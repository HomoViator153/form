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

  const { description, confirmation, vatValue, priceNetto, priceBrutto } = formState;

  const updateInputValue = (id, value) => {
    console.log(id, value);
    setFormState({ ...formState, [id]: value });
  };

  return (
    <div className="App">
      <main>
        <form id="form">
          <div className="description-container">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="40"
              rows="10"
              required
              value={description}
              onChange={(e) => updateInputValue(e.target.id, e.target.value)}
            />
            <span>{description.length} / 255</span>
          </div>
          <div className="confirmation-container">
            <p>Send confirmation</p>
            <div>
              <input
                type="radio"
                name="confirmation"
                id="confirmation-yes"
                value="yes"
                required
                onChange={(e) => updateInputValue(e.target.name, e.target.value)}
              />
              <label htmlFor="confirmation-yes"> Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="confirmation"
                id="confirmation-no"
                value="no"
                required
                onChange={(e) => updateInputValue(e.target.name, e.target.value)}
              />
              <label htmlFor="confirmation-no"> No</label>
            </div>
          </div>
          <div className="vat-container">
            <label htmlFor="vatValue">VAT: </label>
            <select
              name="vatValue"
              id="vatValue"
              required
              value={vatValue}
              onChange={(e) => updateInputValue(e.target.id, e.target.value)}>
              <option value="" disabled hidden>
                Choose VAT
              </option>
              <option value="19">19%</option>
              <option value="21">21%</option>
              <option value="23">23%</option>
              <option value="25">25%</option>
            </select>
          </div>
          <div className="netto-container">
            <label htmlFor="priceNetto">Price netto EUR</label>
            <input
              type="text"
              name="priceNetto"
              id="priceNetto"
              required
              disabled={vatValue ? false : true}
              value={priceNetto}
              onChange={(e) => updateInputValue(e.target.id, e.target.value)}
            />
          </div>
          <div className="brutto-container">
            <label htmlFor="priceBrutto">Price brutto EUR</label>
            <input
              type="text"
              name="priceBrutto"
              id="priceBrutto"
              required
              disabled
              value={priceBrutto}
            />
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
