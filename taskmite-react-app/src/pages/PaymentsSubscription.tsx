import { PageHeader, Card, CardRow } from '../components/common/Card'
import { Loader } from '../components/common/Loader'
import { userService } from '../services/user.service'
import { useFetchData } from '../hooks/useFetchData'
import { useToast } from '../hooks/useToast'
import {
  CreditCardIcon,
  ShoppingBagIcon,
  FilmIcon,
  CalendarTicketIcon,
} from '../components/common/Icons'
import type { SubscriptionItem } from '../types/user.types'
import './pages.css'

export default function PaymentsSubscription() {
  const { showToast } = useToast()
  const { data: subscriptions, isLoading } = useFetchData(() => userService.getSubscriptions())

  if (isLoading) {
    return <Loader text="Loading payments & subscriptions..." />
  }

  return (
    <>
      <PageHeader
        title="Payments & subscriptions"
        subtitle="Your payment info, transactions, recurring payments, and reservations"
      />

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 20 }}>
        <Card
          title="Payment methods"
          description="Save payment info for more secure payments online, for your Assistant and in store"
          graphic={
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#eef4ff', color: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCardIcon />
            </div>
          }
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Payment methods manager opened', 'info')}
            >
              Manage payment methods
            </button>
          }
        />
        <Card
          title="Purchases"
          description="Your purchases, including deliveries and other online orders"
          graphic={
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e6f4ea', color: '#137333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBagIcon />
            </div>
          }
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Purchases history opened', 'info')}
            >
              Manage purchases
            </button>
          }
        />
        <Card
          title="Subscriptions"
          description="Your recurring payments for subscription services, like news and streaming media"
          graphic={
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fce8e6', color: '#c5221f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FilmIcon />
            </div>
          }
          footer={
            <button
              type="button"
              className="link-btn"
              onClick={() => showToast('Subscription manager opened', 'info')}
            >
              Manage subscription
            </button>
          }
        >
          {subscriptions?.map((sub: SubscriptionItem) => (
            <CardRow
              key={sub.id}
              icon={<FilmIcon />}
              label={sub.title}
              value={`${sub.cost} (${sub.status})`}
              onClick={() => showToast(`Managing subscription: ${sub.title}`, 'info')}
            />
          ))}
        </Card>
        <Card
          title="Reservations"
          description="Your past and upcoming reservations for flights, hotels, and events"
          graphic={
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fef7e0', color: '#b06000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarTicketIcon />
            </div>
          }
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
      </div>
    </>
  )
}
