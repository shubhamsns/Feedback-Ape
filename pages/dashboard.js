import useSWR from 'swr'

import {useAuth} from '@/lib/auth'

import {EmptyState} from '@/components/empty-state'
import {SiteTableSkeleton} from '@/components/site-table-skeleton'
import {DashboardShell} from '@/components/dashboard-shell'

import {fetcher} from '@/utils/fetcher'
import {SiteTable} from '@/components/site-table'

function Dashboard() {
  const auth = useAuth()

  const {data, error} = useSWR('/api/sites', fetcher)

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
