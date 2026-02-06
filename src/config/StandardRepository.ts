import { DataSource, EntityManager, EntityTarget, Repository } from 'typeorm';
import { ENTITY_MANAGER_KEY } from './TransactionInterceptor';

export class StandardRepository<T> extends Repository<T> {
  constructor(
    private dataSource: DataSource,
    private request: Request,
    target: EntityTarget<T>,
  ) {
    super(target, dataSource.createEntityManager());
  }

  protected getRepository<T>(entityCls: new () => T): Repository<T> {
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager.getRepository(entityCls);
  }
}
