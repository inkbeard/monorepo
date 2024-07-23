import {
  describe, it, expect,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TurnCounter from '../TurnCounter.vue';

describe('TurnCounter', () => {
  const matchedCount = 5;
  const missedCount = 5;
  const turnCount = 10;

  let wrapper: any;
  const createWrapper = () => {
    wrapper = shallowMount(
      TurnCounter,
      {
        props: {
          matchedCount,
          missedCount,
          turnCount,
        },
      },
    );
  };

  it('should render the total turn count', () => {
    createWrapper();

    expect(wrapper.find('[data-test="total count"]').text())
      .toBe(turnCount.toString());
  });

  it('should render the matched count', () => {
    createWrapper();

    expect(wrapper.find('[data-test="matched count"]').text())
      .toBe(matchedCount.toString());
  });

  it('should render the missed count', () => {
    createWrapper();

    expect(wrapper.find('[data-test="missed count"]').text())
      .toBe(missedCount.toString());
  });
});
