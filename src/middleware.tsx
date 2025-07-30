import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/chat"];
const guestRoutes = ["/", "/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Verifica se a rota atual é protegida ou de visitante
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isGuestRoute = guestRoutes.includes(pathname);

  // LÓGICA DE REDIRECIONAMENTO E LIMPEZA

  // Cenário 1: Usuário NÃO está logado e tenta acessar uma rota protegida.
  // Ação: Redirecionar para a página de login.
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Cenário 2: Usuário ESTÁ logado e acessa uma rota de visitante.
  // Ação: Permitir o acesso à página, mas remover o cookie de autenticação.
  // Isso efetivamente desloga o usuário.
  if (isGuestRoute && token) {
    // Cria uma resposta para permitir a navegação para a rota de visitante
    const response = NextResponse.next();
    // Na resposta, instrui o navegador a apagar o cookie
    response.cookies.delete("auth_token");
    return response;
  }

  // Se nenhuma das condições acima for atendida, permita o acesso.
  return NextResponse.next();
}

// O matcher define em quais rotas o middleware será executado.
export const config = {
  matcher: ["/chat/:path*", "/", "/login", "/register", "/forgot-password"],
};
