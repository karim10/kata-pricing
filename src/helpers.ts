import {
  CostTrail,
  PricingModel,
  UnitaryPricingModel,
  Weight,
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
  const eligibleForPromotion = unitaryPricingModel.promotion.for < goods;
  if (unitaryPricingModel.promotion == undefined || !eligibleForPromotion) {
    // calculate cost per unit without promotion
    return [
      {
        goods,
        cost: goods * pricePerUnit,
      },
    ];
  }

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
      cost: goodsInCurrentIteration * pricePerUnit,
    });

    temp = temp - goodsInCurrentIteration;

    if (temp > 0) {
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
  }

  return costTrail;
}

export function getCostTrailByWeight(
  weightPricingModel: WeightPricingModel,
  goods: Weight
) {
  const pricePerWeightUnit =
    weightPricingModel.price / weightPricingModel.unit.number;
  const eligibleForPromotion = weightPricingModel.promotion.for < goods;
  if (weightPricingModel.promotion == undefined && !eligibleForPromotion) {
    // calculate cost per unit without promotion
    return [
      {
        goods,
        cost: goods.number * pricePerWeightUnit,
      },
    ];
  }

  // eligible for promotion
  let temp = goods.number;
  let costTrail: CostTrail = [];
  while (temp > 0) {
    // goods without promotion
    const goodsInCurrentIteration =
      temp > weightPricingModel.promotion.for.number
        ? weightPricingModel.promotion.for.number
        : temp;
    costTrail.push({
      goods: goodsInCurrentIteration,
      cost: goodsInCurrentIteration * pricePerWeightUnit,
    });

    temp = temp - goodsInCurrentIteration;

    if (temp > 0) {
      // goods with promotion
      const promotedGoodsInCurrentIteration =
        temp > weightPricingModel.promotion.get.unit.number
          ? weightPricingModel.promotion.get.unit.number
          : temp;
      costTrail.push({
        goods: promotedGoodsInCurrentIteration,
        cost:
          promotedGoodsInCurrentIteration *
          weightPricingModel.promotion.get.price,
      });

      temp = temp - promotedGoodsInCurrentIteration;
    }
  }

  return costTrail;
}
