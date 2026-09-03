import { NotificationChannel, INotification } from '../../types/notification.types';


export interface INotificationProvider {
  channel: NotificationChannel;
  send(notification: INotification): Promise<{ success: boolean; providerResponse?: any }>;
}

export class MockNotificationProvider implements INotificationProvider {
  constructor(public channel: NotificationChannel) {}

  async send(notification: INotification): Promise<{ success: boolean; providerResponse?: any }> {
    console.log(`[Provider Stub - ${this.channel}] Dispatching message ID: ${notification._id || 'new'}`);
    return {
      success: true,
      providerResponse: {
        status: 'DISPATCHED_STUB',
        channel: this.channel,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

export class ProviderRegistry {
  private providers: Map<NotificationChannel, INotificationProvider> = new Map();

  constructor() {
    // Register stub providers for V1
    Object.values(NotificationChannel).forEach((channel) => {
      this.registerProvider(new MockNotificationProvider(channel as NotificationChannel));
    });
  }

  registerProvider(provider: INotificationProvider): void {
    this.providers.set(provider.channel, provider);
  }

  getProvider(channel: NotificationChannel): INotificationProvider {
    const provider = this.providers.get(channel);
    if (!provider) {
      return new MockNotificationProvider(channel);
    }
    return provider;
  }
}

export const providerRegistry = new ProviderRegistry();
