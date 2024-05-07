import { Plans } from '@/plans/plans'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateUserService } from './create.user.service'
import { ListUsersService } from './list.users.service'

beforeAll(() => {
  const data = [
    {
      name: 'John 1',
      email: 'john1@email.com',
      plan: Plans.FREE,
      password: '1234',
    },
    {
      name: 'John 2',
      email: 'john2@email.com',
      plan: Plans.FREE,
      password: '1234',
    },
    {
      name: 'John 3',
      email: 'john3@email.com',
      plan: Plans.FREE,
      password: '1234',
    },
  ]

  data.forEach((user) => {
    CreateUserService.getInstance().execute(user)
  })
})

describe('List Users Service', () => {
  it('should be able to list all users', () => {
    const users = ListUsersService.getInstance().execute()

    expect(users).lengthOf(3)
    expect(users[0].name).toBe('John 1')
    expect(users[1].name).toBe('John 2')
    expect(users[2].name).toBe('John 3')
  })
})
