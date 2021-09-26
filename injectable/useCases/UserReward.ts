import { injectable } from '../../containers/decorator';
import { entities } from '../entities';
import { UserItem } from './UserItem';

export abstract class UserReward {
  abstract give(id: entities.Reward.Id): Promise<void>;
}

export namespace UserReward {
  export abstract class Repository {
    abstract get(id: entities.Reward.Id): Promise<entities.Reward>;
  }
}

@injectable(UserReward)
class UserRewardUseCase implements UserReward {
  constructor(private readonly userItem: UserItem, private readonly repository: UserReward.Repository) {}

  async give(id: entities.Reward.Id): Promise<void> {
    const reward = await this.repository.get(id);
    await this.userItem.give(reward.itemId, reward.quantity);
  }
}
