export default interface AuthenticationResponse {
  succeeded: boolean,
  errors?: string[],
  userId?: string
}