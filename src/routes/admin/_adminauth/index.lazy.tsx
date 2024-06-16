import { createLazyFileRoute } from '@tanstack/react-router'

// For authentication: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
export const Route = createLazyFileRoute('/admin/_adminauth/')({
  component: () => <div>Hello /admin/!</div>
})