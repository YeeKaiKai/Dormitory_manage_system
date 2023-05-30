global_url = "http://localhost:3000/housemaster/announcement/"


// delete
function deleteItem(pk) {
  const url = global_url
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  let body = {
    "AnnounceNumber": pk,
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
function updateItem(pk) {
    const url = global_url
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    let body = {
      "AnnounceNumber": pk,
      "AnnounceTitle": document.getElementById("post-title" + pk).value,
      "AnnounceContent": document.getElementById("post-content" + pk).value,
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