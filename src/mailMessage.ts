import { IMail, IMailer } from '@rheas/contracts/mail';
import { IMessage } from '@rheas/contracts/notifications';

export class MailMessage implements IMessage {
    /**
     * The underlying email object of this message.
     *
     * @var IMail
     */
    protected _mail: IMail;

    /**
     * The application mail delivery service.
     *
     * @var IMailer
     */
    protected _mailer: IMailer;

    /**
     * The channel through which this mail message has to be sent.
     *
     * @var string
     */
    protected _channel: string = '';

    /**
     * Creates a new email message.
     *
     * @param mail
     * @param mailer
     */
    constructor(mail: IMail, mailer: IMailer) {
        this._mail = mail;
        this._mailer = mailer;
    }

    /**
     * Sets the transporter name through which this email message has to be sent.
     * This facilitates sending different emails through different transporters.
     *
     * If no channel is specified, mailer will send it through the application
     * default channel.
     *
     * @param channel
     */
    public via(channel: string): IMessage {
        this._channel = channel;

        return this;
    }

    /**
     * Returns the channel through which this message has to be send.
     *
     * @returns
     */
    public channel(): string {
        return this._channel;
    }

    /**
     * Sends the message through application mail dispatcher.
     *
     * @returns
     */
    public send(): void {
        return this._mailer.now(this);
    }
}
