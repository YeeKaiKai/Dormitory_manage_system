global_url = "http://localhost:3000/housemaster/repairForm"

// update
function updateItem(pk) {
    const url = global_url
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    let body = {
      "RepairNumber": pk,
      "DName": document.getElementById("DName" + pk).value,
      "RoomNumber": document.getElementById("RoomNumber" + pk).value,
      "FName": document.getElementById("FName" + pk).value,
      "RContent": document.getElementById("RContent" + pk).value,
      "Freetime": document.getElementById("Freetime" + pk).value,
    }
    console.log(body)
  
    fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(json => console.log(json));
  
    window.location.reload();
}