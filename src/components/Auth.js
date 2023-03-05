import { auth, provider } from "../firebase-config.js"
import { signInWithPopup } from "firebase/auth"
import "../styles/Auth.css"
import Cookies from "universal-cookie"

const cookies = new Cookies()

export const Auth = (props) => {
    const { setIsAuth } = props;
    const singInWidthGoogle = async () => {

        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            cookies.set("auth-token", result.user.refreshToken)
            setIsAuth(true)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="auth">
            <p>Sign In Width Google To Continue</p>
            <button onClick={singInWidthGoogle}>Sign In Width Google</button>
        </div>
    )
}