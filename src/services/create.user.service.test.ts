import { describe, expect, it } from 'vitest'
import { CreateUserService } from './create.user.service'
import { Plans } from '@/plans/plans'
import { UserBuilder } from '@/entities/user.entity'

describe('Create User Service', () => {
  it('should be able to create a new user', () => {
    const data = {
      name: 'John Doe',
      email: 'john@email.com',
      plan: Plans.FREE,
      password: '1234',
    }

    const user = CreateUserService.getInstance().execute(data)

    expect(user).instanceOf(UserBuilder)
  })

  it('should not be able to create a new user cause email already exists', () => {
    const data = {
      name: 'John Doe',
      email: 'john@email.com',
      plan: Plans.FREE,
      password: '1234',
    }

    expect(() => CreateUserService.getInstance().execute(data)).toThrowError(
      'User already exists',
    )
  })

  it('should not be able to create a new user cause invalid password', () => {
    const data = {
      name: 'John Doe',
      email: 'john2@email.com',
      plan: Plans.FREE,
      password: '12',
    }

    expect(() => CreateUserService.getInstance().execute(data)).toThrowError(
      'Password must be between 3 and 20 characters long',
    )
  })
})
