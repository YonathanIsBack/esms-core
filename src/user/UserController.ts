import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { GenericResponse } from 'src/util/response/GenericResponse';
import { UserService } from './UserService';
import { UserDto } from './model/UserDto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/session/verify')
  async verifySession(
    @Headers('authorization') authorization: string,
  ): Promise<GenericResponse> {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    const token = authorization.slice(7);
    const result = await this.userService.verifyToken(token);
    return GenericResponse.okWithBody(result);
  }

  @Post('/login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<GenericResponse> {
    const result = await this.userService.login(body.username, body.password);
    return GenericResponse.okWithBody(result);
  }

  @Get('/user')
  async getAll(): Promise<GenericResponse> {
    const users = await this.userService.findAll();
    return GenericResponse.okWithBody(users);
  }

  @Get('/user/:id')
  async getById(@Param('id') id: number): Promise<GenericResponse> {
    const user = await this.userService.findById(id);
    return GenericResponse.okWithBody(user);
  }

  @Post('/user')
  async create(@Body() userDto: UserDto): Promise<GenericResponse> {
    const user = await this.userService.create(new UserDto(userDto));
    return GenericResponse.okWithBody(user);
  }

  @Put('/user/:id')
  async update(
    @Body() userDto: UserDto,
    @Param('id') id: number,
  ): Promise<GenericResponse> {
    const updatedUser = await this.userService.update(id, new UserDto(userDto));
    return GenericResponse.okWithBody(updatedUser);
  }

  @Delete('/user/:id')
  async delete(@Param('id') id: number): Promise<GenericResponse> {
    await this.userService.delete(id);
    return GenericResponse.ok();
  }
}
