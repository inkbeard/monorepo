import {
  AppButton,
  AppConfirmPopup,
  useConfirm
} from '@inkbeard/ui-vue';

export const SampleConfirmPopup = {
  render: (args) => ({
    components: {
      AppButton,
      AppConfirmPopup
    },
    setup() {
      const confirm = useConfirm();

      const showConfirm = ({ currentTarget }) => {
        confirm.require({
          target: currentTarget,
          group: 'testConfirm',
          message: 'Please confirm to proceed moving forward.',
          icon: 'fa-solid fa-question-circle',
          acceptClass: 'p-button-raised p-button-sm',
          acceptIcon: 'fa-solid fa-check',
          acceptLabel: 'Confirm',
          rejectClass: 'p-button-secondary p-button-raised p-button-sm',
          rejectIcon: 'fa-solid fa-xmark',
          rejectLabel: 'Cancel',
          accept: () => {
            alert('You have accepted');
          },
          reject: () => {
            alert('You have rejected');
          }
        });
      }

      return { args, showConfirm };
    },
    template: '<AppConfirmPopup group="testConfirm"/><AppButton label="Click me" @click="showConfirm" />'
  }),
};

export default {
  title: 'ui vue/AppConfirmPopup',
  component: AppButton,
};