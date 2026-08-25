import { useState } from 'react'
import { PageHeader, Card, CardRow, PageGrid } from '../components/common/Card'
import { Loader } from '../components/common/Loader'
import { userService } from '../services/user.service'
import { useFetchData } from '../hooks/useFetchData'
import { useToast } from '../hooks/useToast'
import {
  GlobeIcon,
  MapPinIcon,
  PlayVideoIcon,
  TagIcon,
  ActivityChartIcon,
  CloudDownloadIcon,
  PlanPlugIcon,
  TrashIcon,
  KeyboardIcon,
  UserAccessibilityIcon,
  SearchIcon,
  HistoryIcon,
  GridIcon,
  BellIcon,
} from '../components/common/Icons'
import type { ActivityControl } from '../types/user.types'
import './pages.css'

export default function DataPersonalization() {
  const { showToast } = useToast()
  const { data: storage } = useFetchData(() => userService.getStorageUsage())
  const { data: activityControls, isLoading, setData: setActivityData } = useFetchData(() =>
    userService.getActivityControls()
  )

  const [businessPersonalization, setBusinessPersonalization] = useState(false)

  const handleToggleActivity = (id: string, currentStatus: 'On' | 'Off' | 'Paused') => {
    if (!activityControls) return
    const nextStatus = currentStatus === 'On' ? 'Off' : 'On'
    const updated = activityControls.map((item) =>
      item.id === id ? { ...item, status: nextStatus as 'On' | 'Off' } : item
    )
    setActivityData(updated)
    const item = activityControls.find((i) => i.id === id)
    showToast(`${item?.title} turned ${nextStatus}`, 'info')
  }

  const handleBusinessToggle = () => {
    setBusinessPersonalization((prev) => {
      const next = !prev
      showToast(`Business personalization turned ${next ? 'On' : 'Off'}`, 'info')
      return next
    })
  }

  const getActivityIcon = (title: string) => {
    if (title.includes('Web')) return <GlobeIcon />
    if (title.includes('Location')) return <MapPinIcon />
    return <PlayVideoIcon />
  }

  if (isLoading) {
    return <Loader text="Loading data & personalization settings..." />
  }

  return (
    <>
      <PageHeader
        title="Data & personalization"
        subtitle="Your data, activity, and preferences that help make LetGetIn services more useful to you"
      />

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 20 }}>
        <Card
          title="Take the Privacy Checkup"
          description="This step-by-step guide helps you choose the privacy settings that are right for you"
          graphic={<span>🔒</span>}
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Privacy Checkup started', 'info')}
            >
              Get Started
            </button>
          }
        />

        <Card
          title="Activity controls"
          description="You can choose to save your activity for better personalization across LetGetIn. Turn on or pause these settings at any time."
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Activity controls manager opened', 'info')}
            >
              Manage your activity controls
            </button>
          }
        >
          {activityControls?.map((ctrl: ActivityControl) => (
            <CardRow
              key={ctrl.id}
              icon={getActivityIcon(ctrl.title)}
              label={ctrl.title}
              value={ctrl.status}
              onClick={() => handleToggleActivity(ctrl.id, ctrl.status)}
            />
          ))}
        </Card>

        <PageGrid>
          <Card title="Ad personalization" description="You can make ads more useful to you">
            <CardRow
              icon={<TagIcon />}
              label="Ad personalization"
              value="On"
              onClick={() => showToast('Ad personalization settings clicked', 'info')}
              chevron={false}
            />
          </Card>
          <Card
            title="Activity and timeline"
            description="See the activity saved in your account and the places you've been. You can delete any or all your past activity."
          >
            <CardRow
              icon={<ActivityChartIcon />}
              label="My Activity"
              value=""
              onClick={() => showToast('My Activity opened', 'info')}
              chevron={false}
            />
            <CardRow
              icon={<MapPinIcon />}
              label="Timeline"
              value=""
              onClick={() => showToast('Timeline opened', 'info')}
              chevron={false}
            />
          </Card>
        </PageGrid>

        <Card
          title="Things you create and do"
          description="Check your Dashboard to see a summary of your services and the data saved in your account"
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Dashboard opened', 'info')}
            >
              Go to Dashboard
            </button>
          }
        >
          <div style={{ display: 'flex', gap: 24, padding: '16px 0', overflowX: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eef4ff', color: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HistoryIcon />
              </div>
              <span>Search activity</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e6f4ea', color: '#137333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPinIcon />
              </div>
              <span>Maps</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fef7e0', color: '#b06000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GridIcon />
              </div>
              <span>Play Store</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fce8e6', color: '#c5221f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlayVideoIcon />
              </div>
              <span>YouTube</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f3e8fd', color: '#8430ce', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BellIcon />
              </div>
              <span>Mail</span>
            </div>
          </div>
        </Card>

        <Card
          title="Account Storage"
          description="Your account storage is shared across LetGetIn services, like Mail and Files"
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Storage manager opened', 'info')}
            >
              Manage Storage
            </button>
          }
        >
          <p className="storage-line">
            {storage?.usedPercentage}% used — {storage?.usedGb} GB of {storage?.totalGb} GB
          </p>
        </Card>

        <Card title="Download, delete, or make a plan for your data">
          <CardRow
            icon={<CloudDownloadIcon />}
            label="Download your data"
            value="Make a copy of your data"
            onClick={() => showToast('Data download requested', 'success')}
          />
          <CardRow
            icon={<PlanPlugIcon />}
            label="Make a plan for your account"
            value="Plan what happens if you stop using your account"
            onClick={() => showToast('Account plan settings opened', 'info')}
          />
          <CardRow
            icon={<TrashIcon />}
            label="Delete a service or your account"
            value="Remove a service or your account"
            onClick={() => showToast('Account deletion options opened', 'warning')}
          />
        </Card>

        <Card title="General Preferences for the web" description="Manage settings for LetGetIn services on the web">
          <CardRow
            icon={<GlobeIcon />}
            label="Language"
            value="English (United States)"
            onClick={() => showToast('Language selection opened', 'info')}
          />
          <CardRow
            icon={<KeyboardIcon />}
            label="Input Tools"
            value="English / Keyboard"
            onClick={() => showToast('Input tools opened', 'info')}
          />
          <CardRow
            icon={<UserAccessibilityIcon />}
            label="Accessibility"
            value="Standard"
            onClick={() => showToast('Accessibility settings opened', 'info')}
          />
          <CardRow
            icon={<SearchIcon />}
            label="Search Settings"
            value="Private results and safe search"
            onClick={() => showToast('Search settings opened', 'info')}
            chevron={false}
          />
        </Card>

        <Card
          title="Reservations"
          description="Your past and upcoming reservations for flights, hotels, and events"
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Reservations manager opened', 'info')}
            >
              Manage reservations
            </button>
          }
        />

        <Card
          title="Business personalization"
          description="See personalized features to grow your local business."
        >
          <div className="toggle-row" style={{ margin: '12px 0' }}>
            <button
              type="button"
              className={`status-dot ${businessPersonalization ? 'status-on' : 'status-off'}`}
              onClick={handleBusinessToggle}
              style={{ border: 'none', cursor: 'pointer' }}
            />
            <span>{businessPersonalization ? 'On' : 'Off'}</span>
          </div>
          <button
            type="button"
            className="link-btn"
            onClick={handleBusinessToggle}
          >
            Set up business personalization
          </button>
        </Card>
      </div>
    </>
  )
}
