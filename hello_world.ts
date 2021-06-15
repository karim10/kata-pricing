// enum WeightUnit {
//   kg = "kg",
//   g = "g",
//   pound = "pound",
//   ounce = "ounce",
// }

// interface Weight {
//   weightUnit: WeightUnit;
//   number: number;
// }

// type Unit = Weight | number;

// interface WeightPricingModel {
//   perItem: false;
//   price: number;
//   unit: Weight;
//   promotion?: {
//     for: Weight;
//     get: {
//       unit: WeightUnit;
//       price: number;
//     };
//   };
// }

// interface UnitaryPricingModel {
//   perItem: true;
//   price: number;
//   unit: number;
//   promotion?: {
//     for: number;
//     get: {
//       unit: number;
//       price: number;
//     };
//   };
// }

// type PricingModel = WeightPricingModel | UnitaryPricingModel;

// type CostTrail = Array<{ goods: Unit; cost: number }>;

// class Product {
//   private pricingModel: PricingModel;
//   constructor(pricingModel: PricingModel) {
//     this.pricingModel = pricingModel;
//     if (!isFractionalMoney(pricingModel)) {
//       throw new Error("Pricing model contains fractional money!");
//     }
//   }

//   getCostFor(goods: Unit): CostTrail {

//   }
// }

// function isFractionalMoney(pricingModel: PricingModel): boolean {
//   const standardPrice = pricingModel.price;
//   const promotionPrice = pricingModel.promotion?.get.price;

//   return (
//     hasMaxTwoFractionalDigits(standardPrice) &&
//     (promotionPrice == undefined || hasMaxTwoFractionalDigits(promotionPrice))
//   );
// }

// function hasMaxTwoFractionalDigits(value: number): boolean {
//   if (Math.floor(value) === value) return true;
//   return value.toString().split(".")[1].length <= 2;
// }

// class WeightProduct {
//   constructor() {}
//   getCostFor(goods: number): number {
//     return 0;
//   }
// }

// class UnitaryProduct {
//   constructor() {}
// }
