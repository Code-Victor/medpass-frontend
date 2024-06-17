import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_adminauth/department')({
  component: () => <div>Hello /admin/_adminauth/department!</div>
})