global_url = "http://localhost:3000/admin/repairForm"

// update
function updateItem(pk) {
    const url = global_url
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    let body = {
      "RepairNumber": pk,
      "RStatus": document.getElementById("RStatus" + pk).value,
    }
    console.log(body)
  
    fetch(url, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(json => console.log(json));
  
    window.location.reload();
}