import React from "react";
import { Route } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";
import NotLoggedIn from "../pages/NotLoggedIn";

export default function ProtectedRoute({ element }) {
  const { loggedIn, adminLoggedIn } = useLoginContext();

  if (!loggedIn || !adminLoggedIn) {
    return <NotLoggedIn />;
  }

  return element;
}
