import { Mailer } from './mailer';
import { ServiceProvider } from '@rheas/services';
import { InstanceHandler } from '@rheas/contracts/container';

export class MailServiceProvider extends ServiceProvider {
    /**
     * Returns the email manager service that is responsible for managing
     * different drivers and delivery of emails.
     *
     * Email is a global service and is hence registered on the application
     * lifecycle.
     *
     * @returns
     */
    public serviceResolver(): InstanceHandler {
        return (app) => {
            return new Mailer();
        };
    }
}
