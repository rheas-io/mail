import Mail from 'nodemailer/lib/mailer';
import { DriverManager } from '@rheas/services';
import { ILaterTime } from '@rheas/contracts/notifications';
import { IMailer, IMailMessage } from '@rheas/contracts/mail';

export class Mailer extends DriverManager<Mail> implements IMailer {
    /**
     * Send the given email message immediately using the channel
     * specified in the message or using a default channel.
     *
     * @param message
     */
    public now(message: IMailMessage): void {
        
    }

    /**
     * Send the given message at a later time.
     *
     * @param message
     * @param later
     */
    public later(message: IMailMessage, later: ILaterTime): void {
        throw new Error('Method not implemented.');
    }
}
