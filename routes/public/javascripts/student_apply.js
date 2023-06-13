var typeSelect = document.querySelector('select[name="AType"]'); 
var roomLabel = document.querySelector('label[for="inputRoom"]');
var roomInput = document.querySelector('input[name="Room"]');
                        
typeSelect.addEventListener('change', function() {
    if (typeSelect.value === '換宿申請' || typeSelect.value === '退宿申請') {
        roomLabel.style.display = 'block';
        roomInput.style.display = 'block';
    } else {
        roomLabel.style.display = 'none';
        roomInput.style.display = 'none';
    }
});