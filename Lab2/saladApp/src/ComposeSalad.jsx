import { v4 as uuidv4 } from "uuid";
import { useState, useId } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const { inventory, handleSetSalad } = useOutletContext();
  console.log("HEJHEJHEJ");
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
  const [price, setPrice] = useState(0);

  const calcPrice = () => {
    let price = 0;
    price += inventory[foundation].price;
    price += inventory[protein].price;
    for (const extra in extras) {
      if (extras[extra]) {
        price += inventory[extra].price;
      }
    }
    price += inventory[dressing].price;
    console.log(price);
    return price;
  };

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

  const handleSubmitSalad = (e) => {
    e.preventDefault();

    setTouched(true);

    const salad = {
      foundation,
      protein,
      extras,
      dressing,
      price: calcPrice(),
    };
    handleSetSalad(salad);

    setFoundation("Pasta");
    setProtein("Kycklingfilé");
    setExtras({});
    setDressing("Ceasardressing");

    const uniqueId = uuidv4();
    navigate(`/view-order/confirm/${uniqueId}`);
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
        <button className="btn btn-primary" onClick={handleSubmitSalad}>
          Lägg till sallad
        </button>
      </div>
    </form>
  );
};
export default ComposeSalad;
