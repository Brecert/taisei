export default function ret(input: any, cond: boolean, message: string) {
  if(input !== undefined && input !== null && cond) {
    return
  }

  return message
}
