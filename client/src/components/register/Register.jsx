import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";
import { validators } from "../../utils/validationUtils";
import FormField from "../formField/FormField";

export default function Register() {
    const navigate = useNavigate();
    const { registerHandler } = useContext(UserContext);

    const registerSubmitHandler = async (values) => {
        const { email, password, profilePicture } = values;

        try {
            await registerHandler(email, password, profilePicture);
            navigate('/');
        } catch (err) {
            alert(err.message || 'Registration failed. Please try again.');
        }
    }

    const {
        register,
        formAction,
        getFieldError,
    } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: '',
    }, {
        email: [validators.required, validators.email],
        password: [validators.required, validators.minLength(6)],
        confirmPassword: [
            validators.required,
            validators.matchField('password', 'password')
        ],
        profilePicture: [validators.url],
    });

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-md mx-auto px-4 py-12">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

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
                                placeholder="At least 6 characters"
                            />
                        </FormField>

                        <FormField 
                            label="Confirm Password" 
                            error={getFieldError('confirmPassword')}
                            required
                        >
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register('confirmPassword')}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    getFieldError('confirmPassword') ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="Confirm your password"
                            />
                        </FormField>

                        <FormField 
                            label="Profile Picture URL (Optional)" 
                            error={getFieldError('profilePicture')}
                        >
                            <input
                                type="text"
                                id="profilePicture"
                                {...register('profilePicture')}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    getFieldError('profilePicture') ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </FormField>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-md font-medium transition-colors">
                            Register
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}