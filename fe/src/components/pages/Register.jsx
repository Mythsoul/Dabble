import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa"
import { motion } from "framer-motion"
import useAuthStore from "@/store/AuthStore"
function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const password = watch("password", "")
  const setUser = useAuthStore((state) => state.setUser)
  const setAuth = useAuthStore((state) => state.setIsAuthenticated)
axios.defaults.withCredentials = true
  const onSubmit = async (data) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post(`${backendUrl}/api/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
        credential: true,
      })

      if (response.data?.success) {
        const { user } = response.data
        setUser(user)
        setAuth(true)
        navigate("/")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider) => {
    try {
      window.location.href = `${backendUrl}/api/auth/${provider}`
    } catch (err) {
      setError("Failed to connect with authentication provider")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-800"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create an account</h1>
          <p className="text-gray-400 mt-2">Join us today</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 bg-red-900/30 border-l-4 border-red-500 text-red-300 rounded"
          >
            <p>{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div variants={itemVariants}>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:outline-none text-white ${
                errors.username
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-gray-700 focus:ring-purple-500/30 focus:border-purple-500"
              }`}
              placeholder="johndoe"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:outline-none text-white ${
                errors.email
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-gray-700 focus:ring-purple-500/30 focus:border-purple-500"
              }`}
              placeholder="your@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:outline-none text-white ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-gray-700 focus:ring-purple-500/30 focus:border-purple-500"
                }`}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                    },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}

            {/* Password strength indicator */}
            {password && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      password.length < 6
                        ? "w-1/4 bg-red-500"
                        : password.length < 8
                          ? "w-2/4 bg-yellow-500"
                          : password.length < 10
                            ? "w-3/4 bg-blue-500"
                            : "w-full bg-green-500"
                    }`}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {password.length < 6
                    ? "Weak"
                    : password.length < 8
                      ? "Fair"
                      : password.length < 10
                        ? "Good"
                        : "Strong"}
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded bg-gray-800"
              {...register("terms", { required: "You must accept the terms and conditions" })}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Terms and Conditions
              </a>
            </label>
          </motion.div>
          {errors.terms && <p className="mt-1 text-sm text-red-400">{errors.terms.message}</p>}

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 mt-4 relative overflow-hidden group"
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              <>
                <span className="relative z-10">Create account</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </>
            )}
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <motion.button
              variants={itemVariants}
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOAuthLogin("github")}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300"
            >
              <FaGithub className="h-5 w-5 text-white" />
              <span className="ml-2 font-medium text-gray-300">GitHub</span>
            </motion.button>

            <motion.button
              variants={itemVariants}
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOAuthLogin("google")}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300"
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              <span className="ml-2 font-medium text-gray-300">Google</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-8 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Register
