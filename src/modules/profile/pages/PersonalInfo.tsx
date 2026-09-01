import { useState } from 'react'
import { PageHeader, Card, CardRow } from '../components/Card'
import { Modal } from '../components/Modal'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Loader } from '../components/Loader'
import { userService } from '../services/user.service'
import { useFetchData } from '../hooks/useFetchData'
import useToast from '../../../hooks/useToast'
import { GlobeIcon } from '../components/Icons'

export default function PersonalInfo() {
  const { showToast } = useToast()
  const { data: profile, isLoading, setData } = useFetchData(() => userService.getUserProfile())

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [fieldToEdit, setFieldToEdit] = useState<string>('')
  const [fieldValue, setFieldValue] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)

  const handleOpenEdit = (fieldName: string, currentVal: string) => {
    setFieldToEdit(fieldName)
    setFieldValue(currentVal)
    setEditModalOpen(true)
  }

  const handleSave = async () => {
    if (!profile) return
    setIsSaving(true)
    try {
      const fieldKeyMap: Record<string, string> = {
        Name: 'name',
        Nickname: 'nickname',
        Birthday: 'birthday',
        Gender: 'gender',
      }

      const key = fieldKeyMap[fieldToEdit]
      if (key) {
        const updated = await userService.updateUserProfile({ [key]: fieldValue })
        setData(updated)
        showToast(`${fieldToEdit} updated successfully`, 'success')
      }
      setEditModalOpen(false)
    } catch {
      showToast(`Failed to update ${fieldToEdit}`, 'error')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <Loader text="Loading personal info..." />
  }

  return (
    <>
      <PageHeader title="Personal info" subtitle="Basic info, like your name and photo, that you use on LetGetIn" />

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 20 }}>
        <Card title="Profile" description="Some info may be visible to other people using LetGetIn. Learn more">
          <div className="profile-photo-row">
            <div>
              <p className="field-label">Photo</p>
              <p className="field-value">Add a photo to personalize your account</p>
            </div>
            <div className="avatar-sm">{profile?.avatarText || 'U'}</div>
          </div>
          <CardRow
            label="Name"
            value={profile?.name || ''}
            onClick={() => handleOpenEdit('Name', profile?.name || '')}
          />
          <CardRow
            label="Nickname"
            value={profile?.nickname || ''}
            onClick={() => handleOpenEdit('Nickname', profile?.nickname || '')}
          />
          <CardRow
            label="Birthday"
            value={profile?.birthday || ''}
            onClick={() => handleOpenEdit('Birthday', profile?.birthday || '')}
          />
          <CardRow
            label="Gender"
            value={profile?.gender || ''}
            onClick={() => handleOpenEdit('Gender', profile?.gender || '')}
          />
          <CardRow
            label={`Password — Last changed ${profile?.passwordLastChanged}`}
            onClick={() => showToast('Password change settings opened', 'info')}
          />
        </Card>

        <Card title="Contact info">
          <CardRow
            label="Email"
            value={profile?.email}
            onClick={() => handleOpenEdit('Email', profile?.email || '')}
          />
          <CardRow
            label="Phone Number"
            value={profile?.phone}
            onClick={() => handleOpenEdit('Phone', profile?.phone || '')}
          />
        </Card>

        <Card
          title="Choose what others see"
          description="You decide what personal info you make visible to others across LetGetIn"
          graphic={<GlobeIcon />}
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('About me visibility settings opened', 'info')}
            >
              Go to About me
            </button>
          }
        />
      </div>

      <Modal
        isOpen={editModalOpen}
        title={`Edit ${fieldToEdit}`}
        onClose={() => setEditModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </>
        }
      >
        <Input
          label={fieldToEdit}
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          placeholder={`Enter new ${fieldToEdit}`}
        />
      </Modal>
    </>
  )
}
