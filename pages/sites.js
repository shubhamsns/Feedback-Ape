import useSWR from 'swr'

import {useAuth} from '@/lib/auth'
import {fetcher} from '@/utils/fetcher'

import {EmptyState} from '@/components/empty-state'
import {SiteTableSkeleton} from '@/components/site-table-skeleton'
import {DashboardShell} from '@/components/dashboard-shell'
import {SiteTable} from '@/components/site-table'
import {SiteTableHeader} from '@/components/site-table-header'
import {Page} from '@/components/page'

function Dashboard() {
  const {user} = useAuth()

  const {data} = useSWR(user ? ['/api/sites', user.token] : null, fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteTableHeader numberOfSites={data.sites.length} />
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}

function DashboardPage() {
  return (
    <Page name="Dashboard" path="/sites">
      <Dashboard />
    </Page>
  )
}

export default DashboardPage
