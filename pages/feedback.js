import useSWR from 'swr'

import {EmptyState} from '@/components/empty-state'
import {SiteTableSkeleton} from '@/components/site-table-skeleton'
import {DashboardShell} from '@/components/dashboard-shell'
import {FeedbackTable} from '@/components/feedback-table'
import {FeedbackTableHeader} from '@/components/feedback-table-header'

import {useAuth} from '@/lib/auth'
import {fetcher} from '@/utils/fetcher'

function MyFeedback() {
  const {user} = useAuth()

  const {data} = useSWR(user ? ['/api/feedback', user.token] : null, fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback.length ? <FeedbackTable allFeedback={data.feedback} /> : <EmptyState />}
    </DashboardShell>
  )
}

export default MyFeedback
