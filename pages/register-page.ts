import { type Locator, type Page, expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly alertMessage: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly phoneNumberField: Locator;
    readonly countryDropdown: Locator;
    readonly emailAddressField: Locator;
    readonly passwordField: Locator;
    readonly agreementCheckbox: Locator;
    readonly registerButton: Locator;

    readonly alertStrSuccessfulRegistration     = 'Successfully registered the following information';
    readonly alertStrPasswordIssue              = 'The password should contain between [6,20] characters!';
    readonly alertStrPhoneNumIssue              = 'The phone number should contain at least 10 characters!'; 
    //These are some additional error messages which aren't there, but I'd expect to populate errorMessage alert field
    readonly alertStrFirstNameIssue             = 'First name is mandatory!';
    readonly alertStrLastNameIssue              = 'Last name is mandatory!';
    readonly alertStrEmailBlankIssue            = 'Please provide an email address!';
    readonly alertStrEmailFormatIssue           = 'Email provided is not valid!';
    readonly alertStrEmailDuplicate             = 'Another client has registerd with that email!';
    readonly alertStrPhoneNumDuplicate          = 'Another client has registerd with that phone number!';
       
    constructor(page: Page) {
        this.page = page;
        this.alertMessage       = this.page.getByRole('alert');
        this.firstNameField     = this.page.getByRole('textbox', { name: 'First Name' });
        this.lastNameField      = this.page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }); //This obviously could do with a correction in the code
        this.phoneNumberField   = this.page.getByRole('textbox', { name: 'Enter phone number' });
        this.countryDropdown    = this.page.locator('#countries_dropdown_menu');
        this.emailAddressField  = this.page.getByRole('textbox', { name: 'Enter email' });
        this.passwordField      = this.page.getByRole('textbox', { name: 'Password' });
        this.agreementCheckbox  = this.page.getByRole('checkbox', {name: 'I agree with the terms and'});
        this.registerButton     = this.page.getByRole('button', { name: 'Register' });
    }

    async setFirstName(inputString) {
        await this.firstNameField.click();
        await this.firstNameField.fill('');
        await this.firstNameField.fill(inputString);
    }

    async setLastName(inputString) {
        await this.lastNameField.click();
        await this.lastNameField.fill('');
        await this.lastNameField.fill(inputString);
    }

    async setPhoneNum(inputString) {
        await this.phoneNumberField.click();
        await this.phoneNumberField.fill('');
        await this.phoneNumberField.fill(inputString);
    }

    async setCountry(countryString) {
        await this.countryDropdown.selectOption(countryString);
    }

    async setEmail(inputString) {
        await this.emailAddressField.click();
        await this.emailAddressField.fill('');
        await this.emailAddressField.fill(inputString);
    }

    async setPassword(inputString) {
        await this.passwordField.click();
        await this.passwordField.fill('');
        await this.passwordField.fill(inputString);
    }

    async checkAgreementCheckbox() {
        await this.agreementCheckbox.check();
    }
    
    async setPageAttributes ( firstNameString, lastNameString, phoneNumString, countryString, emailString, passwordString ) {
        await this.setFirstName(firstNameString);
        await this.setLastName(lastNameString);
        await this.setPhoneNum(phoneNumString);
        await this.setEmail(emailString);
        await this.setPassword (passwordString);

        if(countryString.length != 0 ) {
            await this.setCountry (countryString);
        }
    }

    async selectRegisterButton () {
        await this.registerButton.click();
    }

    async checkForUserCreation() {
        await this.alertMessage;
    }



}

export default RegisterPage;