import { injectable } from '../../containers/decorator';
import { entities } from '../entities';
import { UserItem } from './UserItem';

export abstract class UserReward {
  abstract give(id: entities.Reward.Id, quantity: number): Promise<void>;
}

export namespace UserReward {
  export abstract class Repository {
    abstract get(id: entities.Reward.Id | entities.Item.RewardId): Promise<entities.Reward>;
  }
}

@injectable(UserReward)
@UserItem.RegisterReward()
class UserRewardUseCase implements UserReward, UserItem.UserRewardUseCase {
  constructor(private readonly userItemUseCase: UserItem, private readonly repository: UserReward.Repository) {}

  async give(id: entities.Reward.Id | entities.Item.RewardId, quantity: number): Promise<void> {
    const reward = await this.repository.get(id);
    await this.userItemUseCase.give(reward.itemId, reward.quantity * quantity);
  }
}
