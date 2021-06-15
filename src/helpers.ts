import {
  CostTrail,
  PricingModel,
  UnitaryPricingModel,
  WeightPricingModel,
} from "./types";

export function isFractionalMoney(pricingModel: PricingModel): boolean {
  const standardPrice = pricingModel.price;
  const promotionPrice = pricingModel.promotion?.get.price;

  return (
    hasMaxTwoFractionalDigits(standardPrice) &&
    (promotionPrice == undefined || hasMaxTwoFractionalDigits(promotionPrice))
  );
}

export function hasMaxTwoFractionalDigits(value: number): boolean {
  if (Math.floor(value) === value) return true;
  return value.toString().split(".")[1].length <= 2;
}

export function getCostTrailByItem(
  unitaryPricingModel: UnitaryPricingModel,
  goods: number
): CostTrail {
  const pricePerUnit = unitaryPricingModel.price / unitaryPricingModel.unit;
  if (unitaryPricingModel.promotion == undefined) {
    // calculate cost per unit without promotion
    return [
      {
        goods,
        cost: goods * pricePerUnit,
      },
    ];
  }

  // eligible for promotion
  if (unitaryPricingModel.promotion.for < goods) {
    let temp = goods;
    let costTrail: CostTrail = [];
    while (temp > 0) {
      // goods without promotion
      const goodsInCurrentIteration =
        temp > unitaryPricingModel.promotion.for
          ? unitaryPricingModel.promotion.for
          : temp;
      costTrail.push({
        goods: goodsInCurrentIteration,
        cost: goodsInCurrentIteration * unitaryPricingModel.price,
      });

      temp = temp - goodsInCurrentIteration;

      // goods with promotion
      const promotedGoodsInCurrentIteration =
        temp > unitaryPricingModel.promotion.get.unit
          ? unitaryPricingModel.promotion.get.unit
          : temp;
      costTrail.push({
        goods: promotedGoodsInCurrentIteration,
        cost:
          promotedGoodsInCurrentIteration *
          unitaryPricingModel.promotion.get.price,
      });

      temp = temp - promotedGoodsInCurrentIteration;
    }

    return costTrail;
  }
}

export function getCostTrailByWeight(weightPricingModel: WeightPricingModel) {
  const pricePerUnit = unitaryPricingModel.price / unitaryPricingModel.unit;
  if (unitaryPricingModel.promotion == undefined) {
    // calculate cost per unit without promotion
    return [
      {
        goods,
        cost: goods * pricePerUnit,
      },
    ];
  }

  // eligible for promotion
  if (unitaryPricingModel.promotion.for < goods) {
    let temp = goods;
    let costTrail: CostTrail = [];
    while (temp > 0) {
      // goods without promotion
      const goodsInCurrentIteration =
        temp > unitaryPricingModel.promotion.for
          ? unitaryPricingModel.promotion.for
          : temp;
      costTrail.push({
        goods: goodsInCurrentIteration,
        cost: goodsInCurrentIteration * unitaryPricingModel.price,
      });

      temp = temp - goodsInCurrentIteration;

      // goods with promotion
      const promotedGoodsInCurrentIteration =
        temp > unitaryPricingModel.promotion.get.unit
          ? unitaryPricingModel.promotion.get.unit
          : temp;
      costTrail.push({
        goods: promotedGoodsInCurrentIteration,
        cost:
          promotedGoodsInCurrentIteration *
          unitaryPricingModel.promotion.get.price,
      });

      temp = temp - promotedGoodsInCurrentIteration;
    }

    return costTrail;
  }
}
