
async function getUsers() {
  let url = "http://localhost:3000/admin/boarder/";

  fetch(url, {
    method: 'GET'
    // credentials: 'include'
  })
  .then((response) => response.json())
  .then((json) => {
      console.log(json)
      console.log('Gotcha');
    }).catch((err) => {
      console.log(err);
  });

}

getUsers();