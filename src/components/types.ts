export interface User {
  username: String
  password: String
}

export interface Rules {
  username: {
    required: boolean
    message: string
    trigger: string
  }[]
  password: (
    | {
        required: boolean
        message: string
        trigger: string
        min?: undefined
        max?: undefined
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
        required?: undefined
      }
  )[]
}
