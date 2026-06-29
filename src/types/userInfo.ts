export default interface UserInfo {
  username?: string,
  bodyWeight?: number,
  weightUnit: ('lb | kg'),
  distanceUnit: ('mi' | 'km')
}