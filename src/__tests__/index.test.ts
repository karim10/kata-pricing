import { Product } from "..";
import { WeightUnit } from "../types";

describe("Calculate costs", () => {
  test("calculate price of a stock by item without promotion", () => {
    // 1 item for 1 dollar without promotion
    const by_item_exmaple = new Product({ perItem: true, price: 1, unit: 1 });
    const expectedCostTrail = [{ cost: 10, goods: 10 }];
    // 10 items cost 1 euro
    expect(by_item_exmaple.getCostTrailFor(10)).toEqual(expectedCostTrail);
  });

  test("calculate price of a stock by weight without promotion", () => {
    // 1 kg for 1 dollar without promotion
    const by_weight_exmaple = new Product({
      perItem: false,
      price: 1,
      unit: {
        number: 1,
        weightUnit: WeightUnit.kg,
      },
    });
    const expectedCostTrail = [
      {
        cost: 10,
        goods: {
          number: 10,
          weightUnit: WeightUnit.kg,
        },
      },
    ];
    // 10 kg cost 10 dollars
    expect(
      by_weight_exmaple.getCostTrailFor({
        weightUnit: WeightUnit.kg,
        number: 10,
      })
    ).toEqual(expectedCostTrail);
  });

  test("calculate price of a stock by item with promotion", () => {
    // 1 item for 1 dollar, if you buy 2 item the third is for 0.5 dollar
    const by_item_exmaple = new Product({
      perItem: true,
      price: 1,
      unit: 1,
      promotion: {
        for: 2,
        get: {
          price: 0.5,
          unit: 1,
        },
      },
    });
    const expectedCostTrail = [
      { goods: 2, cost: 2 },
      { goods: 1, cost: 0.5 },
      { goods: 2, cost: 2 },
      { goods: 1, cost: 0.5 },
      { goods: 2, cost: 2 },
      { goods: 1, cost: 0.5 },
      { goods: 1, cost: 1 },
    ];
    expect(by_item_exmaple.getCostTrailFor(10)).toEqual(expectedCostTrail);
  });

  test("calculate price of a stock by weight with promotion", () => {
    // 1 kg for 1 dollar, if you buy 2 kg the third is for 0.5
    const by_weight_exmaple = new Product({
      perItem: false,
      price: 1,
      unit: {
        number: 1,
        weightUnit: WeightUnit.kg,
      },
      promotion: {
        for: {
          number: 2,
          weightUnit: WeightUnit.kg,
        },
        get: {
          price: 0.5,
          unit: {
            number: 1,
            weightUnit: WeightUnit.kg,
          },
        },
      },
    });

    const expectedCostTrail = [
      { goods: 2, cost: 2 },
      { goods: 1, cost: 0.5 },
      { goods: 2, cost: 2 },
      { goods: 1, cost: 0.5 },
      { goods: 2, cost: 2 },
      { goods: 1, cost: 0.5 },
      { goods: 1, cost: 1 },
    ];
    expect(
      by_weight_exmaple.getCostTrailFor({
        weightUnit: WeightUnit.kg,
        number: 10,
      })
    ).toEqual(expectedCostTrail);
  });
});

describe("Handle data integrity", () => {
  test("throw an error when input money is fractional", () => {
    // 1 item for 0.001 dollar without promotion
    expect(() => {
      new Product({
        perItem: true,
        price: 0.001,
        unit: 1,
      });
    }).toThrow();
  });

  test("throw an error when there is a mismatch between good unit and pricing model", () => {
    const by_item_exmaple = new Product({ perItem: true, price: 1, unit: 1 });
    expect(() => {
      by_item_exmaple.getCostTrailFor({
        weightUnit: WeightUnit.kg,
        number: 10,
      });
    }).toThrow();

    const by_weight_exmaple = new Product({
      perItem: false,
      price: 1,
      unit: {
        number: 1,
        weightUnit: WeightUnit.kg,
      },
    });
    expect(() => {
      by_weight_exmaple.getCostTrailFor(10);
    }).toThrow();
  });
});
