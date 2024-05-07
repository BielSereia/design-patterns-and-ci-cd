import { CreateUserDTO } from '@/dtos/create.user.dto'
import { UserValidator } from './user.validator'
import { UsersLocalDatabase } from '@/database/users.local.database'

export class UserEmailExistsValidator implements UserValidator {
  execute(data: CreateUserDTO): void {
    const userAlreadyExists = UsersLocalDatabase.getInstance()
      .getDatabase()
      .find((user) => user.email === data.email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }
  }
}
