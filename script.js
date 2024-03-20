document.addEventListener('DOMContentLoaded', function() {
  const shippingForm = document.getElementById('shippingForm');
  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const shippingCostModal = $('#shippingCostModal');
  const boxPackagingRadios = document.querySelectorAll('input[name="boxPackaging"]');
  const dimensionsContainer = document.getElementById('dimensionsContainer');

  function validateForm() {
    const requiredFields = shippingForm.querySelectorAll('input[required]');
    let allRequiredFieldsValid = true;

    requiredFields.forEach(function(field) {
      if (!field.value) {
        field.classList.add('is-invalid');
        allRequiredFieldsValid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    const dimensionInputs = dimensionsContainer.querySelectorAll('input');
    let dimensionsValid = true;

    if (dimensionInputs.length > 0) {
      dimensionsValid = Array.from(dimensionInputs).every(input => input.value !== '');
    }

    const boxPackagingYes = document.getElementById('boxYes').checked;

    calculateBtn.disabled = !(allRequiredFieldsValid && (dimensionsValid || !boxPackagingYes));
  }

  shippingForm.addEventListener('input', validateForm);

  boxPackagingRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (this.value === 'yes') {
        dimensionsContainer.style.display = 'block';
        const dimensionInputs = dimensionsContainer.querySelectorAll('input');
        dimensionInputs.forEach(input => input.required = true);
      } else {
        dimensionsContainer.style.display = 'none';
        const dimensionInputs = dimensionsContainer.querySelectorAll('input');
        dimensionInputs.forEach(input => input.required = false);
      }
      validateForm();
    });
  });

  resetBtn.addEventListener('click', function() {
    shippingForm.reset();
    dimensionsContainer.style.display = 'none';
    calculateBtn.disabled = true;
  });

  calculateBtn.addEventListener('click', function(event) {
    event.preventDefault();
    shippingCostModal.modal('show');
  });

  validateForm();
});