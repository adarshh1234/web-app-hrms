import { PageGrid, Card } from '../components/common/Card'
import { Loader } from '../components/common/Loader'
import { userService } from '../services/user.service'
import { useFetchData } from '../hooks/useFetchData'
import { useToast } from '../hooks/useToast'
import './pages.css'

export default function Home() {
  const { showToast } = useToast()
  const { data: profile, isLoading: isProfileLoading } = useFetchData(() => userService.getUserProfile())
  const { data: storage, isLoading: isStorageLoading } = useFetchData(() => userService.getStorageUsage())

  const handleAction = (actionName: string) => {
    showToast(`${actionName} opened`, 'info')
  }

  if (isProfileLoading || isStorageLoading) {
    return <Loader text="Loading your home dashboard..." />
  }

  return (
    <div className="home-page">
      <div className="home-avatar">{profile?.avatarText || 'U'}</div>
      <h1 className="home-welcome">Welcome, {profile?.name || 'User'}</h1>
      <p className="home-subtitle">
        Manage your info, privacy, and security to make LetGetIn work better for you
      </p>

      <PageGrid>
        <Card
          title="Privacy & personalization"
          description="See the data in your LetGetIn account and choose what activity is saved to personalize your experience"
          graphic={<span>🔐</span>}
          footer={
            <button type="button" className="link-btn" onClick={() => handleAction('Privacy & Personalization')}>
              Manage your data and personalization
            </button>
          }
        />
        <Card
          title="Security issues found"
          description="Protect your account now by resolving these issues"
          graphic={<span>🛡️</span>}
          footer={
            <button type="button" className="link-btn" onClick={() => handleAction('Security Checkup')}>
              Secure account
            </button>
          }
        />
        <Card
          title="Account storage"
          description="Your account storage is shared across LetGetIn services, like Mail and Files"
          graphic={<span>💾</span>}
          footer={
            <button type="button" className="link-btn" onClick={() => handleAction('Storage Manager')}>
              Manage Storage
            </button>
          }
        >
          <p className="storage-line">
            {storage?.usedPercentage}% used — {storage?.usedGb} GB of {storage?.totalGb} GB
          </p>
        </Card>
        <Card
          title="Take the Privacy Checkup"
          description="This step-by-step guide helps you choose the privacy settings that are right for you"
          graphic={<span>🕵️</span>}
          footer={
            <button type="button" className="link-btn" onClick={() => handleAction('Privacy Checkup')}>
              Get started
            </button>
          }
        />
      </PageGrid>

      <p className="home-footnote">
        Only you can see your settings. You might also want to review your settings for other services you use.
        LetGetIn keeps your data private, safe, and secure.{' '}
        <button type="button" className="link-btn" onClick={() => handleAction('Learn More')}>
          Learn more
        </button>
      </p>
    </div>
  )
}
