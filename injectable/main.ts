import { useCases } from './useCases';
import { entities } from './entities';
import { Container } from '../containers/Container';

(async () => {
  const container = new Container();
  const useCase = container.resolve(useCases.UserReward);
  const itemId = 'test' as entities.Reward.Id;
  await useCase.give(itemId, 10);
})();
