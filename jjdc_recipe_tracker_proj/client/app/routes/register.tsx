import axios from "axios";
import { useState } from "react";
import { register } from "~/services/services";
import { Form, useActionData } from "react-router";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { Row, Col } from "react-bootstrap";


// const [loginStatus, setLoginStatus] = useState("");


export async function action({ request } : { request: Request }) {
    const formData = await request.formData();
    const username = formData.get("name");
    const password = formData.get("password");
    const userID = formData.get("userID");

    

}

export function meta() {
  return [
    { title: "Balance Bites Project" },
    { name: "description", content: "CS411 Project" },
  ];
}

export default function Register() {

    const [loginStatus, setLoginStatus] = useState("");
    const data = useActionData();


    return (
        <div className="main flex h-screen justify-center items-center">
        <Card className="dark p-8 rounded-md m-2 md:w-1/2">
          <CardBody>
            <Row>
              <Col> 
                <h1 className="text-3xl font-bold text-center mb-4">
                  Create an account
                </h1>
                <Form method="post">
                  <Row>
                    <Col>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name (required)"
                        isRequired
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <Input
                        type="text"
                        name="username"
                        placeholder="Enter Your User ID (required)"
                        isRequired
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Enter Your Password (required)"
                        isRequired
                      />
                      {/* {actionData?.success && (
                        <Row className="mt-2">
                          <div className="mt-2 p-2 bg-green-100 text-green-800 text-sm rounded">
                            {actionData.success}
                          </div>
                        </Row>
                      )}
                      {actionData?.error && (
                        <Row className="mt-2">
                          <div className="mt-2 p-2 bg-red-100 text-red-800 text-sm rounded">
                            {actionData.error}
                          </div>
                        </Row>
                      )} */}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={12} md={12}>
                      <Button
                        type="submit"
                        color="primary"
                        className="xs:w-full md:w-full"
                      >
                        Register
                      </Button>
                    </Col>
                    <Col xs={12} md={12} className="text-end">
                      <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2"
                        href="login"
                      >
                        Already registered?
                      </a>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
}  