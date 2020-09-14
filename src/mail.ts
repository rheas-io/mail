import { AnyObject } from '@rheas/contracts';
import { IMail } from '@rheas/contracts/mail';
import { view as newView } from '@rheas/support/helpers';

export class Mail {
    /**
     * Email from address.
     *
     * @var string
     */
    protected _from: string | undefined;

    /**
     * Email to address.
     *
     * @var string
     */
    protected _to: string | undefined;

    /**
     * Email reply-to address.
     *
     * @var string
     */
    protected _replyTo: string | undefined;

    /**
     * Email html message.
     *
     * @var string
     */
    protected _html: string = '';

    /**
     * Email plain text message.
     *
     * @var string
     */
    protected _raw: string = '';

    /**
     * Sets the email from address.
     *
     * @param email
     */
    public from(email: string): IMail {
        this._from = email;

        return this;
    }

    /**
     * Sets the email to address.
     *
     * @param email
     */
    public to(email: string): IMail {
        this._to = email;

        return this;
    }

    /**
     * Sets the email replyTo address.
     *
     * @param email
     */
    public replyTo(email: string): IMail {
        this._replyTo = email;

        return this;
    }

    /**
     * Sets the email HTML contents.
     *
     * @param html
     */
    public html(html: string): IMail {
        this._html = html;

        return this;
    }

    /**
     * Sets the email raw/plain text contents.
     *
     * @param raw
     */
    public raw(raw: string): IMail {
        this._raw = raw;

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
     * Returns the html content of this email.
     *
     * @returns
     */
    public render(): string {
        if (this._html) {
            return this._html;
        }
        return this._raw || '';
    }
}
