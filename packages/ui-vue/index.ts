/* eslint-disable import/no-extraneous-dependencies */
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import AppConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import AppDialog from './src/components/AppDialog.vue';
import AppButton from './src/components/AppButton.vue';
import AppDropdown from './src/components/AppDropdown.vue';
import AppFormGroup from './src/components/AppFormGroup.vue';
import AppIcon from './src/components/AppIcon.vue';
import AppInputNumber from './src/components/AppInputNumber.vue';
import AppInputText from './src/components/AppInputText.vue';
import AppToast from './src/components/AppToast.vue';

export {
  AppButton,
  AppConfirmPopup,
  AppDialog,
  AppDropdown,
  AppFormGroup,
  AppIcon,
  AppInputNumber,
  AppInputText,
  AppToast,
  ConfirmationService,
  ToastService,
  Tooltip,
  useToast,
  useConfirm,
};

export default {
  install: (app: any, primevueOptions = {}) => {
    app.use(PrimeVue, primevueOptions);
  },
};
