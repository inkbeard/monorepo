/* eslint-disable import/no-extraneous-dependencies */
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import AppDialog from './src/components/AppDialog.vue';
import AppButton from './src/components/AppButton.vue';
import AppDropdown from './src/components/AppDropdown.vue';
import AppFormGroup from './src/components/AppFormGroup.vue';
import AppIcon from './src/components/AppIcon.vue';
import AppInputNumber from './src/components/AppInputNumber.vue';
import AppInputText from './src/components/AppInputText.vue';

export {
  AppButton,
  AppDropdown,
  AppFormGroup,
  AppIcon,
  AppInputNumber,
  AppInputText,
  AppDialog,
  Tooltip,
};

export default {
  install: (app: any, primevueOptions = {}) => {
    app.use(PrimeVue, primevueOptions);
  },
};
