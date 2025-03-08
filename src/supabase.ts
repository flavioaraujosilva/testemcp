import { createClient } from '@supabase/supabase-js';

// Substitua estas variáveis pelos seus valores reais do Supabase
const SUPABASE_URL = 'https://hucjuslzmhddvcfcunkz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1Y2p1c2x6bWhkZHZjZmN1bmt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMzE2ODIsImV4cCI6MjA1NjcwNzY4Mn0.ZLyE2OYTi9FggcBuHxFDAIxFKYoxq70MWI-wDJQ67KA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

// Tipos para as tabelas
export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

// Funções auxiliares para operações com o banco de dados
export const db = {
  // Listar todas as tabelas
  async listTables() {
    try {
      // Tenta acessar a tabela users para verificar se ela existe
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('count')
        .limit(1);

      const tables = [];
      
      if (!usersError) {
        tables.push({
          table_name: 'users',
          exists: true
        });
      }

      return tables;
    } catch (error) {
      throw error;
    }
  },

  // Criar um novo usuário
  async createUser(userData: Omit<User, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Buscar todos os usuários
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) throw error;
    return data;
  },

  // Buscar um usuário específico
  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar um usuário
  async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Deletar um usuário
  async deleteUser(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};