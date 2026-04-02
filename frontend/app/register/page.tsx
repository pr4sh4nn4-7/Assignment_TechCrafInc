"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

interface IFormData {
  email: string
  password: string
  newPassword: string
  name: string
}

interface IErrors {
  email?: string
  password?: string
  newPassword?: string
  name?: string
}

const Register = () => {
  const [form, setForm] = useState<IFormData>({
    email: "",
    password: "",
    newPassword: "",
    name: ""
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [errors, setErrors] = useState<IErrors>({})

  const validateName = (name: string) => {
    const regex = /^[A-Za-z]+$/
    if (!name) return "Name is required"
    if (!regex.test(name)) return "Only alphabets allowed"
    return ""
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!regex.test(email)) return "Invalid email"
    return ""
  }

  const validatePassword = (password: string) => {
    if (!password) return "Password required"
    if (password.length < 6) return "Min 12 characters"
    return ""
  }

  const validateConfirmPassword = (password: string, newPassword: string) => {
    if (!newPassword) return "Confirm password required"
    if (password !== newPassword) return "Passwords do not match"
    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleBlur = (field: keyof IFormData) => {
    let error = ""

    if (field === "name") error = validateName(form.name)
    if (field === "email") error = validateEmail(form.email)
    if (field === "password") error = validatePassword(form.password)
    if (field === "newPassword")
      error = validateConfirmPassword(form.password, form.newPassword)

    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: IErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      newPassword: validateConfirmPassword(form.password, form.newPassword)
    }

    setErrors(newErrors)


    const hasError = Object.values(newErrors).some(e => e)
    if (hasError) return
    setLoading(true)

    try {

      console.log(process.env.NEXT_PUBLIC_AUTH_SERVICE)
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/register`, form)
      toast.success(data.message)
      router.push('/login')

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "something went wrong")
    } finally {
      setLoading(false)
    }



  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>

        <div className="mb-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onBlur={() => handleBlur("password")}
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="newPassword"
            placeholder="Confirm Password"
            value={form.newPassword}
            onChange={handleChange}
            onBlur={() => handleBlur("newPassword")}
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
        >
          {
            loading ? "Creating ......" : "Create Account"
          }
        </button>

      </form>
    </div>
  )
}

export default Register
