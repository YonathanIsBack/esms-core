import { Injectable, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/config/TransactionInterceptor';
import { ResourceNotFoundException } from 'src/exception/ResourceNotFoundException';
import { UserRepository } from './UserRepository';
import { User } from './model/User.entity';
import { UserDto } from './model/UserDto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (user == null) {
      throw new ResourceNotFoundException(`${User.name} with ID : ${id}`);
    }

    return user;
  }

  async findBy(options: object): Promise<User> {
    const user = await this.userRepository.findOneBy(options);

    if (user == null) {
      throw new ResourceNotFoundException(User.name);
    }

    return user;
  }

  @UseInterceptors(TransactionInterceptor)
  create(userDto: UserDto): Promise<User> {
    const user = userDto.createUser();
    return this.userRepository.save(user);
  }

  @UseInterceptors(TransactionInterceptor)
  async update(id: number, userDto: UserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id });

    if (existingUser == null) {
      throw new ResourceNotFoundException(`${User.name} with ID : ${id}`);
    }

    return this.userRepository.save({
      ...existingUser,
      ...userDto,
    });
  }

  async delete(id: number) {
    await this.userRepository.delete({ id });
  }
}
