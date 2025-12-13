import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import UserContext from "../../contexts/UserContext";
import { validators } from "../../utils/validationUtils";
import FormField from "../formField/FormField";

export default function Login() {
    const navigate = useNavigate();
    const { loginHandler } = useContext(UserContext);

    const submitHandler = async ({ email, password }) => {
        try {
            await loginHandler(email, password);
            navigate('/');
        } catch (err) {
            alert(err.message || 'Login failed. Please check your credentials.');
        }
    }

    const {
        register,
        formAction,
        getFieldError,
    } = useForm(submitHandler, {
        email: '',
        password: '',
    }, {
        email: [validators.required, validators.email],
        password: [validators.required, validators.minLength(3)],
    });

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-md mx-auto px-4 py-12">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>

                    <form className="space-y-6" action={formAction}>
                        <FormField 
                            label="Email" 
                            error={getFieldError('email')}
                            required
                        >
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    getFieldError('email') ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="your@email.com"
                            />
                        </FormField>

                        <FormField 
                            label="Password" 
                            error={getFieldError('password')}
                            required
                        >
                            <input
                                type="password"
                                id="password"
                                {...register('password')}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    getFieldError('password') ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="Enter your password"
                            />
                        </FormField>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-md font-medium transition-colors">
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}