import { Mailer } from './mailer';
import { IApp } from '@rheas/contracts/core/app';
import { ServiceProvider } from '@rheas/services';
import { IMailConfig } from '@rheas/contracts/configs';
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
            const mailConfig: IMailConfig = (app as IApp).configs().get('mail');

            return new Mailer(mailConfig);
        };
    }
}
