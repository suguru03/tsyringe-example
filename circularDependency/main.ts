import * as tsyringe from 'tsyringe';
import { useCases } from './useCases';
import { entities } from './entities';
import { Container } from '../containers/Container';

(async () => {
  const container = tsyringe.container.resolve(Container);
  const useCase = container.resolve(useCases.UserReward);
  const itemId = 'test' as entities.Reward.Id;
  await useCase.give(itemId, 10);
})();
