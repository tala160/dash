import toast from 'react-hot-toast';

const displayNotification = (type, message, options = {}) => {
  switch (type) {
    case 'info':
      toast(message, { ...options, icon: 'ℹ️' }); 
      break;
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.warn(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};

export const showSuccessNotification = (message, title) => {
  displayNotification('success', message, {
    duration: 5000, // Adjust as needed
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
      style: {
        border: '1px solid #a2e4a3',
        padding: '16px',
        color: '#000',
      },
  });
};

export const showInfoNotification = (message, title) => {
  displayNotification('info', message, {
      duration: 2000,
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
      style: {
        border: '1px solid #a2e4a3',
        padding: '16px',
        color: '#000',
      },
  });
};

export const showWarningNotification = (message, title) => {
  displayNotification('warning', message, {
      duration: 2000,
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
      style: {
        border: '1px solid #a2e4a3',
        padding: '16px',
        color: '#000',
      },
  });
};

export const showErrorNotification = (message, title) => {
  displayNotification('error', message, {
    duration: 2000,
    ariaProps: {
      role: 'status',
      'aria-live': 'assertive',
    },
    style: {
      border: '1px solid #a2e4a3',
      padding: '16px',
      color: '#000',
    },
  });
};
