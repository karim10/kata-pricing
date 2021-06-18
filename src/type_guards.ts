import { Unit, Weight } from "./types";

export function isUnitPerWeight(unit: Unit): unit is Weight {
  return (unit as Weight).weightUnit !== undefined;
}

export function isUnitPerItem(unit: Unit): unit is 1 {
  return (unit as number) !== undefined;
}
