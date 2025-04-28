import { Form } from "react-router";


export default function SignupButton() {
    return (
        <div className="absolute bottom-0 right-0 m-2">
            <Form action="/register" method="post">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Signup
                </button>
            </Form>
        </div>
    );
}