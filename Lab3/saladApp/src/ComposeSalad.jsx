import { v4 as uuidv4 } from "uuid";
import { useState, useId } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Salad from "./lab1.mjs";

const Select = ({ label, onChange, value, options }) => {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        required={true}
        onChange={onChange}
        value={value}
        className="form-select"
        id={id}
      >
        <option value={""}>Gör ditt val</option>
        {options.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
};

const ComposeSalad = () => {
  const { inventory } = useOutletContext();
  const { addSaladToCart } = useOutletContext();
  const navigate = useNavigate();

  const foundationList = Object.keys(inventory).filter(
    (name) => inventory[name].foundation
  );

  const proteinList = Object.keys(inventory).filter(
    (name) => inventory[name].protein
  );

  const extrasList = Object.keys(inventory)
    .filter((name) => inventory[name].extra)
    .map((name) => ({
      name: name,
      price: inventory[name].price,
    }));

  const dressingList = Object.keys(inventory).filter(
    (name) => inventory[name].dressing
  );

  const [touched, setTouched] = useState(false);

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [extras, setExtras] = useState({});
  const [dressing, setDressing] = useState("");

  const handleFoundation = (e) => {
    console.log(e.target.value);
    setFoundation(e.target.value);
  };

  const handleProtein = (e) => {
    console.log(e.target.value);
    setProtein(e.target.value);
  };

  const handleExtras = (e) => {
    const name = e.target.name;
    setExtras({ ...extras, [name]: e.target.checked });
  };

  const handleDressing = (e) => {
    setDressing(e.target.value);
  };

  const handleSubmit = (e) => {
    setTouched(true);
    event.preventDefault();

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
  };

  return (
    <form className={touched ? "was-validated" : ""} noValidate>
      <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Välj innehållet i din sallad</h2>

          <fieldset className="col-md-12">
            <Select
              label="Välj bas"
              value={foundation}
              onChange={handleFoundation}
              options={foundationList}
            />

            <Select
              label="Välj protein"
              value={protein}
              onChange={handleProtein}
              options={proteinList}
            />

            <label className="form-label">Välj extras</label>
            <div className="form-check">
              <div className="row">
                {extrasList.map((props) => (
                  <div key={props.name} className="col-4">
                    <input
                      type="checkbox"
                      id={props.name}
                      name={props.name}
                      checked={!!extras[props.name]}
                      onChange={handleExtras}
                    />
                    <label htmlFor={props.name}>
                      {props.name + " " + props.price + "kr"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Select
              value={dressing}
              onChange={handleDressing}
              options={dressingList}
            />
          </fieldset>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Lägg till sallad
        </button>
      </div>
    </form>
  );
};
export default ComposeSalad;
