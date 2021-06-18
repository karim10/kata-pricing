import {
  getCostTrailByItem,
  getCostTrailByWeight,
  // getCostTrailByWeight,
  isFractionalMoney,
} from "./helpers";
import { PricingModel, Unit, CostTrail, WeightUnit } from "./types";
import { isUnitPerItem, isUnitPerWeight } from "./type_guards";

class Product {
  private pricingModel: PricingModel;
  constructor(pricingModel: PricingModel) {
    this.pricingModel = pricingModel;
    if (!isFractionalMoney(pricingModel)) {
      throw new Error("Pricing model contains fractional money!");
    }
  }

  getCostFor(goods: Unit): CostTrail {
    if (this.pricingModel.perItem && !isUnitPerItem(goods)) {
      throw Error("Goods unit doesn't match current pricing model (per item)");
    }

    if (!this.pricingModel.perItem && !isUnitPerWeight(goods)) {
      throw Error(
        "Goods unit doesn't match current pricing model (weight based)"
      );
    }

    // By Item
    if (this.pricingModel.perItem && isUnitPerItem(goods)) {
      return getCostTrailByItem(this.pricingModel, goods);
    }

    // By Weight
    if (this.pricingModel.perItem == false && isUnitPerWeight(goods)) {
      return getCostTrailByWeight(this.pricingModel, goods);
    }

    return [];
  }
}

const by_unit_example = new Product({
  perItem: true,
  price: 1,
  unit: 2,
  promotion: {
    for: 2,
    get: {
      unit: 2,
      price: 0.5,
    },
  },
});

const by_item_example = new Product({
  perItem: false,
  price: 1,
  unit: {
    weightUnit: WeightUnit.kg,
    number: 1,
  },
  promotion: {
    for: {
      weightUnit: WeightUnit.kg,
      number: 2,
    },
    get: {
      unit: {
        weightUnit: WeightUnit.kg,
        number: 1,
      },
      price: 0.5,
    },
  },
});

// console.log("by unit example: ", by_unit_example.getCostFor(1));
console.log(
  "by weight example: ",
  by_item_example.getCostFor({ weightUnit: WeightUnit.kg, number: 10 })
);
