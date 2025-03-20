export type PostType = {
  id: string;
  title: string;
  body: string;
};

export class PostNotFoundError extends Error {}

export const fetchPost = async (postId: string) => {
  console.info(`Fetching post with id ${postId}...`);
  await new Promise((r) => setTimeout(r, 500));

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new PostNotFoundError(`Post with id "${postId}" not found!`);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const post = await response.json();
  return post;
};

export const fetchPosts = async () => {
  console.info('Fetching posts...');
  await new Promise((r) => setTimeout(r, 500));

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const posts = await response.json();
  return posts.slice(0, 10);
};
