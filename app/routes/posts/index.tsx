import { Link, LoaderFunction, useLoaderData } from "remix";
import type { PostData } from "~/post";
import { getPosts } from "~/post";

export const loader: LoaderFunction = () => {
  return getPosts();
};

const Posts = () => {
  const posts = useLoaderData<PostData[]>();
  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
