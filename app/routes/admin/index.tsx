import { Link } from "remix";

const AdminIndex = () => {
  return (
    <div>
      <p>
        <Link to="new">Create a New Post</Link>
      </p>
      <p>
        <Link to="edit">Edit existing Post</Link>
      </p>
    </div>
  );
};

export default AdminIndex;
