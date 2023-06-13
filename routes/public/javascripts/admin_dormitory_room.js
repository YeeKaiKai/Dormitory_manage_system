global_url = "http://localhost:3000/admin/dormitory/room/"

var needDelete = []
function returnDeleteArr() {
  return needDelete;
}

function setDelete(arr){
  for(let i = 0;i < arr.length; i++){
    let checkBox=document.getElementById("delete" + arr[i])
    if(checkBox.checked){
      needDelete.push(checkBox.value)
    }
  }
  console.log(needDelete)
}

// delete
function deleteItem(dname) {
  for(let i = 0;i < needDelete.length; i++){
    const url = global_url
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    let body = {
      "RoomNumber": needDelete[i],
      "DName": dname
    }
    console.log(body)

    fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(json => {console.log(json)
    });
  }
  setTimeout('window.location.reload();',500);
}

  // update
function updateItem(arr,dname) {
  for(let i = 0;i < arr.length; i++){
    const url = global_url
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    let body = {
      "RoomNumber": arr[i],
      "newRoomNumber": document.getElementById(arr[i]).value,
      "DName": dname,
    }
    console.log(body)

    fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(json => console.log(json));
  }
  setTimeout('window.location.reload();',500);
}