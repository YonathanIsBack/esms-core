import { Injectable, Scope } from '@nestjs/common';
import { StandardRepository } from 'src/config/StandardRepository';
import { DataSource } from 'typeorm';
import { User } from './model/User.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends StandardRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, undefined, User);
  }
}
