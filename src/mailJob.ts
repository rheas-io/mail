import { Mail } from './mail';
import { IJsonMail } from '@rheas/contracts/mail';
import { IJobMetaData } from '@rheas/contracts/queue';
import { BaseJob as Job } from '@rheas/queue/baseJob';
import { mailMessage } from '@rheas/support/helpers/mail';

export class MailJob extends Job<IJsonMail> {
    /**
     * Returns the `fileName` and `export` property of this job. This data is
     * needed to recreate this Job at a later time.
     *
     * @returns
     */
    public metaData(): IJobMetaData {
        return {
            fileName: __filename,
            export: this.constructor.name,
        };
    }

    /**
     * Parses the email message data from the stored job data `this._data` and
     * sends the email message using application `mailer`.
     */
    public async process(): Promise<any> {
        const mail = new Mail().setData(this._data.mail);

        return await mailMessage(mail).via(this._data.channel).send();
    }
}
