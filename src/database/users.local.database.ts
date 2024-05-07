import { UserEntity } from '@/entities/user.entity'

export class UsersLocalDatabase {
  private static instance: UsersLocalDatabase
  private users: UserEntity[]

  constructor() {
    this.users = []
  }

  public static getInstance(): UsersLocalDatabase {
    if (!UsersLocalDatabase.instance) {
      UsersLocalDatabase.instance = new UsersLocalDatabase()
    }

    return UsersLocalDatabase.instance
  }

  public getDatabase(): UserEntity[] {
    return this.users
  }
}
