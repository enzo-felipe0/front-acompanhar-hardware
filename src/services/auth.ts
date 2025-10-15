const API_URL = import.meta.env.VITE_API_URL ;

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface AuthResponse {
  mensagem: string;
  token: string;
  usuario: Usuario;
}

// Registrar novo usuário
export const registrar = async (nome: string, email: string, senha: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/registrar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, email, senha }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.erro || 'Erro ao registrar');
  }

  return response.json();
};

// Login
export const login = async (email: string, senha: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.erro || 'Erro ao fazer login');
  }

  return response.json();
};

// Salvar token no localStorage
export const salvarToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Obter token do localStorage
export const obterToken = (): string | null => {
  return localStorage.getItem('token');
};

// Remover token (logout)
export const logout = () => {
  localStorage.removeItem('token');
};

// Verificar se está autenticado
export const estaAutenticado = (): boolean => {
  return !!obterToken();
};

// Salvar dados do usuário
export const salvarUsuario = (usuario: Usuario) => {
  localStorage.setItem('usuario', JSON.stringify(usuario));
};

// Obter dados do usuário
export const obterUsuario = (): Usuario | null => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};
