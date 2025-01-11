import { auth0 } from '/src/lib/auth/auth0/server';

export const dynamic = 'force-dynamic';

export async function GET(req, ctx) {
  return auth0.handleProfile(req, ctx, {});
}
