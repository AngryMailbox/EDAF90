import { useState, useId } from "react";
import Salad from "./lab1.mjs";
import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom";

function Select({ label, value, options, onChange, inventory }) {
  const id = useId();
  return (
    <fieldset className="col-md-12 mt-4">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="form-select"
        id={id}
        required
      >
        <option value="">Inget valt</option>{" "}
        {/* sätter inget valt som första options för validering */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option} ({inventory[option].price}kr)
          </option>
        ))}
      </select>
      <div className="invalid-feedback">
        Vänligen välj en {label.toLowerCase()}.
      </div>
      <div className="valid-feedback">Korrekt.</div>
    </fieldset>
  );
}

function ComposeSalad() {
  const { addSaladToCart } = useOutletContext();
  const inventory = useLoaderData();
  const navigate = useNavigate();

  const foundationList = Object.keys(inventory).filter(
    (name) => inventory[name].foundation
  );
  const proteinList = Object.keys(inventory).filter(
    (name) => inventory[name].protein
  );
  const dressingList = Object.keys(inventory).filter(
    (name) => inventory[name].dressing
  );

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extras, setExtras] = useState({ Bacon: true, Fetaost: true });

  const [touched, setTouched] = useState(false);

  function handleFoundation(event) {
    setFoundation(event.target.value);
  }

  function handleProtein(event) {
    setProtein(event.target.value);
  }

  function handleDressing(event) {
    setDressing(event.target.value);
  }

  function handleExtraChange(event) {
    const { name, checked } = event.target;
    setExtras((prevExtras) => ({
      ...prevExtras,
      [name]: checked,
    }));
  }

  function handleSubmit(event) {
    setTouched(true);
    event.preventDefault();

    if (!event.target.checkValidity()) {
      return;
    }

    let newSalad = new Salad();
    newSalad
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing]);

    Object.keys(extras).forEach((extra) => {
      if (extras[extra]) {
        newSalad.add(extra, inventory[extra]);
      }
    });

    addSaladToCart(newSalad);

    navigate(`/view-order/confirm/${newSalad.uuid}`);

    setFoundation("");
    setProtein("");
    setDressing("");
    setExtras({ Bacon: true, Fetaost: true });
    setTouched(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`container col-12 ${touched ? "was-validated" : ""}`}
      noValidate
    >
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>

        <Select
          label="Välj Bas"
          value={foundation}
          options={foundationList}
          onChange={handleFoundation}
          inventory={inventory}
        />

        <Select
          label="Välj Protein"
          value={protein}
          options={proteinList}
          onChange={handleProtein}
          inventory={inventory}
        />

        <Select
          label="Välj Dressing"
          value={dressing}
          options={dressingList}
          onChange={handleDressing}
          inventory={inventory}
        />

        <fieldset className="col-md-12 mt-4">
          <legend>Välj extra tillbehör</legend>
          <div className="row-md-4">
            {Object.keys(inventory)
              .filter((name) => inventory[name].extra)
              .map((item) => (
                <div key={item}>
                  <input
                    type="checkbox"
                    name={item}
                    checked={!!extras[item]}
                    onChange={handleExtraChange}
                  />
                  <label>
                    {item} ({inventory[item].price}kr)
                  </label>
                </div>
              ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary mt-4">
          Lägg till sallad
        </button>
      </div>
    </form>
  );
}

export default ComposeSalad;
