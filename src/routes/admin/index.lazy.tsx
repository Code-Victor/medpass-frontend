import { createLazyFileRoute } from '@tanstack/react-router'

// For authentication: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
export const Route = createLazyFileRoute('/admin/')({
  component: () => <div>Hello /admin/!</div>
})