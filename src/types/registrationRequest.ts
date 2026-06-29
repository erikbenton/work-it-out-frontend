export default interface RegistrationRequest {
  email: string,
  password: string,
  weightUnit: string,
  distanceUnit: string,
  username?: string,
  bodyWeight?: number
}