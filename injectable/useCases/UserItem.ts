import { injectable } from '../../containers/decorator';
import { entities } from '../entities';

export abstract class UserItem {
  abstract give(itemId: entities.Item.Id, quantity: number): Promise<void>;
}

export namespace UserItem {
  export abstract class Repository {
    abstract increment(itemId: entities.Item.Id, quantity: number): Promise<void>;
  }
}

@injectable(UserItem)
class UserItemUseCase implements UserItem {
  constructor(private readonly repository: UserItem.Repository) {}

  async give(itemId: entities.Item.Id, quantity: number): Promise<void> {
    await this.repository.increment(itemId, quantity);
  }
}
