document.addEventListener('DOMContentLoaded', function() {
    const taxForm = document.getElementById('taxForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultModal = document.getElementById('resultModal');
    const closeModal = document.getElementsByClassName('close')[0];

    calculateBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (validateForm()) {
            calculateTax();
        }
    });

    closeModal.onclick = function() {
        resultModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === resultModal) {
            resultModal.style.display = 'none';
        }
    };

    resultModal.style.display = 'none';

    // Listen for input event on text input fields
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const errorIcon = this.nextElementSibling;
            const tooltip = errorIcon.nextElementSibling;
            if (!this.value.match(/^\d*\.?\d*$/)) { // Check if input contains only numbers
                errorIcon.style.display = 'block';
                tooltip.style.visibility = 'visible';
            } else {
                errorIcon.style.display = 'none';
                tooltip.style.visibility = 'hidden';
            }
        });
    });

    function validateForm() {
        const inputs = document.querySelectorAll('input[type="number"], select');
        let isValid = true;

        inputs.forEach(function(input) {
            const errorIcon = input.nextElementSibling;
            if (!input.checkValidity()) {
                errorIcon.style.display = 'block';
                isValid = false;
            } else {
                errorIcon.style.display = 'none';
            }
        });

        return isValid;
    }

    function calculateTax() {
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const deductions = parseFloat(document.getElementById('deductions').value);
        const age = document.getElementById('age').value;
        let tax = 0;
    
        const totalIncome = grossIncome + extraIncome - deductions;
        const taxableIncome = totalIncome - 800000;
    
        if (taxableIncome > 0) {
            if (age === '<40') {
                tax = 0.3 * taxableIncome;
            } else if (age === '>=40&<60') {
                tax = 0.4 * taxableIncome;
            } else if (age === '>=60') {
                tax = 0.1 * taxableIncome;
            }
        }
    
        const resultText = 'Your Overall Income after tax deduction will be ' + (grossIncome + extraIncome - tax) + ' Lakhs';
        document.getElementById('result').textContent = resultText;
        resultModal.style.display = 'block';
    }
    
    
});
