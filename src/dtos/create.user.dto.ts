import { Plans } from '@/plans/plans'

export interface CreateUserDTO {
  name: string
  email: string
  plan: Plans
  password: string
}
