import {
  useActionData,
  Form,
  redirect,
  ActionFunction,
  useTransition,
  LoaderFunction,
  useLoaderData,
} from "remix";
import invariant from "tiny-invariant";
import { createPost, editPost, getPost } from "~/post";

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await editPost({ title, slug, markdown });

  return redirect("/admin");
};

const EditPost = () => {
  const post = useLoaderData();
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title && <em>Title is required</em>}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug && <em>Slug is required</em>}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
        />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Saving Changes..." : "Save Changes"}
        </button>
      </p>
    </Form>
  );
};

export default EditPost;
