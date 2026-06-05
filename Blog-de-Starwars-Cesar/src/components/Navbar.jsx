import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemoveFavorite = (e, uid, type) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "remove_favorite",
      payload: { uid, type }
    });
  };

  return (
    <nav className="navbar navbar-light bg-light mb-4 border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          Star Wars Blog
        </Link>
        
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="favoritesDropdown"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            Favorites <span className="badge bg-secondary ms-1">{store.favorites.length}</span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end shadow"
            aria-labelledby="favoritesDropdown"
            style={{ minWidth: "220px" }}
          >
            {store.favorites.length === 0 ? (
              <li className="text-center py-2 text-muted small">Empty</li>
            ) : (
              store.favorites.map((fav) => (
                <li
                  key={`${fav.type}-${fav.uid}`}
                  className="d-flex justify-content-between align-items-center px-3 py-1"
                >
                  <Link
                    to={`/single/${fav.type}/${fav.uid}`}
                    className="dropdown-item p-0 text-truncate me-2"
                    style={{ maxWidth: "150px" }}
                  >
                    {fav.name}
                  </Link>
                  <button
                    onClick={(e) => handleRemoveFavorite(e, fav.uid, fav.type)}
                    className="btn btn-sm btn-link text-danger p-0"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;