/* eslint-disable import/no-extraneous-dependencies */
import PrimeVue from 'primevue/config';
import AppDropdown from './src/components/AppDropdown.vue';
import AppInputNumber from './src/components/AppInputNumber.vue';
import AppButton from './src/components/AppButton.vue';
import AppIcon from './src/components/AppIcon.vue';
import AppFormGroup from './src/components/AppFormGroup.vue';

export {
  AppButton,
  AppDropdown,
  AppFormGroup,
  AppIcon,
  AppInputNumber,
};

export default {
  install: (app: any, options = {}) => app.use(PrimeVue, options),
};
