async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value.trim();
  // Sets post_data to query selector with post-data
  const post_data = document
    .querySelector('input[name="post-data"]')
    .value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_data,
    }),

    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
