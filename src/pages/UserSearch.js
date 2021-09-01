import React, { useState, useEffect } from "react";
import { fetchSearchUsers } from "../data/api";
import { connect } from "react-redux";
import { setSearchUsers } from "../redux/actions/searchActions";

function UserSearch(props) {
  const [users, setUsers] = useState("");
  const [usersStore, setUserStore] = useState([]);

  useEffect(() => {}, []);

  const searchUsers = (users) => {
    console.log("test", users);
    fetchSearchUsers(users.users)
      .then((response) => {
        console.log("usersres", response);
        if (response.success === true && response.data.length > 0) {
          setUserStore(response.data);
          props.setSearchUsers(response.data);
        }
      })
      .catch((err) => {
        console.log("fetch error search-users", err);
      });
  };
  console.log("userstored", usersStore);

  return (
    <div className="search-user">
      <div className="user-heading">
        <h3>Users</h3>
        <p className="user-que">Are you searching for any particular user?</p>
        <p className="user-ans">
          User in StudentVerse have a publicly available profile <br /> search
          for any particular user whose question / answer interests you.
        </p>
      </div>

      <div className="usersearch-section">
        <input
          className="form-control me-2 userinput-search"
          type="text"
          id="profile-search"
          placeholder="Enter the Username"
          onChange={(event) => {
            setUsers({
              users: event.target.value,
            });
          }}
        />
        <button
          onClick={() => searchUsers(users)}
          className="btn btn-outline-success btn-srchuser"
          id="button-search"
        >
          Search
        </button>
      </div>

      <div className="view-user">
        {usersStore &&
          usersStore.map((userm, index) => {
            return (
              <>
                {/* {userm.fname} */}
                {userm.fname.includes(users) ? (
                  <>{userm.fname}</>
                ) : (
                  <div class="card" style={{ width: "18rem;" }}>
                    <div class="card-body">
                      <a href={`/profile/${userm._id}`} class="btn btn-primary">
                        <span class="card-title">{userm.fname}</span>
                      </a>
                      <p> User you are looking for </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setSearchUsers,
};

const mapStateTOProps = (state) => {
  return {
    UsersStore: state.searchReducer.searchUsers,
  };
};

export default connect(mapStateTOProps, mapDispatchToProps)(UserSearch);
