import * as React from 'react';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useMatchRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Button
          variant={useMatchRoute()({ to: '/' }) ? 'default' : 'secondary'}
          asChild
        >
          <Link to="/">Home</Link>
        </Button>

        <Button
          variant={useMatchRoute()({ to: '/posts', fuzzy: true }) ? 'default' : 'secondary'}
          asChild
        >
          <Link to="/posts">Posts</Link>
        </Button>

        <Button
          variant={
            useMatchRoute()({ to: '/route-a' }) ? 'default' : 'secondary'
          }
          asChild
        >
          <Link to="/route-a">Pathless Layout</Link>
        </Button>
      </div>
      <hr />
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
