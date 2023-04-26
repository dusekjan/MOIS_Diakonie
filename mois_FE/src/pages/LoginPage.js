import LoginForm from "../components/LoginForm";
import Header from "../components/Header";


/**
 * Normally, the browser would render the HTML and, depending on the action,
 * automatically submit the data of the form based on each element's name attribute.
 * Although this default behavior still works in React.js,
 * it is highly advised to programmatically submit a form
 * by supplying your own custom controls on how data is processed by a component.
 * https://www.pluralsight.com/guides/form-submission-in-reactjs
 *
 * @returns {JSX.Element}
 * @constructor
 */
function LoginPage() {

    return (
        <>
            <Header title="PŘIHLÁSIT"></Header>
            <main className="login">
                <LoginForm />
            </main>
        </>
    )
}

export default LoginPage;