import { config } from '/src/config';
import { paths } from '/src/paths';
import { auth0 } from '/src/lib/auth/auth0/server';

export const dynamic = 'force-dynamic';

export async function GET(req, ctx) {
  return auth0.handleLogin(req, ctx, {
    authorizationParams: { redirect_uri: new URL(paths.auth.auth0.callback, config.auth0.baseUrl).toString() },
    returnTo: new URL(paths.dashboard.overview, config.auth0.baseUrl).toString(),
  });
}
