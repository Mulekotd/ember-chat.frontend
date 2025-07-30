"use client";

import { Check, Flame, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";

import Link from "next/link";

import React, { useState } from "react";
import { useConfig } from "@/hooks/useConfig";
import { useAuth } from "@/hooks/useAuth";

export default function SignUpPage() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { useRegister } = useAuth();

  const { formik } = useRegister();
  const { darkMode } = useConfig();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);

    const value = e.target.value;

    // Calcular força da senha
    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength++;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return darkMode ? "#ef4444" : "#dc2626";
    if (passwordStrength < 4) return darkMode ? "#f59e0b" : "#d97706";

    return darkMode ? "#10b981" : "#059669";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 2) return "Weak";
    if (passwordStrength < 4) return "Medium";

    return "Strong";
  };

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
      {/* Register Card */}
      <Card
        className="w-full max-w-md p-8 border transition-all duration-300 mt-10"
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
            Criar conta
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Junte-se à revolução das conversas efêmeras
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className={darkMode ? "text-gray-200" : "text-gray-700"}
            >
              Username
            </Label>
            <div className="relative">
              <User
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu username"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`pl-10 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    : "bg-white border-red-200 focus:border-red-400"
                } ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
          </div>

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
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`pl-10 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    : "bg-white border-red-200 focus:border-red-400"
                } ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className={darkMode ? "text-gray-200" : "text-gray-700"}
            >
              Senha
            </Label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={handlePasswordChange}
                onBlur={formik.handleBlur}
                className={`pl-10 pr-10 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    : "bg-white border-red-200 focus:border-red-400"
                } ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>

            {formik.touched.password && formik.errors.password ? (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            ) : formik.values.password ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Força da senha:
                  </span>
                  <span style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${(passwordStrength / 5) * 100}%`,
                      backgroundColor: getPasswordStrengthColor(),
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className={darkMode ? "text-gray-200" : "text-gray-700"}
            >
              Confirmar senha
            </Label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`pl-10 pr-10 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    : "bg-white border-red-200 focus:border-red-400"
                } ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}

            {formik.values.confirmPassword &&
              !formik.errors.confirmPassword && (
                <p
                  className={`text-xs flex items-center ${
                    darkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Senhas coincidem
                </p>
              )}
          </div>

          <div className="flex items-start space-x-3">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className={`mt-1 rounded ${
                darkMode ? "bg-gray-700 border-gray-600" : "border-red-300"
              }`}
              required
            />
            <Label
              htmlFor="terms"
              className={`text-sm leading-tight ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Eu concordo com os Termos de Serviço e Política de Privacidade
            </Label>
          </div>

          <Button
            type="submit"
            className={`w-full py-3 ${
              darkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            } text-white transition-colors duration-200`}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? <Loader /> : "Criar conta"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className={`${
                darkMode
                  ? "text-red-400 hover:text-red-300"
                  : "text-red-600 hover:text-red-500"
              } hover:underline font-medium`}
            >
              Fazer login
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}
