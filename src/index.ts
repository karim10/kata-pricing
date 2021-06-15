import {
  getCostTrailByItem,
  getCostTrailByWeight,
  isFractionalMoney,
} from "./helpers";
import { PricingModel, Unit, CostTrail } from "./types";
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
    if (this.pricingModel.perItem && isUnitPerItem(goods)) {
      return getCostTrailByWeight(this.pricingModel, goods);
    }

    return [];
  }
}

const beans_example = new Product({
  perItem: true,
  price: 1,
  unit: 2,
});

console.log("Hello: ", beans_example.getCostFor(10));
