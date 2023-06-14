global_url = "http://localhost:3000/admin/dormitory/room/facility/"


// delete
function deleteItem(dname, roomNumber, pk) {
  const url = global_url
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  let body = {
    "FName": pk,
    "RoomNumber": roomNumber,
    "DName": dname
  }
  console.log(body)

  fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(body)
  }).then((response) => {console.log(response)})
  .catch(json => {
    console.log(json)

  });

  window.location.reload();
}


// update
function updateItem(dname, roomNumber, pk) {
  const url = global_url
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  let body = {
    "FName": pk,
    "newFName": document.getElementById(pk).value,
    "FQuantity": document.getElementById("FQuantity" + pk).value,
    "RoomNumber": roomNumber,
    "DName": dname
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
