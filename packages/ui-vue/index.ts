/* eslint-disable import/no-extraneous-dependencies */
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import AppConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import { useConfirm } from 'primevue/useconfirm';
import AppDialog from './src/components/AppDialog.vue';
import AppButton from './src/components/AppButton.vue';
import AppDropdown from './src/components/AppDropdown.vue';
import AppFormGroup from './src/components/AppFormGroup.vue';
import AppIcon from './src/components/AppIcon.vue';
import AppInputNumber from './src/components/AppInputNumber.vue';
import AppInputText from './src/components/AppInputText.vue';

export {
  AppButton,
  AppConfirmPopup,
  AppDialog,
  AppDropdown,
  AppFormGroup,
  AppIcon,
  AppInputNumber,
  AppInputText,
  ConfirmationService,
  Tooltip,
  useConfirm,
};

export default {
  install: (app: any, primevueOptions = {}) => {
    app.use(PrimeVue, primevueOptions);
  },
};
