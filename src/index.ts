import { db, User } from './supabase';

export interface Env {
	// Add your environment variables here
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		
		// Rota para listar todas as tabelas
		if (url.pathname === '/api/tables' && request.method === 'GET') {
			try {
				const tables = await db.listTables();
				return new Response(JSON.stringify(tables), {
					headers: { 'Content-Type': 'application/json' },
				});
			} catch (error: any) {
				return new Response(JSON.stringify({ error: error.message }), {
					headers: { 'Content-Type': 'application/json' },
					status: 500,
				});
			}
		}

		// Rota para criar um novo usuário
		if (url.pathname === '/api/users' && request.method === 'POST') {
			try {
				const userData = await request.json() as Omit<User, 'id' | 'created_at'>;
				const newUser = await db.createUser(userData);
				return new Response(JSON.stringify(newUser), {
					headers: { 'Content-Type': 'application/json' },
					status: 201,
				});
			} catch (error: any) {
				return new Response(JSON.stringify({ error: error.message }), {
					headers: { 'Content-Type': 'application/json' },
					status: 400,
				});
			}
		}

		// Rota para buscar todos os usuários
		if (url.pathname === '/api/users' && request.method === 'GET') {
			try {
				const users = await db.getUsers();
				return new Response(JSON.stringify(users), {
					headers: { 'Content-Type': 'application/json' },
				});
			} catch (error: any) {
				return new Response(JSON.stringify({ error: error.message }), {
					headers: { 'Content-Type': 'application/json' },
					status: 500,
				});
			}
		}

		// Rota para buscar um usuário específico
		if (url.pathname.match(/^\/api\/users\/[^\/]+$/) && request.method === 'GET') {
			try {
				const id = url.pathname.split('/').pop();
				if (!id) throw new Error('ID não fornecido');
				const user = await db.getUserById(id);
				return new Response(JSON.stringify(user), {
					headers: { 'Content-Type': 'application/json' },
				});
			} catch (error: any) {
				return new Response(JSON.stringify({ error: error.message }), {
					headers: { 'Content-Type': 'application/json' },
					status: 404,
				});
			}
		}

		// Rota para atualizar um usuário
		if (url.pathname.match(/^\/api\/users\/[^\/]+$/) && request.method === 'PUT') {
			try {
				const id = url.pathname.split('/').pop();
				if (!id) throw new Error('ID não fornecido');
				const updates = await request.json() as Partial<User>;
				const updatedUser = await db.updateUser(id, updates);
				return new Response(JSON.stringify(updatedUser), {
					headers: { 'Content-Type': 'application/json' },
				});
			} catch (error: any) {
				return new Response(JSON.stringify({ error: error.message }), {
					headers: { 'Content-Type': 'application/json' },
					status: 400,
				});
			}
		}

		// Rota para deletar um usuário
		if (url.pathname.match(/^\/api\/users\/[^\/]+$/) && request.method === 'DELETE') {
			try {
				const id = url.pathname.split('/').pop();
				if (!id) throw new Error('ID não fornecido');
				await db.deleteUser(id);
				return new Response(null, { status: 204 });
			} catch (error: any) {
				return new Response(JSON.stringify({ error: error.message }), {
					headers: { 'Content-Type': 'application/json' },
					status: 400,
				});
			}
		}

		// Rota padrão
		return new Response('API do Supabase com Cloudflare Workers', {
			headers: { 'Content-Type': 'text/plain' },
		});
	},
} satisfies ExportedHandler<Env>;