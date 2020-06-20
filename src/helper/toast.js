import toast from 'toastr';
import cancelBtn from '../images/toast-cancel.svg';

toast.options = {
  progressBar: false,
  closeButton: true,
  preventDuplicates: true,
  positionClass: 'toast-top-center',
  closeHtml: `
    <button class="custom-close-btn">
      <img alt="close btn"/>
    </button>
  `,
};

export const successMessage = message =>  toast.success(message);
export const errorMessage = message =>  toast.error(message);


