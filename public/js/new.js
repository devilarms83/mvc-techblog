const newFormHandler = async function(event) {
  event.preventDefault();

  const post_title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-body"]').value;

  console.log(post_title);
  console.log(post_content);

  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      post_title,
      post_content,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);