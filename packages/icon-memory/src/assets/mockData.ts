import type {
  IconCardProps,
} from '@/types';

export const cards = [
  {
    icon: 'fa-duotone fa-solid fa-house',
    iconId: 1,
  },
  {
    icon: 'fa-duotone fa-solid fa-car',
    iconId: 2,
  },
  {
    icon: 'fa-duotone fa-solid fa-t-rex',
    iconId: 3,
  },
].reduce((acc, card) => {
  acc.push({
    ...card,
    isActive: true,
    isMatched: true,
  });
  return acc;
}, [] as IconCardProps[]);
