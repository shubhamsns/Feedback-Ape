import {useRouter} from 'next/router'
import useSWR from 'swr'

import {useAuth} from '@/lib/auth'
import {fetcher} from '@/utils/fetcher'

import {FeedbackEmptyState} from '@/components/feeback-empty-state'
import {SiteTableSkeleton} from '@/components/site-table-skeleton'
import {DashboardShell} from '@/components/dashboard-shell'
import {FeedbackTable} from '@/components/feedback-table'
import {FeedbackTableHeader} from '@/components/feedback-table-header'
import {Page} from '@/components/page'

function SiteFeedback() {
  const {user} = useAuth()
  const {
    query: {siteId},
  } = useRouter()

  const {data} = useSWR(user ? [`/api/feedback/${siteId}`, user.token] : null, fetcher)

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
      {data.feedback.length ? <FeedbackTable allFeedback={data.feedback} /> : <FeedbackEmptyState />}
    </DashboardShell>
  )
}

function MyFeedbackPage() {
  return (
    <Page name="Name of the site" path={`/feedback/${1 + 1}`}>
      <SiteFeedback />
    </Page>
  )
}

export default MyFeedbackPage
