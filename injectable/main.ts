import * as tsyringe from 'tsyringe';
import { Container } from '../containers/Container';
import { entities } from './entities';
import { useCases } from './useCases';

(async () => {
  const container = tsyringe.container.resolve(Container);
  const useCase = container.resolve(useCases.UserReward);
  const itemId = 'test' as entities.Reward.Id;
  await useCase.give(itemId, 10);
})();
