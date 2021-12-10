import { Outlet, Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
import type { PostData } from "~/post";
import adminStyles from "~/styles/admin.css";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = () => {
  return getPosts();
};

const Edit = () => {
  const posts = useLoaderData<PostData[]>();
  return (
    <div>
      <nav>
        <h1>Edit</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Edit;
