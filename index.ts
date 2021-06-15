enum WeightUnit {
  kg = "kg",
  g = "g",
  pound = "pound",
  ounce = "ounce",
}

interface Weight {
  weightUnit: WeightUnit;
  number: number;
}

type Unit = Weight | number;

interface PricingModel {
  price: number;
  unit: Unit;
  promotion?: {
    // number of items to get promontion
    for: number;
    // promotion
    get: {
      unit: Unit;
      price: number;
    };
  };
}

class Product {
  private pricingModel: PricingModel;
  constructor(pricingModel: PricingModel) {
    this.pricingModel = pricingModel;
    if (isFractionalMoney(pricingModel)) {
      throw new Error("Pricing model contains fractional money!");
    }
  }

  getCostFor(unit: Unit): number {
    if (this.pricingModel.promotion == undefined) {
      if (typeof unit === "number") {
      }
    }

    return 0;
  }
}

function isFractionalMoney(pricingModel: PricingModel): boolean {
  const standardPrice = pricingModel.price;
  const promotionPrice = pricingModel.promotion.get.price;
  return (
    hasMaxTwoFractionalDigits(standardPrice) &&
    hasMaxTwoFractionalDigits(promotionPrice)
  );
}

function hasMaxTwoFractionalDigits(value: number): boolean {
  if (Math.floor(value) === value) return true;
  return value.toString().split(".")[1].length <= 2;
}

const beans = new Product({ price: 1, unit: 3 });
