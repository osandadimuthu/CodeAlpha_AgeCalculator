document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    
    const dayError = document.getElementById('day-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');
    
    calculateBtn.addEventListener('click', function() {
        dayError.classList.remove('show');
        monthError.classList.remove('show');
        yearError.classList.remove('show');
        
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);
        
        let isValid = true;
        
        if (isNaN(day) || day < 1 || day > 31) {
            dayError.classList.add('show');
            isValid = false;
        }
        
        if (isNaN(month) || month < 1 || month > 12) {
            monthError.classList.add('show');
            isValid = false;
        }
        
        const currentYear = new Date().getFullYear();
        if (isNaN(year) || year < 1900 || year > currentYear) {
            yearError.classList.add('show');
            isValid = false;
        }
        
        if (!isValid) return;
        
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        
        if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
            dayError.classList.add('show');
            isValid = false;
            return;
        }
        
        if (birthDate > today) {
            yearError.textContent = "Birthdate cannot be in the future";
            yearError.classList.add('show');
            isValid = false;
            return;
        }
        
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();
        
        if (ageDays < 0) {
            ageMonths--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }
        
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        
        document.getElementById('years').textContent = ageYears;
        document.getElementById('months').textContent = ageMonths;
        document.getElementById('days').textContent = ageDays;
        
        resultDiv.classList.add('active');
    });
    
    dayInput.addEventListener('input', function() {
        dayError.classList.remove('show');
    });
    
    monthInput.addEventListener('input', function() {
        monthError.classList.remove('show');
    });
    
    yearInput.addEventListener('input', function() {
        yearError.classList.remove('show');
    });
});