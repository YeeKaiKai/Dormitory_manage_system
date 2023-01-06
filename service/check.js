/**
 * Check if the data is null
 * @param {{String}} data 
 * @returns 
 */
exports.checkNull = function(data) {
    for(let d in data) {
        return false;
    }
    return true;
}