import { CreateUserDTO } from '@/dtos/create.user.dto'
import { UserValidator } from '@/validators/user/user.validator'

export class UserEmailValidator implements UserValidator {
  execute(data: CreateUserDTO): void {
    const emailRegex =
      /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i

    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email')
    }
  }
}
