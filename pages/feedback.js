import useSWR from 'swr'

import {FeedbackEmptyState} from '@/components/feeback-empty-state'
import {SiteTableSkeleton} from '@/components/site-table-skeleton'
import {DashboardShell} from '@/components/dashboard-shell'
import {FeedbackTable} from '@/components/feedback-table'
import {FeedbackTableHeader} from '@/components/feedback-table-header'
import {Page} from '@/components/page'

import {useAuth} from '@/lib/auth'
import {fetcher} from '@/utils/fetcher'

function AllFeedback() {
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

  if (data.error) {
    alert(data.error.details)
    return null
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />

      {data?.feedback?.length ? <FeedbackTable allFeedback={data.feedback} /> : <FeedbackEmptyState />}
    </DashboardShell>
  )
}

function MyFeedbackPage() {
  return (
    <Page name="All Feedback" path="/feedback">
      <AllFeedback />
    </Page>
  )
}

export default MyFeedbackPage
