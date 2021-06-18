export enum WeightUnit {
  kg = "kg",
  g = "g",
  pound = "pound",
  ounce = "ounce",
}

export interface Weight {
  weightUnit: WeightUnit;
  number: number;
}

export type Unit = Weight | number;

export interface UnitaryPricingModel {
  perItem: true;
  price: number;
  unit: number;
  promotion?: {
    for: number;
    get: {
      unit: number;
      price: number;
    };
  };
}

export interface WeightPricingModel {
  perItem: false;
  price: number;
  unit: Weight;
  promotion?: {
    for: Weight;
    get: {
      unit: Weight;
      price: number;
    };
  };
}

export type PricingModel = WeightPricingModel | UnitaryPricingModel;

export type CostTrail = Array<{ goods: Unit; cost: number }>;
