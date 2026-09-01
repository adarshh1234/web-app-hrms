import { PageHeader, Card, CardRow } from '../components/Card'
import { Loader } from '../components/Loader'
import { userService } from '../services/user.service'
import { useFetchData } from '../hooks/useFetchData'
import useToast from '../../../hooks/useToast'
import {
  CreditCardIcon,
  ShoppingBagIcon,
  FilmIcon,
  CalendarTicketIcon,
} from '../components/Icons'
import type { SubscriptionItem } from '../types/user.types'

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
          graphic={<CreditCardIcon />}
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
          graphic={<ShoppingBagIcon />}
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
          graphic={<FilmIcon />}
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
          graphic={<CalendarTicketIcon />}
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
