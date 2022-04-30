import { useState, useEffect } from "react";
import "./App.css";

const URL = "https://polished-sea-922.getsandbox.com:443/products";

function App() {
  const [formState, setFormState] = useState({
    description: "",
    confirmation: "",
    vatValue: "",
    priceNetto: "",
    priceBrutto: 0,
  });

  const { description, confirmation, vatValue, priceNetto, priceBrutto } = formState;

  // Form Validation
  useEffect(() => {
    const descriptionValidation = () => {
      const descriptionInput = document.getElementById("description");
      if (description.length === 0) descriptionInput.setCustomValidity("Text is required");
      else if (description.length > 255) {
        const maxLength = description.substring(0, 255);
        setFormState({ ...formState, description: maxLength });
        descriptionInput.setCustomValidity("You can't enter more than 255 characters");
        descriptionInput.reportValidity();
      } else descriptionInput.setCustomValidity("");
    };
    descriptionValidation();
  }, [description]);

  useEffect(() => {
    const priceNettoInput = document.getElementById("priceNetto");
    if (priceNetto === "" || priceNetto === ".")
      priceNettoInput.setCustomValidity("Please, input number");
    else priceNettoInput.setCustomValidity("");
  }, [priceNetto]);

  const priceNettoValidation = (value) => {
    const valueExceptLastChar = value.slice(0, value.length - 1);
    if (valueExceptLastChar.includes(".") && valueExceptLastChar.match(/\d\d$/)) {
      value = value.replace(/\d$/, "");
    }
    if (valueExceptLastChar.includes(".")) {
      value = value.replace(/\.$/, "").replace(/,$/, "");
    }
    const onlyNumberValue = value
      .replace(/[^.,0-9]/g, "")
      .replace(/^0\d/, 0)
      .replace(",", ".");
    setFormState({ ...formState, priceNetto: onlyNumberValue });
  };

  const updateInputValue = (id, value) => {
    if (id === "priceNetto") priceNettoValidation(value);
    else setFormState({ ...formState, [id]: value });
  };

  const confirmationAndVatValidation = () => {
    const confirmationInput = document.getElementById("confirmationYes");
    if (confirmation === "") confirmationInput.setCustomValidity("Text is required");
    else confirmationInput.setCustomValidity("");

    const vatValueInput = document.getElementById("vatValue");
    if (vatValue === "") vatValueInput.setCustomValidity("Text is required");
    else vatValueInput.setCustomValidity("");
  };

  // Calculating brutto price
  useEffect(() => {
    const calculatePriceBrutto = () => {
      const calculatedPriceBrutto = (1 + Number(vatValue) / 100) * priceNetto;
      setFormState({ ...formState, priceBrutto: calculatedPriceBrutto.toFixed(2) });
    };
    calculatePriceBrutto();
  }, [priceNetto, vatValue]);

  //Sending form data
  const sendData = (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const request = new XMLHttpRequest();
    const data = new FormData(form);

    data.append("priceBrutto", priceBrutto);

    request.open("POST", URL, true);
    request.send(data);

    request.addEventListener("loadend", handleResponse);
  };

  const handleResponse = (e) => {
    const successMsg = document.querySelector(".success-message");
    const failureMsg = document.querySelector(".failure-message");
    if (e.target.readyState && e.target.status) successMsg.classList.add("show-message");
    else failureMsg.classList.add("show-message");
  };

  return (
    <div className="App">
      <main>
        <form id="form" onSubmit={(e) => sendData(e)}>
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
                id="confirmationYes"
                value="yes"
                required
                onChange={(e) => updateInputValue(e.target.name, e.target.value)}
              />
              <label htmlFor="confirmationYes"> Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="confirmation"
                id="confirmationNo"
                value="no"
                required
                onChange={(e) => updateInputValue(e.target.name, e.target.value)}
              />
              <label htmlFor="confirmationNo"> No</label>
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
          <button type="submit" onClick={confirmationAndVatValidation}>
            Submit
          </button>
        </form>
      </main>
      <section className="response-messages">
        <div className="success-message">
          <h4>Gratulations!</h4>
          <p>Form has been sent successfully.</p>
        </div>
        <div className="failure-message">
          <h4>Something went wrong.</h4>
          <p>An error occurred while submitting the form.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
