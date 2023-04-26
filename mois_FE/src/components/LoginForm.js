import {useRef, useState} from "react";
import Input from "./Input";
import { RiLockPasswordFill } from "react-icons/ri"
import { MdEmail } from "react-icons/md"
import {makeRequest} from "../utils/requests";
import {useNavigate} from "react-router-dom";
import {isEmailValid} from "../utils/validators";

function LoginForm() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const submitButton = useRef(null)
    const navigate = useNavigate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()

        if (!isEmailValid(email)) {
            alert("Zadejte validní emailovou adresu.")
        } else {
            submitButton.current.disabled = true;
            try {
                const response = await makeRequest("/auth/login", {email, password });
                if (response["json_status"] < 300){
                    navigate("/")
                } else {
                    alert("Nesprávné údaje")
                }
            } catch (e) {
            }
            finally {
                submitButton.current.disabled = false
            }
        }
    }

    return (
        <form className="in-column" onSubmit={handleOnSubmit}>
            <Input
                label={<>{<MdEmail/>}E-MAIL</>}
                id="email"
                type="email"
                placeholder="jan.novak@email.cz"
                value={email}
                onChange={handleEmailChange}/>
            <Input
                label={<>{<RiLockPasswordFill/>}HESLO</>}
                id="password"
                type="password"
                placeholder="*****"
                value={password}
                onChange={handlePasswordChange}/>

            <button className="button" ref={submitButton}>PŘIHLÁSIT SE</button>
        </form>
    );
}

export default LoginForm;