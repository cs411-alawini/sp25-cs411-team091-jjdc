import { useState } from "react";
import { login, searchUserData } from "~/services/services";
import { Form, redirect, useActionData, data } from "react-router";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { getCurrentUserID, createNewUserSession } from "~/services/sessions.server";
import { Row, Col } from "react-bootstrap";


export async function loader({ request }: { request: Request }) {
    const user = await getCurrentUserID(request);

    if (user) {
        console.log("redirect to home")
        return redirect("/");
    }
    
    return data({
        error: {},
    }, {
        headers: {
            
        },
    })
}


export async function action({ request }: { request: Request }) {
    let formData = await request.formData();

    const password = formData.get("password");
    const userID = formData.get("username");

    if (typeof userID !== "string" || typeof password !== "string") {
        return { error: "Username and/or password are invalid", status: 401 }
    }

    const existingUser = await searchUserData(userID)
    // check if empty, or write another function for it.
    console.log(existingUser)

    const currUser = await login(userID, password)
    console.log(currUser.length)
    if (currUser.length == 0) {
        return {
            error: "Username and/or password are invalid",
            status: 401,
        }
    }

    return createNewUserSession(userID, "/")
}
 

export function meta() {
    return [
      { title: "Balance Bites Project" },
      { name: "description", content: "CS411 Project" },
    ];
}


export default function Login() {
    const data = useActionData();

    return (
        <div className="main flex h-screen justify-center items-center">
        <Card className="dark p-8 rounded-md m-2 md:w-1/2">
          <CardBody>
            <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
            <Form method="post">
                <div className="flex flex-col gap-4 max-w-md">
                    <Input 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        isRequired
                        />
                        
                    <Input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        isRequired
                        />
                    {data?.error && (
                      <Row className="mt-2">
                        <div className="mt-2 p-2 bg-red-100 text-red-800 text-sm rounded">
                          {data.error}
                        </div>
                      </Row>
                    )}
                </div>
                <Row className="mt-4">
                <Col xs={12} md={12}>
                    <Button
                    type="submit"
                    color="primary"
                    className="xs:w-full md:w-full"
                    >
                    Sign In
                    </Button>
                </Col>
                <Col xs={12} md={12} className="text-end">
                    <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2"
                    href="register"
                    >
                    Not registered? Sign up
                    </a>
                </Col>
                </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
}
