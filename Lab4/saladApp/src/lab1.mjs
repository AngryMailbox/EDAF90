"use strict";

import inventory from "./inventory.mjs";
import { v4 as uuidv4 } from "uuid";

function makeOptions(inv, prop) {
  const property = Object.keys(inv)
    .filter((item) => prop in inv[item])
    .map(
      (item) =>
        `<option value="${item}" key="${item}"> ${item}, ${inv[item].price} kr</option>`
    );

  return property;
}

class Salad {
  static instanceCounter = 0;

  constructor(salad) {
    const uuid = uuidv4();
    this.id = "salad_" + Salad.instanceCounter++;

    if (salad !== undefined) {
      this.ingredients = { ...salad.ingredients };
    } else {
      this.ingredients = {};
    }

    if (salad && salad.uuid && !(salad instanceof Salad)) {
      this.uuid = salad.uuid;
    } else {
      this.uuid = uuid;
    }
  }

  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }
  remove(name) {
    delete this.ingredients[name];
    return this;
  }

  static parse(json) {
    const jCopy = JSON.parse(json);

    if (Array.isArray(jCopy)) {
      return jCopy.map((item) => new Salad(item));
    } else {
      return new Salad(jCopy);
    }
  }
}

Salad.prototype.getPrice = function () {
  return Object.values(this.ingredients).reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
};

Salad.prototype.count = function (property) {
  var sum = 0;
  Object.values(this.ingredients).forEach((item) => {
    if (property in item) {
      sum++;
    }
  });
  return sum;
};

class GourmetSalad extends Salad {
  constructor(salad) {
    super(salad);
  }
  add(name, properties, size = 1) {
    let ingredientProperties = { ...properties };

    if (this.ingredients[name]) {
      ingredientProperties.size = (this.ingredients[name].size || 1) + size;
    } else {
      ingredientProperties.size = size;
    }
    super.add(name, ingredientProperties);

    return this;
  }
}

GourmetSalad.prototype.getPrice = function () {
  return Object.values(this.ingredients).reduce((accumulator, currentValue) => {
    const size = currentValue.size || 1;
    return accumulator + currentValue.price * size;
  }, 0);
};

export default Salad;
