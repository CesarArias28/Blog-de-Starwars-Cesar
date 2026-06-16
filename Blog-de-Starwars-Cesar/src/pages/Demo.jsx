import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="container mt-4">
      <ul className="list-group">
        {store && store.todos?.map((item) => {
          return (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ background: item.background }}
            >
              <Link to="/">Link to: {item.title}</Link>
              <span className="text-muted small">Open store.js to see global store actions</span>
              <button
                className="btn btn-success"
                onClick={() => dispatch({
                  type: "add_task",
                  payload: { id: item.id, color: "#ffa500" }
                })}
              >
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back Home</button>
      </Link>
    </div>
  );
};
