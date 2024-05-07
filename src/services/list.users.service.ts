import { UsersLocalDatabase } from '@/database/users.local.database'
import { UserEntity } from '@/entities/user.entity'

export class ListUsersService {
  private static instance: ListUsersService

  public static getInstance(): ListUsersService {
    if (!ListUsersService.instance) {
      ListUsersService.instance = new ListUsersService()
    }

    return ListUsersService.instance
  }

  execute(): UserEntity[] {
    return UsersLocalDatabase.getInstance().getDatabase()
  }
}
