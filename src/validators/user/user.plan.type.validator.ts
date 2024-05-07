import { CreateUserDTO } from '@/dtos/create.user.dto'
import { UserValidator } from './user.validator'
import { Plans } from '@/plans/plans'

export class UserPlanTypeValidator implements UserValidator {
  execute(data: CreateUserDTO): void {
    if (!Object.values(Plans).includes(data.plan)) {
      throw new Error('Invalid plan')
    }
  }
}
