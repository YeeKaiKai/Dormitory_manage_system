global_url = "http://localhost:3000/admin/dormitory/room/facility/"

// delete
function deleteItem(pk1,pk2,pk3) {
    const url = global_url
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    let body = {
      "DName": pk1,
      "RoomNumber":pk2,
      "FName":pk3
    }
    console.log(body)
  
    fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(json => {
      console.log(json)
  
    });
  
    window.location.reload();
  }
  
  
  // update
  function updateItem(pk1,pk2,pk3) {
    const url = global_url
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    let body = {
      "DName": pk1,
      "RoomNumber":pk2,
      "FName":pk3,
      "FQuantity":document.getElementById(pk1+pk2+pk3).value,
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