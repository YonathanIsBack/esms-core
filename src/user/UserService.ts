import { BadRequestException, Injectable, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TransactionInterceptor } from 'src/config/TransactionInterceptor';
import RsaManager from 'src/config/RsaManager';
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
  async create(userDto: UserDto): Promise<Omit<User, 'password'>> {
    await this.validateUserRegistrationRequest(userDto);

    const user = userDto.createUser();
    user.password = RsaManager.encrypt(user.password);
    const saved = await this.userRepository.save(user);
    const { password: _, ...result } = saved;
    return result;
  }

  private async validateUserRegistrationRequest(userDto: UserDto): Promise<void> {
    const errors: string[] = [];

    if (!userDto.username || userDto.username.trim().length === 0) {
      errors.push('username is required');
    } else if (userDto.username.length > 25) {
      errors.push('username must not exceed 25 characters');
    } else {
      const existingUsername = await this.userRepository.findOneBy({
        username: userDto.username,
      });
      if (existingUsername) {
        errors.push('username already exists');
      }
    }

    if (!userDto.password || userDto.password.trim().length === 0) {
      errors.push('password is required');
    }

    if (!userDto.email || userDto.email.trim().length === 0) {
      errors.push('email is required');
    } else {
      const existingEmail = await this.userRepository.findOneBy({
        email: userDto.email,
      });
      if (existingEmail) {
        errors.push('email already exists');
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; '));
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ username: string; jwtToken: string; validUntil: string }> {
    const user = await this.userRepository.findOneBy({ username });

    if (user == null) {
      throw new UnauthorizedException('Invalid username or password');
    }

    let storedPassword: string;
    try {
      storedPassword = RsaManager.decrypt(user.password);
    } catch {
      storedPassword = user.password;
    }

    if (storedPassword !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = jwt.sign(
      { username: user.username },
      RsaManager.getPrivateKey(),
      { algorithm: 'RS256', expiresIn: '24h' },
    );

    const decoded = jwt.decode(token, { complete: true }) as any;
    const validUntil = new Date(decoded.payload.exp * 1000).toISOString();

    return { username: user.username, jwtToken: token, validUntil };
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
