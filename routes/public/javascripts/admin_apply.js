global_url = "http://localhost:3000/admin/application/"


// delete
// function deleteItem(pk1,pk2) {
//   const url = global_url
//   let headers = {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//   }
//   let body = {
//     "ApplyNumber": pk1,
//     "StuID":pk2
//   }
//   console.log(body)

//   fetch(url, {
//       method: "DELETE",
//       headers: headers,
//       body: JSON.stringify(body)
//   }).then(response => response.json())
//   .catch(json => {
//     console.log(json)

//   });

//   window.location.reload();
// }



// update
function updateItem(pk1, pk2) {
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
    // "Paid":document.getElementById("Paid").value
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