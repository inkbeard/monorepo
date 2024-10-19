import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TimeCounter from '../TimeCounter.vue';

describe('TimeCounter', () => {
  let wrapper: any;
  const createWrapper = (gameHasStarted = false) => {
    wrapper = shallowMount(
      TimeCounter,
      {
        props: { gameHasStarted },
      },
    );
  };
  const startGame = async (time: number) => {
    wrapper.setProps({ gameHasStarted: true });

    await wrapper.vm.$nextTick();

    vi.advanceTimersByTime(time);
  };

  beforeEach(() => {
    createWrapper();
    vi.useFakeTimers();
  });

  it('should start a timer and update the clock when gameHasStarted switches to `true`', async () => {
    await startGame(10000);

    expect(wrapper.vm.clock)
      .toBe(1000);
  });

  it('should calculate the time in milliseconds', async () => {
    await startGame(220);

    expect(wrapper.find('[data-test="readable time"]').text())
      .toBe('00:00.220');
  });

  it('should calculate the time in seconds', async () => {
    await startGame(12000);

    expect(wrapper.find('[data-test="readable time"]').text())
      .toBe('00:12.000');
  });

  it('should calculate the time in minutes', async () => {
    await startGame(201000);

    expect(wrapper.find('[data-test="readable time"]').text())
      .toBe('03:21.000');
  });

  it('should emit the readable time and clock when the game has stopped', async () => {
    await startGame(201000);

    wrapper.setProps({ gameHasStarted: false });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().timeStopped)
      .toBeTruthy();
    expect(wrapper.emitted().timeStopped[0])
      .toEqual([
        {
          readableTime: '03:21.000',
          time: 20100,
        },
      ]);
  });
});
