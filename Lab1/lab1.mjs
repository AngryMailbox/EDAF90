"use strict";
import { v4 as uuidv4 } from "uuid";
/**
 * Reflection question 1
 * Eftersom värdena sätts till false/null som default så kommer dessa att returneras
 * om det inte finns en true-property.
 */

import inventory from "./inventory.mjs";
console.log("\n=== beginning of printout ================================");
console.log("inventory:", inventory);

console.log("\n--- Object.keys() ---------------------------------------");
const names = Object.keys(inventory);
names.sort((a, b) => a.localeCompare(b, "sv", { sensitivity: "case" })).forEach((name) => console.log(name));

console.log("\n--- for ... in ---------------------------------------");
for (const name in inventory) {
  console.log(name);
}
/**
 * Object.keys() returnerar en array med egenskaperna i objektet.
 * for ... in loopar är över alla objektets egenskaper.
 */

console.log("\n--- Assignment 1 ---------------------------------------");

const makeOptions = (inv, prop) => {
  let options = [];
  Object.entries(inv)
    .filter(([key, vals]) => vals[prop] === true)
    .forEach(([name, vals]) =>
      options.push(`<option value="${name}" key="${name}">${name}, ${vals["price"]} kr</option>`)
    );
  return options;
};
console.log(makeOptions(inventory, "foundation"));

console.log("\n--- Assignment 2 ---------------------------------------");
class Salad {
  ingredients = [];
  static id = 0;
  static instanceCounter = 0;

  constructor(salad) {
    this.id = "salad_" + Salad.instanceCounter++;
    if (salad) {
      this.uuid = salad.uuid;
      this.ingredients = salad.ingredients;
    } else {
      const uuid = uuidv4();
      this.uuid = uuid;
      this.ingredients = [];
    }
  }
  add(name, props) {
    this.ingredients.push([name, props]);
    return this;
  }
  remove(name) {
    this.ingredients = this.ingredients.filter(([key, v]) => key != name);
    return this;
  }

  getPrice() {
    let sum = 0;
    this.ingredients.forEach(([name, props]) => (sum += props["price"]));
    return sum;
  }

  count(prop) {
    return this.ingredients.filter(([name, props]) => props[prop] === true).length;
  }

  static parse(json) {
    const parsed = JSON.parse(json);

    if (Array.isArray(parsed)) return parsed.map((item) => new Salad(item));
    else return new Salad(parsed);
  }
}

class GourmetSalad extends Salad {
  add(name, props, quantity) {
    if (quantity) {
      props = { ...props, price: props["price"] * quantity };
    }
    this.ingredients.push([name, props]);
    return this;
  }
}

let myCaesarSalad = new Salad()
  .add("Sallad", inventory["Sallad"])
  .add("Kycklingfilé", inventory["Kycklingfilé"])
  .add("Bacon", inventory["Bacon"])
  .add("Krutonger", inventory["Krutonger"])
  .add("Parmesan", inventory["Parmesan"])
  .add("Ceasardressing", inventory["Ceasardressing"])
  .add("Gurka", inventory["Gurka"]);
console.log(JSON.stringify(myCaesarSalad) + "\n");
myCaesarSalad.remove("Gurka");
console.log(JSON.stringify(myCaesarSalad) + "\n");

console.log("\n--- Assignment 3 ---------------------------------------");
console.log("En ceasarsallad kostar " + myCaesarSalad.getPrice() + "kr");
// En ceasarsallad kostar 45kr
console.log("En ceasarsallad har " + myCaesarSalad.count("lactose") + " ingredienser med laktos");
// En ceasarsallad har 2 ingredienser med laktos
console.log("En ceasarsallad har " + myCaesarSalad.count("extra") + " tillbehör");
// En ceasarsallad har 3 tillbehör

console.log("\n--- reflection question 3 ---------------------------------------");
/**
 * Alla objekt i JavaScript har en länk i kedjan till ett annat objekt, som kallas för objektets prototyp.
 * Prototyp-kedjan funkar på så vis att om ett objekt saknar något så kollar JavaScript högre upp i kedjan.
 * Detta har med arv att göra.
 */
console.log("typeof Salad: " + typeof Salad);
console.log("typeof Salad.prototype: " + typeof Salad.prototype);
console.log("typeof Salad.prototype.prototype: " + typeof Salad.prototype.prototype);
console.log("typeof myCaesarSalad: " + typeof myCaesarSalad);
console.log("typeof myCaesarSalad.prototype: " + typeof myCaesarSalad.prototype);
console.log("check 1: " + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log("check 2: " + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log("check 3: " + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log("\n--- Assignment 4 ---------------------------------------");

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log("original myCaesarSalad\n" + JSON.stringify(myCaesarSalad));
console.log("new(myCaesarSalad)\n" + JSON.stringify(objectCopy));
console.log("Salad.parse(singleText)\n" + JSON.stringify(singleCopy));
console.log("Salad.parse(arrayText)\n" + JSON.stringify(arrayCopy));

singleCopy.add("Gurka", inventory["Gurka"]);
console.log("originalet kostar " + myCaesarSalad.getPrice() + " kr");
console.log("kopian med gurka kostar " + singleCopy.getPrice() + " kr");

console.log("\n--- Assignment 5 ---------------------------------------");

let myGourmetSalad = new GourmetSalad()
  .add("Sallad", inventory["Sallad"], 0.5)
  .add("Kycklingfilé", inventory["Kycklingfilé"], 2)
  .add("Bacon", inventory["Bacon"], 0.5)
  .add("Krutonger", inventory["Krutonger"])
  .add("Parmesan", inventory["Parmesan"], 2)
  .add("Ceasardressing", inventory["Ceasardressing"]);
console.log("Min gourmetsallad med lite bacon kostar " + myGourmetSalad.getPrice() + " kr");
myGourmetSalad.add("Bacon", inventory["Bacon"], 1);
console.log("Med extra bacon kostar den " + myGourmetSalad.getPrice() + " kr");

console.log("\n--- Assignment 6 ---------------------------------------");

console.log("Min gourmetsallad har id: " + myGourmetSalad.id);
console.log("Min gourmetsallad har uuid: " + myGourmetSalad.uuid);
