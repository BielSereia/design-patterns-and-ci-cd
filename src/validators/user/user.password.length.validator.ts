import { CreateUserDTO } from '@/dtos/create.user.dto'
import { UserValidator } from './user.validator'

export class UserPasswordLength implements UserValidator {
  execute(data: CreateUserDTO): void {
    if (data.password.length < 3 || data.password.length > 20) {
      throw new Error('Password must be between 3 and 20 characters long')
    }
  }
}
