import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessLayout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="p-2">
      <div className='bg-gray-100 rounded-lg p-4'>
      <div className="border-b mb-6">I'm the parent layout - file (src/routes/_pathlessLayout.tsx)</div>
        <Outlet />
      </div>
    </div>
  )
}
