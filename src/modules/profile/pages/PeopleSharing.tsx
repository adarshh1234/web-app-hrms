import { PageHeader, Card, CardRow, PageGrid } from '../components/Card'
import { Loader } from '../components/Loader'
import { EmptyState } from '../components/EmptyState'
import { userService } from '../services/user.service'
import { useFetchData } from '../hooks/useFetchData'
import useToast from '../../../hooks/useToast'
import {
  UserCircleIcon,
  SavedInteractionsIcon,
  PhoneIcon,
  BlockIcon,
  StarIcon,
} from '../components/Icons'
import type { ContactItem } from '../types/user.types'

export default function PeopleSharing() {
  const { showToast } = useToast()
  const { data: contacts, isLoading } = useFetchData(() => userService.getContacts())

  if (isLoading) {
    return <Loader text="Loading contacts & sharing info..." />
  }

  return (
    <>
      <PageHeader
        title="People & Sharing"
        subtitle="People you interact with and the info you make visible on LetGetIn services"
      />

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 20 }}>
        <Card
          title="Contacts"
          description="Organize your LetGetIn contacts so you can connect with people on LetGetIn services, like Mail"
        >
          {contacts && contacts.length > 0 ? (
            <CardRow
              icon={<UserCircleIcon />}
              label={`Contacts (${contacts.length})`}
              value={contacts.map((c: ContactItem) => c.name).join(', ')}
              onClick={() => showToast('Contacts manager opened', 'info')}
              chevron={false}
            />
          ) : (
            <EmptyState
              icon={<UserCircleIcon />}
              title="No contacts found"
              description="You have no saved contacts in your LetGetIn account."
            />
          )}
          <CardRow
            icon={<SavedInteractionsIcon />}
            label="Contact info from saved interactions"
            value="On"
            onClick={() => showToast('Saved interactions setting clicked', 'info')}
          />
          <CardRow
            icon={<PhoneIcon />}
            label="Contact info from your devices"
            value="On"
            onClick={() => showToast('Device contacts sync clicked', 'info')}
          />
          <CardRow
            icon={<BlockIcon />}
            label="Blocked"
            value="No blocked users"
            onClick={() => showToast('Blocked users list opened', 'info')}
          />
        </Card>

        <PageGrid>
          <Card
            title="Location sharing"
            description="You aren't sharing your real-time location with anyone on LetGetIn"
            footer={
              <button
                type="button"
                className="link-btn"
                onClick={() => showToast('Location sharing manager opened', 'info')}
              >
                Manage location sharing
              </button>
            }
          />
          <Card title="Choose what others see">
            <CardRow
              icon={<UserCircleIcon />}
              label="About me"
              value="What personal info you make visible to others"
              onClick={() => showToast('About me profile settings opened', 'info')}
              chevron={false}
            />
          </Card>
        </PageGrid>

        <Card
          title="Share recommendations in ads"
          description="You can choose to show your name, profile photo, and activity in shared endorsements in ads to help others find things you're interested in"
        >
          <CardRow
            icon={<StarIcon />}
            label="Shared endorsements in ads"
            value="On"
            onClick={() => showToast('Shared endorsements toggled', 'info')}
          />
        </Card>
      </div>
    </>
  )
}
