import type {
  IconDetails,
  IconCardProps,
} from '@/types';

export const icons = [
  {
    icon: 'fa-duotone fa-solid fa-house',
    name: 'house',
    family: 'fa-duotone',
    pro: false,
    style: 'fa-solid',
  },
  {
    icon: 'fa-duotone fa-solid fa-car',
    name: 'car',
    family: 'fa-duotone',
    pro: false,
    style: 'fa-solid',
  },
  {
    icon: 'fa-duotone fa-solid fa-t-rex',
    name: 't-rex',
    pro: true,
    family: 'fa-duotone',
    style: 'fa-solid',
  },
].reduce((acc, card) => {
  acc.push({
    ...card,
    icon: `${card.family} ${card.style} fa-${card.name}`,
  });

  return acc;
}, [] as IconDetails[]);

export const cards: IconCardProps[] = icons.map((icon, index) => ({
  ...icon,
  iconId: index + 1,
  isActive: true,
  isMatched: true,
}));
