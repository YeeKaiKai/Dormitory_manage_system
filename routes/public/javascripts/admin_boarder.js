global_url = "http://localhost:3000/admin/boarder/"

//delete 
function deleteItem(pk) {
  const url = global_url
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    credentials: 'include'
  }

  let body = {
    "StuID": pk,   //primarykey
  }

  fetch(url, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body)
  }).then(response => response.json())
  .then(json => console.log(json));

  window.location.reload();

}

// update
function updateItem(pk) {
  const url = global_url
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  let body = {
    "StuID": pk,
    "DName": document.getElementById("dorm-name"+pk).value,
    "RoomNumber": document.getElementById("room-number"+pk).value
  }

  fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body)
  }).then(response => response.json())
  .then(json => console.log(json));

  window.location.reload();
}



