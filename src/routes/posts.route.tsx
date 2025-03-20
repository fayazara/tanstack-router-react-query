import * as React from 'react';
import {
  Link,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postsQueryOptions } from '../postsQueryOptions';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/posts')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions),
  component: PostsLayoutComponent,
});

function PostsLayoutComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;

  return (
    <div className="p-2 flex gap-2">
      <ul className="space-y-2">
        {[...posts, { id: 'i-do-not-exist', title: 'Non-existent Post' }].map(
          (post) => {
            return (
              <li key={post.id} className="whitespace-nowrap">
                <Button
                  variant={
                    useMatchRoute()({
                      to: '/posts/$postId',
                      params: { postId: post.id },
                      fuzzy: true
                    })
                      ? 'default'
                      : 'secondary'
                  }
                  asChild
                  className="w-full justify-start"
                >
                  <Link
                    to="/posts/$postId"
                    params={{
                      postId: post.id,
                    }}
                  >
                    <div>{post.title.substring(0, 20)}</div>
                  </Link>
                </Button>
              </li>
            );
          }
        )}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
