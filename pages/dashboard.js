import {useAuth} from '@/lib/auth'
import {EmptyState} from '@/components/empty-state'
import {SiteTableSkeleton} from '@/components/site-table-skeleton'
import {DashboardShell} from '@/components/dashboard-shell'

function Dashboard() {
  const auth = useAuth()

  if (!auth.user) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <EmptyState />
    </DashboardShell>
  )
}

export default Dashboard
