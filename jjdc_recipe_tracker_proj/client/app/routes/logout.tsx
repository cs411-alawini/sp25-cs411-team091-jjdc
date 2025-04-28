import { useState } from "react";
import { login, searchUserData } from "~/services/services";
import { Form, redirect, useActionData, data, Link } from "react-router";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { getSession, destroySession } from "~/services/sessions.server";
import { Row, Col } from "react-bootstrap";

// temp logout form for testing


export async function action({ request }: { request: Request }) {
    const session = await getSession(
      request.headers.get("Cookie")
    );

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  
  export default function LogoutRoute() {
    return (
      <>
        <p>Are you sure you want to log out?</p>
        <Form method="post">
          <button>Logout</button>
        </Form>
        <Link to="/">Never mind</Link>
      </>
    );
  }
