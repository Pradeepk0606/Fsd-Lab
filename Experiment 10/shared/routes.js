import { z } from 'zod';
import { insertUserSchema, insertPostSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional()
  }),
  unauthorized: z.object({
    message: z.string()
  }),
  internal: z.object({
    message: z.string()
  })
};

export const api = {
  auth: {
    signup: {
      method: 'POST',
      path: '/api/auth/signup',
      input: insertUserSchema,
      responses: {
        201: z.custom(),
        400: errorSchemas.validation
      }
    },
    login: {
      method: 'POST',
      path: '/api/auth/login',
      input: z.object({
        email: z.string().email(),
        password: z.string()
      }),
      responses: {
        200: z.custom(),
        401: errorSchemas.unauthorized
      }
    },
    logout: {
      method: 'POST',
      path: '/api/auth/logout',
      responses: {
        200: z.object({ message: z.string() })
      }
    },
    me: {
      method: 'GET',
      path: '/api/auth/me',
      responses: {
        200: z.custom(),
        401: errorSchemas.unauthorized
      }
    }
  },
  posts: {
    list: {
      method: 'GET',
      path: '/api/posts',
      responses: {
        200: z.array(z.custom())
      }
    },
    create: {
      method: 'POST',
      path: '/api/posts',
      input: insertPostSchema,
      responses: {
        201: z.custom(),
        401: errorSchemas.unauthorized
      }
    },
    like: {
      method: 'POST',
      path: '/api/posts/:id/like',
      responses: {
        200: z.custom(),
        401: errorSchemas.unauthorized
      }
    }
  }
};

export function buildUrl(path, params) {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}