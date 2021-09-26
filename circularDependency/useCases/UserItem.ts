import { Constructor, injectable } from '../../containers/decorator';
import { entities } from '../entities';
import { Item } from './Item';
import { Container } from '../../containers/Container';

export abstract class UserItem {
  abstract give(itemId: entities.Item.Id, quantity: number): Promise<void>;
}

export namespace UserItem {
  export function RegisterReward() {
    return (Class: Constructor<UserItem.UserRewardUseCase>) => {
      UserItemUseCase.register(Class);
    };
  }

  export abstract class UserRewardUseCase {
    abstract give(rewardId: entities.Item.RewardId, quantity: number): Promise<void>;
  }

  export abstract class Repository {
    abstract increment(itemId: entities.Item.Id, quantity: number): Promise<void>;
  }
}

@injectable(UserItem)
class UserItemUseCase implements UserItem {
  private static Handler: Constructor<UserItem.UserRewardUseCase>;
  constructor(
    private readonly container: Container,
    private readonly itemUseCase: Item,
    private readonly repository: UserItem.Repository,
  ) {}

  async give(itemId: entities.Item.Id, quantity: number): Promise<void> {
    const item = await this.itemUseCase.get(itemId);
    if (item.type !== entities.Item.Type.Reward) {
      return this.repository.increment(itemId, quantity);
    }
    await this.container.resolve(UserItemUseCase.Handler).give(item.rewardId, quantity);
  }

  static register(Class: Constructor<UserItem.UserRewardUseCase>) {
    this.Handler = Class;
  }
}

