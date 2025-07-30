"use client";

import { Mail, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";

import Link from "next/link";

import { useConfig } from "@/hooks/useConfig";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const { useResetPassword } = useAuth();

  const { formik } = useResetPassword();
  const { darkMode } = useConfig();

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 transition-all duration-500"
      style={{
        backgroundColor: darkMode ? "#30302E" : "white",
        background: darkMode
          ? "#30302E"
          : "linear-gradient(135deg, white 0%, #fef2f2 50%, white 100%)",
        color: darkMode ? "white" : "#111827",
      }}
    >
      {/* Forgot Password Card */}
      <Card
        className="w-full max-w-md p-8 border transition-all duration-300"
        style={{
          backgroundColor: darkMode ? "#3D3D3B" : "rgba(255, 255, 255, 0.8)",
          borderColor: darkMode ? "#262624" : "rgba(254, 202, 202, 0.5)",
          backdropFilter: darkMode ? "none" : "blur(8px)",
        }}
      >
        <div className="text-center mb-8">
          <div
            className={`p-3 rounded-lg w-fit mx-auto mb-4 ${
              darkMode ? "bg-red-600" : "bg-red-500"
            }`}
          >
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${darkMode && "text-white"}`}>
            Esqueceu sua senha?
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } leading-relaxed`}
          >
            Não se preocupe! Digite seu email abaixo e enviaremos instruções
            para redefinir sua senha.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className={darkMode ? "text-gray-200" : "text-gray-700"}
            >
              Email
            </Label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`pl-10 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    : "bg-white border-red-200 focus:border-red-400"
                }`}
                required
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p
                className={`text-sm ${
                  darkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                {formik.errors.email}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className={`w-full py-3 ${
              darkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            } text-white transition-colors duration-200`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Loader /> : "Enviar email de recuperação"}
          </Button>
        </form>

        {/* Divisor */}
        <div className="my-6 flex items-center">
          <div
            className={`flex-1 border-t ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          ></div>
          <span
            className={`px-4 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            ou
          </span>
          <div
            className={`flex-1 border-t ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          ></div>
        </div>

        <div className="mt-6 text-center">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Lembrou da senha?{" "}
            <Link
              href="/login"
              className={`${
                darkMode
                  ? "text-red-400 hover:text-red-300"
                  : "text-red-600 hover:text-red-500"
              } hover:underline font-medium`}
            >
              Faça login
            </Link>
          </p>
          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className={`${
                darkMode
                  ? "text-red-400 hover:text-red-300"
                  : "text-red-600 hover:text-red-500"
              } hover:underline font-medium`}
            >
              Registre-se
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}
