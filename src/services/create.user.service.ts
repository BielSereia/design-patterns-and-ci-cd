import { UsersLocalDatabase } from '@/database/users.local.database'
import { CreateUserDTO } from '@/dtos/create.user.dto'
import { UserBuilder } from '@/entities/user.entity'
import { UserEmailExistsValidator } from '@/validators/user/user.email.exists.validator'
import { UserEmailValidator } from '@/validators/user/user.email.validator'
import { UserPasswordLength } from '@/validators/user/user.password.length.validator'
import { UserPlanExistsValidator } from '@/validators/user/user.plan.exists.validator'
import { UserPlanTypeValidator } from '@/validators/user/user.plan.type.validator'
import { UserValidator } from '@/validators/user/user.validator'

export class CreateUserService {
  private static instance: CreateUserService

  private userValidator: UserValidator[] = []

  constructor() {
    this.userValidator.push(new UserEmailExistsValidator())
    this.userValidator.push(new UserEmailValidator())
    this.userValidator.push(new UserPasswordLength())
    this.userValidator.push(new UserPlanExistsValidator())
    this.userValidator.push(new UserPlanTypeValidator())
  }

  public static getInstance(): CreateUserService {
    if (!CreateUserService.instance) {
      CreateUserService.instance = new CreateUserService()
    }

    return CreateUserService.instance
  }

  execute(data: CreateUserDTO): UserBuilder {
    this.userValidator.forEach((validator) => {
      validator.execute(data)
    })

    UsersLocalDatabase.getInstance().getDatabase().push(data)

    return new UserBuilder(data.name, data.email, data.plan, data.password)
  }
}
