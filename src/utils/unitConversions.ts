import type { DistanceUnit } from "../types/distanceUnit";
import type { WeightUnit } from "../types/weightUnit";

interface WeightSet {
  weight?: number,
  weightUnit: WeightUnit
}

interface DistanceSet {
  distance?: number,
  distanceUnit: DistanceUnit
}

export const KG_TO_LB = 2.205; 
export const LB_TO_KG = (1 / KG_TO_LB);
export const MI_TO_KM = 1.609;
export const KM_TO_MI = (1 / MI_TO_KM);

export function convertWeightToUserUnits(set: WeightSet, targetUnit: WeightUnit): WeightSet {
  if (!set.weight || set.weightUnit === targetUnit) {
    return { weight: set.weight, weightUnit: targetUnit };
  }

  if (targetUnit === 'lb') {
    if (set.weightUnit === 'kg') {
      const convertedWeight = Math.round(set.weight * KG_TO_LB * 100) / 100;
      return { weight: convertedWeight, weightUnit: targetUnit };
    }
  }

  if (targetUnit === 'kg') {
    if (set.weightUnit === 'lb') {
      const convertedWeight = Math.round(set.weight * LB_TO_KG * 100) / 100;
      return { weight: convertedWeight, weightUnit: targetUnit };
    }
  }

  return { weight: set.weight, weightUnit: targetUnit };
}

export function convertDistanceToUserUnits(set: DistanceSet, targetUnit: DistanceUnit): DistanceSet {
  if (!set.distance || set.distanceUnit === targetUnit) {
    return { distance: set.distance, distanceUnit: targetUnit };
  }

  if (targetUnit === 'mi') {
    if (set.distanceUnit === 'km') {
      const convertedDistance = Math.round(set.distance * KM_TO_MI * 100) / 100;
      return { distance: convertedDistance, distanceUnit: targetUnit };
    }
  }

  if (targetUnit === 'km') {
    if (set.distanceUnit === 'mi') {
      const convertedDistance = Math.round(set.distance * MI_TO_KM * 100) / 100;
      return { distance: convertedDistance, distanceUnit: targetUnit };
    }
  }

  return { distance: set.distance, distanceUnit: targetUnit };
}