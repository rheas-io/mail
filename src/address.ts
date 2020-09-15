import { Address as NodeMailerAddress } from 'nodemailer/lib/mailer';

export class Address implements NodeMailerAddress {
    /**
     * Creates a new email address with the given fields.
     *
     * @param name
     * @param address
     */
    constructor(public name: string, public address: string) {}
}
