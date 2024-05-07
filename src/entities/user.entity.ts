import { Plans } from '@/plans/plans'

export interface UserEntity {
  name: string
  email: string
  plan: Plans
  password: string
}

export class UserBuilder {
  private name: string
  private email: string
  private plan: Plans
  private password: string

  constructor(name: string, email: string, plan: Plans, password: string) {
    this.name = name
    this.email = email
    this.plan = plan
    this.password = password
  }
}
