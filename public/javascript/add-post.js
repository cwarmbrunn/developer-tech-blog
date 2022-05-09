async function newFormHandler(event) {
  // Prevents default from happening
  event.preventDefault();

  // Sets title to query selector with post-title
  const title = document.querySelector('input[name="post-title"]').value;
  // Sets post_url to query selector with post-url
  const post_data = document.querySelector('input[name="post-data"]').value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
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
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
