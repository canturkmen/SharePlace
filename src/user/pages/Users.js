import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Can Turkmen",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg/800px-Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg",
      places: 3,
    },
    {
      id: "u2",
      name: "Can Turkmen",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg/800px-Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
