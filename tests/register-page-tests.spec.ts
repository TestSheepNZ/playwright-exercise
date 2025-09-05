import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register-page.ts';
import { UserID } from '../util/userID.ts';

const URL = 'https://testsheepnz.github.io/panther.html';
let userID: UserID;
let registerPage: RegisterPage;

test.beforeEach(async ({page}) => {
    userID = new UserID();
    registerPage = new RegisterPage(page);
    await page.goto('/bugs-form');
});

/*
Tests for visual element and happy day
======================================
*/
test('No alert message is visible on page load', async ({ page }) => {
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password                   
    )
    await expect(registerPage.alertMessage).not.toBeVisible();
});

test('HAPPY DAY - user details accepted, account created, alert message displayed', async ({ page }) => {
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);
});


/* 
UI elements tests
=================
*/
test('Agreement checkbox can be selected', async ({ page }) => {
    await registerPage.checkAgreementCheckbox();
    await expect(registerPage.agreementCheckbox).toBeChecked();
});

/*
INVESTIGATE - I can clearly see the text is NOT obscured when testing manually, 
and yet, the element isn't returning the text which can be clearly seen
*/ 
test('Password field should obscure text entry', async ({ page }) => {
    let passwordText = "P@assord12";
    await registerPage.setPassword(passwordText);
    await expect(registerPage.passwordField).not.toContainText(passwordText);
});

/* Assumption that 95% of customers are in Australia or NZ */
test('User can select Australia as country', async ({ page }) => {
    let country = "Australia";
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        country,
        userID.emailAddress,
        userID.password                   
    )
    await expect(registerPage.countryDropdown).toHaveValue(country);
});

test('User can select NZ as country', async ({ page }) => {
    let country = "New Zealand";
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        country,
        userID.emailAddress,
        userID.password                   
    )
    await expect(registerPage.countryDropdown).toHaveValue(country);
});



/* 
Tests for mandatory fields
==========================
*/


test('First name is not mandatory for registration', async ({ page }) => {
    await registerPage.setPageAttributes(   
        '',
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);
});

test('Country is not mandatory for registration', async ({ page }) => {
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        '',
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);
});

/*
PASSWORD RULES
*/

test('Missing password will generate error message', async ({ page }) => {
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        ''
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrPasswordIssue);
});

test('Too short a password will generate error message', async ({ page }) => {
    userID.password = userID.generateRandomString(5);
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrPasswordIssue);
});

test('Too long a password will generate error message', async ({ page }) => {
    userID.password = userID.generateRandomString(21);
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrPasswordIssue);
});

test('Minimum password length will be accepted', async ({ page }) => {
    userID.password = userID.generateRandomString(6);
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        '',
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);
});

test('Maximum password length will be accepted', async ({ page }) => {
    userID.password = userID.generateRandomString(20);
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        '',
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);
});

/*
PHONE NUMBER RULES
*/

test('Too short a phone number will generate error message', async ({ page }) => {
    userID.phoneNumber = userID.generateRandomPhoneNumber(9);
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrPhoneNumIssue);
});

test('Minimum phone number length will be accepted', async ({ page }) => {
    userID.phoneNumber = userID.generateRandomPhoneNumber(10);
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        '',
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);
});

test('Sixteen digit phone number length will be accepted', async ({ page }) => {
    userID.phoneNumber = userID.generateRandomPhoneNumber(16);
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        '',
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);
});

/*
EMAIL
*/

test('Missing email will cause an error message', async ({ page }) => {
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        '',
        userID.password
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrEmailBlankIssue);
});

test('Invalid email format will cause an error message', async ({ page }) => {
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        'edd@',
        userID.password
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrEmailFormatIssue);
});


/*
LAST NAME
*/

test('Missing last name will cause an error message', async ({ page }) => {
    await registerPage.setPageAttributes(   
        userID.firstName,
        '',
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrLastNameIssue);
});


/*
BUSINESS RULES
==============

We should not create a new account for anyone using a pre-registered phone number or email address
*/

test('Reject already used email address', async ({ page }) => {
    // Create first user
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);

    //Create new user with same email address
    let newUser: UserID;
    newUser = new UserID();
    newUser.emailAddress = userID.emailAddress;
    await registerPage.setPageAttributes(   
        newUser.firstName,
        newUser.lastName,
        newUser.phoneNumber,
        newUser.country,
        newUser.emailAddress,
        newUser.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrEmailDuplicate);
});

test('Reject already used phone number', async ({ page }) => {
    // Create first user
    await registerPage.setPageAttributes(   
        userID.firstName,
        userID.lastName,
        userID.phoneNumber,
        userID.country,
        userID.emailAddress,
        userID.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrSuccessfulRegistration);

    //Create new user with same email address
    let newUser: UserID;
    newUser = new UserID();
    newUser.phoneNumber = userID.phoneNumber;
    await registerPage.setPageAttributes(   
        newUser.firstName,
        newUser.lastName,
        newUser.phoneNumber,
        newUser.country,
        newUser.emailAddress,
        newUser.password                   
    )
    await registerPage.selectRegisterButton();
    await expect(registerPage.alertMessage).toBeVisible();
    await expect(registerPage.alertMessage).toHaveText(registerPage.alertStrPhoneNumDuplicate);
});
