import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import '../styles/SignUpPage.css'

const SignUp = () => {

    const navigate = useNavigate()
    const { handleSubmit, register, reset } = useForm()

    const handleLogin = () => {
        navigate('/login')
    }

    const submit = (data) => {

        const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/users'

        axios.post(url, data)
            .then(() => {
                console.log(res.data);
                navigate(-1)
            })
            .catch(err => console.log(err))

        reset(
            {
                "firstName": "",
                "lastName": "",
                "email": "",
                "password": "",
                "phone": ""
            }
        )
    }

    return (
        <div className='sign__up-container'>
            <form onSubmit={handleSubmit(submit)}>
                <h2>Register User</h2>
                <label htmlFor="firstName" className="form__label">First Name</label>
                <input id='firstName' type="text" {...register("firstName")} placeholder='Enter your firstname' />

                <label htmlFor="lastName" className="form__label">Last Name</label>
                <input id='lastName' type="text" {...register("lastName")} placeholder='Enter your lastname' />

                <label htmlFor="email" className="form__label">Email</label>
                <input id='email' type="email" {...register("email")} placeholder='Enter your email' />

                <label htmlFor="password" className="form__label">Password</label>
                <input id='password' type="password" {...register("password")} placeholder='Enter your password' />

                <label htmlFor="phone" className="form__label">Number Phone</label>
                <input id='phone' type="text" {...register("phone")} placeholder='Enter your phone' />

                <button className='signUp__btn'>Sign Up</button>
                <div className='link__login'>
                    <span>You have an account? </span>
                    <button className='login__button' onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp