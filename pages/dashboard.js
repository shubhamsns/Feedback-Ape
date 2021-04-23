import useSWR from 'swr'

import {EmptyState} from '@/components/empty-state'
import {SiteTableSkeleton} from '@/components/site-table-skeleton'
import {DashboardShell} from '@/components/dashboard-shell'
import {SiteTable} from '@/components/site-table'

import {useAuth} from '@/lib/auth'
import {fetcher} from '@/utils/fetcher'

function Dashboard() {
  const auth = useAuth()

  const {data} = useSWR('/api/sites', fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return <DashboardShell>{data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}</DashboardShell>
}

export default Dashboard
