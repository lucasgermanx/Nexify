import { ActivationAccountConsumer } from '@/Lib/Consumers/ActivationAccountConsumer';
import { PasswordChangedConsumer } from '@/Lib/Consumers/PasswordChangedConsumer';
import { RecoverAccountConsumer } from '@/Lib/Consumers/RecoverAccountConsumer';
import { WelcomeConsumer } from '@/Lib/Consumers/WelcomeConsumer';

export class HermesConfiguration {
  /**
   * Configuração e inicialização dos consumers.
   * Define aqui os consumers do projeto Hermes
   */
  async startConsumers(): Promise<void> {
    WelcomeConsumer()
    ActivationAccountConsumer()
    RecoverAccountConsumer()
    PasswordChangedConsumer()
    console.log('Consumers loader')
  }
}