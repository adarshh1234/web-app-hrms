import { PageHeader, Card, CardRow, PageGrid } from '../components/Card'
import { Loader } from '../components/Loader'
import { userService } from '../services/user.service'
import { useFetchData } from '../hooks/useFetchData'
import useToast from '../../../hooks/useToast'
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  PhoneIcon,
  MegaphoneIcon,
  LightbulbIcon,
} from '../components/Icons'
import type { HelpArticle } from '../types/user.types'

export default function Help() {
  const { showToast } = useToast()
  const { data: articles, isLoading } = useFetchData(() => userService.getHelpArticles())

  if (isLoading) {
    return <Loader text="Loading help center..." />
  }

  return (
    <>
      <PageHeader title="Help" subtitle="Answers to common questions, expert advice, and a way to provide feedback" />

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 20 }}>
        <Card
          title="Help with common issues"
          description="A list of help articles with answers and tips for your LetGetIn account"
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Help Center opened', 'info')}
            >
              Visit the help center
            </button>
          }
        >
          {articles?.map((article: HelpArticle) => (
            <CardRow
              key={article.id}
              icon={<DocumentTextIcon />}
              label={article.title}
              onClick={() => showToast(`Reading article: ${article.title}`, 'info')}
              chevron={false}
            />
          ))}
        </Card>

        <Card title="Guided steps">
          <CardRow
            icon={<ShieldCheckIcon />}
            label="Take the Privacy Checkup"
            value="Choose the privacy settings that are right for you"
            onClick={() => showToast('Privacy Checkup started', 'info')}
          />
          <CardRow
            icon={<ShieldCheckIcon />}
            label="We keep your account protected"
            value="Personalized recommendations to secure your account"
            onClick={() => showToast('Security recommendations opened', 'info')}
          />
          <CardRow
            icon={<PhoneIcon />}
            label="Find your phone"
            value="Secure your lost or stolen device"
            onClick={() => showToast('Find my device tool opened', 'info')}
          />
        </Card>

        <PageGrid>
          <Card
            title="Ask a community expert"
            description="Ask questions and get advice on account features and settings"
            footer={
              <button
                type="button"
                className="link-btn"
                onClick={() => showToast('Community forum opened', 'info')}
              >
                Visit the community
              </button>
            }
          />
          <Card title="Share feedback">
            <CardRow
              icon={<MegaphoneIcon />}
              label="Report an issue"
              value="Let us know if something is not working"
              onClick={() => showToast('Issue reporter opened', 'info')}
              chevron={false}
            />
            <CardRow
              icon={<LightbulbIcon />}
              label="Make a suggestion"
              value="Help improve LetGetIn services"
              onClick={() => showToast('Feedback form opened', 'info')}
              chevron={false}
            />
          </Card>
        </PageGrid>
      </div>
    </>
  )
}
