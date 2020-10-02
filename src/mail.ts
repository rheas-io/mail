import { Address } from './address';
import { Arr } from '@rheas/support/arr';
import { Options } from 'nodemailer/lib/mailer';
import { view as newView } from '@rheas/support/helpers';
import { IMail, Addresses } from '@rheas/contracts/mail';
import { AnyObject, JsonObject } from '@rheas/contracts';

export class Mail implements IMail {
    /**
     * Stores all the properties needed to send an email.
     *
     * @var Options
     */
    protected _data: Options & JsonObject = {};

    /**
     * Sets the email from address.
     *
     * @param email
     */
    public from(email: string | Address): IMail {
        this._data.from = email;

        return this;
    }

    /**
     * Sets the email replyTo address.
     *
     * @param email
     */
    public replyTo(email: string | Address): IMail {
        this._data.replyTo = email;

        return this;
    }

    /**
     * Sets the email to address.
     *
     * @param email
     */
    public to(email: Addresses): IMail {
        this._data.to = Arr.append(email, this._data.to);

        return this;
    }

    /**
     * Sets the email cc addresses.
     *
     * @param email
     */
    public cc(email: Addresses): IMail {
        this._data.cc = Arr.append(email, this._data.cc);

        return this;
    }

    /**
     * Sets the email to address.
     *
     * @param email
     */
    public bcc(email: Addresses): IMail {
        this._data.bcc = Arr.append(email, this._data.bcc);

        return this;
    }

    /**
     * Sets the email subject.
     *
     * @param subject
     */
    public subject(subject: string): IMail {
        this._data.subject = subject;

        return this;
    }

    /**
     * Sets the email HTML contents.
     *
     * @param html
     */
    public html(html: string): IMail {
        this._data.html = html;

        return this;
    }

    /**
     * Sets the email text contents.
     *
     * @param text
     */
    public text(text: string): IMail {
        this._data.text = text;

        return this;
    }

    /**
     * Sets the email raw contents.
     *
     * @param raw
     */
    public raw(raw: string): IMail {
        this._data.raw = raw;

        return this;
    }

    /**
     * Sets new nodemailer data. This function will override any existing data
     * that is set for a duplicate key in the `fields`.
     *
     * @param fields
     */
    public setData(fields: Options & JsonObject): IMail {
        this._data = Object.assign(this._data, fields);

        return this;
    }

    /**
     * Gets the html from the view and sets it as the view html.
     *
     * If a srcDir is provided, view path will be resolved from that dir. Otherwise,
     * it will be resolved from the applications default `views` directory.
     *
     * @param path
     * @param data
     * @param srcDir
     */
    public view(path: string, data: AnyObject = {}, srcDir?: string): IMail {
        const sourceView = newView(srcDir);

        this.html(sourceView.render(path, data));

        return this;
    }

    /**
     * Returns true if the mail has at least one recipient.
     *
     * @returns
     */
    public hasRecipients(): boolean {
        return (
            !Arr.isEmpty(Arr.wrap(this._data.to)) ||
            !Arr.isEmpty(Arr.wrap(this._data.cc)) ||
            !Arr.isEmpty(Arr.wrap(this._data.bcc))
        );
    }

    /**
     * Returns the html content of this email.
     *
     * @returns
     */
    public render(): string {
        return this._data.html?.toString() || this._data.text?.toString() || '';
    }

    /**
     * Returns the email details including the envelope.
     *
     * @returns
     */
    public data(): Options & JsonObject {
        return this._data;
    }
}
