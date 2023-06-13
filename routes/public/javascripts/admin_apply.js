global_url = "http://localhost:3000/admin/application/"

// update in
function updateItem_in(pk1, pk2, pk3, pk4) {
  const url = global_url
  console.log(url);
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  let body = {
    "ApplyNumber": pk1,
    "StuID":pk2,
    "Approved":document.getElementById("Approved" + pk1 + pk2).value,
    "DName":pk3,
    "Paid":document.getElementById("Paid"+ pk1 + pk2).value,
    "AType":pk4
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

// update exc/out
function updateItem_eo(pk1, pk2, pk3, pk4, pk5) {
  const url = global_url
  console.log(url);
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  let body = {
    "ApplyNumber": pk1,
    "StuID":pk2,
    "Approved":document.getElementById("Approved" + pk1 + pk2).value,
    "DName":pk3,
    "RoomNumber":pk4,
    "AType":pk5
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