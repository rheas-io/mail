import { Obj } from '@rheas/support';
import { Exception } from '@rheas/errors';
import { DriverManager } from '@rheas/services';
import Mail, { Options } from 'nodemailer/lib/mailer';
import { IMailConfig } from '@rheas/contracts/configs';
import { ILaterTime } from '@rheas/contracts/notifications';
import { IMail, IMailer, IMailMessage } from '@rheas/contracts/mail';

export class Mailer extends DriverManager<Mail> implements IMailer {
    /**
     * The applications default email settings.
     *
     * @var IMailConfig
     */
    protected _config: IMailConfig;

    /**
     * Creates a new mailer instance with the given config.
     *
     * @param config
     */
    constructor(config: IMailConfig) {
        super();

        this._config = config;
    }

    /**
     * Send the given email message immediately using the channel specified
     * in the message or using a default channel.
     *
     * Throws error when a set channel is not found, or when sending mail fails.
     *
     * @param message
     * @throws InvalidArgumentException
     * @throws Exception when no recipients are set on the mail.
     */
    public async now(message: IMailMessage): Promise<any> {
        const transporter: Mail = this.getTransporterFor(message);

        const data: Options = this.validatedMailData(message.mail());

        return await transporter.sendMail(data);
    }

    /**
     * Gets the transporter to be used for sending the message. Throws
     * an exception, if a transporter for the given channel is not registered.
     *
     * @param message
     * @throws InvalidArgumentException
     */
    protected getTransporterFor(message: IMailMessage): Mail {
        const transporter: Mail = this.getDriver(message.channel());

        return transporter;
    }

    /**
     * Validates the email mandatory fields and sets missing one with the
     * data from the configuration.
     *
     * @param data
     */
    protected validatedMailData(mail: IMail): Options {
        const data = mail.data();

        if (!mail.hasRecipients()) {
            throw new Exception('No recipients set for delivery. At least one should be set.');
        }

        if (!data.from) {
            data.from = Obj.get(this._config, 'from');

            // We will set reply-to only if there was no from address in the
            // data. If we are using the from address from the config, we will set
            // the replyTo in the config, that too if it is not already explicitely
            // set. If from address is set, email clients will replyTo that address
            // or the specific replyTo address set on the data.
            if (!data.replyTo) {
                data.replyTo = Obj.get(this._config, 'replyTo');
            }
        }

        return data;
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
