global_url = "http://192.168.1.112:3000/admin/announcement"


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
      "AnnounceTitle": document.getElementById("post-title").value,
      "AnnounceContent": document.getElementById("post-content").value,
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