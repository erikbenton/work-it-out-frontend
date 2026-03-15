export default interface AuthenticationResponse {
  succeeded: boolean,
  errors?: string[],
  userName?: string
}