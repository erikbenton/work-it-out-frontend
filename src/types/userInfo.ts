import type { DistanceUnit } from "./distanceUnit";
import type { WeightUnit } from "./weightUnit";

export default interface UserInfo {
  username?: string,
  bodyWeight?: number,
  weightUnit: WeightUnit,
  distanceUnit: DistanceUnit
}