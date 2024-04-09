// script.js

// Function to show error icon and tooltip
function showError(element, message) {
    element.next('.error-icon').css('display', 'inline-block');
    element.next('.error-icon').attr('title', message);
    element.next('.error-icon').tooltip('show');
}

// Function to hide error icon and tooltip
function hideError(element) {
    element.next('.error-icon').css('display', 'none');
    element.next('.error-icon').tooltip('hide');
}

// Function to calculate tax and overall income after deduction
function calculateTax() {
    // Get form inputs
    var grossIncome = parseFloat($('#grossIncome').val());
    var extraIncome = parseFloat($('#extraIncome').val());
    var deductions = parseFloat($('#deductions').val());
    var age = $('#age').val();

    // Validate inputs
    if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
        showError($('#grossIncome'), 'Invalid input');
        showError($('#extraIncome'), 'Invalid input');
        showError($('#deductions'), 'Invalid input');
        return;
    }

    // Hide any previous errors
    hideError($('#grossIncome'));
    hideError($('#extraIncome'));
    hideError($('#deductions'));

    // Calculate total income after deductions
    var totalIncome = grossIncome + extraIncome - deductions;

    // Calculate tax based on age and income
    var tax = 0;
    var overallIncomeAfterTaxDeduction = 0;
    if (totalIncome > 800000) {
        switch (age) {
            case '<40':
                tax = 0.3 * (totalIncome - 800000);
                break;
            case '>=40 & <60':
                tax = 0.4 * (totalIncome - 800000);
                break;
            case '>=60':
                tax = 0.1 * (totalIncome - 800000);
                break;
        }
        overallIncomeAfterTaxDeduction = totalIncome - tax;
    } else {
        overallIncomeAfterTaxDeduction = totalIncome;
    }

    // Display the tax amount and overall income after deduction
    const resultContainer = $('.result-container').addClass('open');
    resultContainer.html(`<p class="lead">Your Overall Income will be: <br> ${overallIncomeAfterTaxDeduction.toFixed(2)} Lakhs</p> after Tax Deduction: `) ;
}

// Submit event listener for the form
$('#taxCalculatorForm').submit(function(event) {
    event.preventDefault(); // Prevent form submission
    calculateTax(); // Calculate tax
});

// Input event listener for input fields
$('input[type="number"]').on('input', function() {
    var value = $(this).val();
    if (isNaN(value)) {
        showError($(this), 'Invalid input');
    } else {
        hideError($(this));
    }
});

function checkNumberInput(inputElement) {
    const errorIcon = inputElement.nextElementSibling;
    const tooltip = errorIcon.querySelector('tooltip');

    // Clear any existing error message
    tooltip.textContent = '';
    errorIcon.style.display = 'none';

    // Check if the input value is a number
    if (isNaN(inputElement.value)) {
        // Display error message
        tooltip.textContent = 'Please enter a valid number.';
        errorIcon.style.display = 'block';
    }
}






