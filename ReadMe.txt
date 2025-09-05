Registration page Playwright automation
=======================================

This automation utilises Playwright with Typescript

It tests the following page -> https://qa-practice.netlify.app/bugs-form

For these tests, I've implemented a page object model, focusing on mainly functional behaviour

I have created a UserID data object for all the records needed for a user. This allows me to use dynamic data.

Page elements tested
* Drop down is selectable
* Password field is obscured
* Agree to terms and conditions

Registration behaviour
* User registered when all data provided (happy day)
* User created if all mandatory data only is provided
* Error message if mandatory data missing

I've also selected the following business cases from my identity usage
* Error message if phone number has already been used
* Error message if email address has already been used

Issues detected in the automation suite,
* The agreedment to terms and conditions box is not selectable
* The error message says a 20 character password will be accepted. It is not.
* The email field is not being treated as mandatory, with a registration completed if missing
* The last name field is not being treated as mandatory, with a registration completed if missing
* The email field is not being checked for correct format
* A previously used email will be accepted
* A previously used phone number will be accepted


Other issues, beyond that automated fails,
* Expect the password field to be obscured. It's clearly visible, but the test is passing. Needs a review
* The last name tag for the element needs tidying up - currently 'Last Name* Phone nunber*'
* Phone nunber typo



Possible other tests
* Checking for support for ' and - in names
* Checking for leading whitespace, and how dealt with

However, I feel these tests are the core to cover, and given the issues with mandatory fields, would make sense to wait for resolution of those first.