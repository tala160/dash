// validation.js
import { showErrorNotification } from '../../../services/NotificationService';

export const validateProduct = (product) => {
  if (!product.title || !product.price || !product.qa || !product.category) {
    showErrorNotification("All fields are required.");
    return false;
  }
  if (isNaN(product.price)) {
    showErrorNotification("Price must be a number.");
    return false;
  }
  if (isNaN(product.qa)) {
    showErrorNotification("Quantity must be a number.");
    return false;
  }
  return true;
};
