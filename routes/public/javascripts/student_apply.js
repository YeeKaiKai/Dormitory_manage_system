var typeSelect = document.querySelector('select[name="AType"]'); 
var roomLabel = document.querySelector('label[for="inputRoom"]');
var roomInput = document.querySelector('input[name="ARoomNumber"]');

roomLabel.style.display = 'none';
roomInput.style.display = 'none';

typeSelect.addEventListener('change', function() {
    if (typeSelect.value === '申請住宿' || typeSelect.value ==='申請退宿') {
        roomLabel.style.display = 'none';
        roomInput.style.display = 'none';
    } else {
        roomLabel.style.display = 'block';
        roomInput.style.display = 'block';
    }
});