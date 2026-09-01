import { useState } from 'react'
import { PageHeader, Card, CardRow } from '../components/Card'
import { Loader } from '../components/Loader'
import { userService } from '../services/user.service'
import { useFetchData } from '../hooks/useFetchData'
import useToast from '../../../hooks/useToast'
import {
  KeyIcon,
  PhoneIcon,
  ShieldCheckIcon,
  MailIcon,
  MonitorIcon,
  LockIcon,
  LinkIcon,
} from '../components/Icons'
import type { SecurityIssue } from '../types/user.types'

export default function Security() {
  const { showToast } = useToast()
  const { data: issues, isLoading } = useFetchData(() => userService.getSecurityIssues())
  const { data: profile } = useFetchData(() => userService.getUserProfile())

  const [twoStepStatus, setTwoStepStatus] = useState(false)
  const [lessSecureApps, setLessSecureApps] = useState(false)

  const handleToggleTwoStep = () => {
    setTwoStepStatus((prev) => {
      const next = !prev
      showToast(`2-Step Verification turned ${next ? 'On' : 'Off'}`, next ? 'success' : 'warning')
      return next
    })
  }

  const handleToggleLessSecure = () => {
    setLessSecureApps((prev) => {
      const next = !prev
      showToast(`Less secure app access turned ${next ? 'On' : 'Off'}`, next ? 'warning' : 'info')
      return next
    })
  }

  if (isLoading) {
    return <Loader text="Loading security settings..." />
  }

  return (
    <>
      <PageHeader title="Security" subtitle="Settings and recommendations to help you keep your account secure" />

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 20 }}>
        <Card
          title="Security issues found"
          description="Protect your account now by resolving these issues"
          graphic={<ShieldCheckIcon />}
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Resolving security issues...', 'info')}
            >
              Secure account
            </button>
          }
        >
          {issues?.map((issue: SecurityIssue) => (
            <div key={issue.id} style={{ margin: '8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>{issue.title}:</strong> {issue.description}
            </div>
          ))}
        </Card>

        <Card title="Signing in to Google">
          <CardRow
            icon={<KeyIcon />}
            label="Password"
            value={`Last changed ${profile?.passwordLastChanged}`}
            onClick={() => showToast('Password reset requested', 'info')}
          />
          <CardRow
            icon={<PhoneIcon />}
            label="Use your phone to sign in"
            value="Off"
            onClick={() => showToast('Phone sign-in settings opened', 'info')}
          />
          <CardRow
            icon={<ShieldCheckIcon />}
            label="2-Step verification"
            value={twoStepStatus ? 'On' : 'Off'}
            onClick={handleToggleTwoStep}
          />
        </Card>

        <Card
          title="Ways we can verify it's you"
          description="These can be used to make sure it's really you signing in or to reach you if there's suspicious activity in your account"
        >
          <CardRow
            icon={<PhoneIcon />}
            label="Recovery phone"
            value={profile?.phone}
            onClick={() => showToast('Recovery phone settings opened', 'info')}
          />
          <CardRow
            icon={<MailIcon />}
            label="Recovery email"
            value={profile?.email}
            onClick={() => showToast('Recovery email settings opened', 'info')}
          />
        </Card>

        <Card title="Recent security events">
          <CardRow
            icon={<MonitorIcon />}
            label="Your recent activity"
            value="New York, USA (Active now)"
            onClick={() => showToast('Activity log opened', 'info')}
          />
        </Card>

        <Card
          title="Less secure app access"
          description="To protect your account, apps and devices that use less secure sign-in technology are blocked. LetGetIn will automatically turn this setting off if it's not being used."
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={handleToggleLessSecure}
            >
              {lessSecureApps ? 'Turn off access (Recommended)' : 'Turn on access (Not recommended)'}
            </button>
          }
        >
          <div className="toggle-row" style={{ margin: '8px 0' }}>
            <span className={`status-dot ${lessSecureApps ? 'status-on' : 'status-off'}`} />{' '}
            {lessSecureApps ? 'On' : 'Off'}
          </div>
        </Card>

        <Card title="Signing in to other sites">
          <CardRow
            icon={<LockIcon />}
            label="Signing in with Google"
            value="You use your account to sign in to 7 sites and apps"
            onClick={() => showToast('3rd party apps list opened', 'info')}
          />
          <CardRow
            icon={<KeyIcon />}
            label="Password Manager"
            value="30 passwords saved"
            onClick={() => showToast('Password Manager opened', 'info')}
          />
          <CardRow
            icon={<LinkIcon />}
            label="Linked Accounts"
            value="No linked accounts"
            onClick={() => showToast('Linked accounts manager opened', 'info')}
          />
        </Card>
      </div>
    </>
  )
}
