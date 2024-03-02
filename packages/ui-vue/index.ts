/* eslint-disable import/no-extraneous-dependencies */
import PrimeVue from 'primevue/config';
import AppButton from './src/components/AppButton.vue';
import AppDropdown from './src/components/AppDropdown.vue';
import AppInputNumber from './src/components/AppInputNumber.vue';
import AppInputText from './src/components/AppInputText.vue';
import AppIcon from './src/components/AppIcon.vue';
import AppFormGroup from './src/components/AppFormGroup.vue';

export {
  AppButton,
  AppDropdown,
  AppFormGroup,
  AppIcon,
  AppInputNumber,
  AppInputText,
};

export default {
  install: (app: any, primevueOptions = {}) => {
    app.use(PrimeVue, primevueOptions);
  },
};
