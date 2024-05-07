import { CreateUserDTO } from '@/dtos/create.user.dto'
import { UserValidator } from './user.validator'

export class UserPlanExistsValidator implements UserValidator {
  execute(data: CreateUserDTO): void {
    if (!data.plan) {
      throw new Error('Plan is required')
    }
  }
}
