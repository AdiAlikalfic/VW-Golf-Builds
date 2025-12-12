import {useState} from "react"
import "./Auth.css"
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { loginUser, registerUser } from "../../api/authApi";

function Auth({setPage, setIsAuthenticated}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const isLoginValid = email && password;
    const isRegisterValid = name && email && password && confirmPassword && (password === confirmPassword)
    const finalValidation = isLogin ? isLoginValid : isRegisterValid;
    const handleSubmit = isLogin ? SignIn : Register

  async function SignIn() {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginUser({email,password});

      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      setPage("home")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function Register() {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!")
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    setLoading(true);
    setError("")

    try {
      const data = await registerUser({name, email, password});

      localStorage.getItem("token", data.token)
      setIsAuthenticated(true);
      setPage("home")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function toggleMode() {
    setIsLogin(isLogin => !isLogin)

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  }

    return (
    <div className="auth-page">
        <div className="auth-card">
        <h2>{isLogin ? 'Sign In' : 'Register'}</h2>

        {error && <p className="auth-error">{error}</p>}

        {!isLogin && <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {!isLogin && <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}

        <Button
        onClick={handleSubmit}
        variant="primary"
        disabled={loading} >
          {isLogin ? (loading ? "Signing In..." : "Sign In") : (loading ? 'Creating Account...' : 'Register')}
        </Button>
        <Button onClick={toggleMode} variant="primary" >
          {isLogin ? 'Create Account' : 'Back to Sign In'}
        </Button>

        </div>
    </div>
    )
}

export default Auth