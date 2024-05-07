import { CreateUserDTO } from '@/dtos/create.user.dto'

export interface UserValidator {
  execute(data: CreateUserDTO): void
}
