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

export interface WeightPricingModel {
  perItem: false;
  price: number;
  unit: WeightUnit;
  promotion?: {
    for: Weight;
    get: {
      unit: WeightUnit;
      price: number;
    };
  };
}

export interface UnitaryPricingModel {
  perItem: true;
  price: number;
  unit: 1;
  promotion?: {
    for: number;
    get: {
      unit: number;
      price: number;
    };
  };
}

export type CostTrail = Array<{ goods: Unit; cost: number }>;

export type PricingModel = WeightPricingModel | UnitaryPricingModel;
