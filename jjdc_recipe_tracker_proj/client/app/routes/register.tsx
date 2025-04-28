import { register, searchUserData } from "~/services/services";
import { Form, useActionData, data, redirect } from "react-router";
import { Button, Card, CardBody, Input, user } from "@heroui/react";
import { getCurrentUserID } from "~/services/sessions.server";
import { Row, Col } from "react-bootstrap";


// const [loginStatus, setLoginStatus] = useState("");
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

export async function action({ request } : { request: Request }) {
    console.log("testerr")
    const formData = await request.formData();
    const username = formData.get("name");
    const password = formData.get("password");
    const userID = formData.get("username");
    console.log(userID)

    if (typeof userID !== "string" || typeof password !== "string" || typeof username !== "string") {
        return { error: "Username and password are required", status: 401 }
    }

    const existingUser = await searchUserData(userID)
    // check if empty, or write another function for it.
    console.log(existingUser)
    if (existingUser.length !== 0) {
        return { error: "User with given User ID already exists", status: 401 }
    }

    // now I can try and create the user
    console.log("now running register")
    try {
        const newUser = await register(userID, password, username);
        console.log("worked?")
        
        return redirect("/")  //{ success: "User successfully created" }
    } catch (error) {
        
    }

}

export function meta() {
  return [
    { title: "Balance Bites Project" },
    { name: "description", content: "CS411 Project" },
  ];
}

export default function Register() {

    const data = useActionData();


    return (
        <div className="main flex h-screen justify-center items-center">
        <Card className="dark p-8 rounded-md m-2 md:w-1/2">
          <CardBody>
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
                    {/* {data?.success && (
                      <Row className="mt-2">
                        <div className="mt-2 p-2 bg-green-100 text-green-800 text-sm rounded">
                          {data.success}
                        </div>
                      </Row>
                    )} */}
                    {data?.error && (
                      <Row className="mt-2">
                        <div className="mt-2 p-2 bg-red-100 text-red-800 text-sm rounded">
                          {data.error}
                        </div>
                      </Row>
                    )}
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
          </CardBody>
        </Card>
      </div>
    )
}  