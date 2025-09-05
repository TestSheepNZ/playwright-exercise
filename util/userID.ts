

export class UserID {
    /*  I'm using public over private variables, 
        to make the code simpler within the tests 
        this is something I'd revisit given longer*/
    public firstName: string;
    public lastName: string;
    public phoneNumber: string;
    public country: string;
    public emailAddress: string;
    public password: string;

    constructor() {
        this.firstName = this.generateRandomString(8);
        this.lastName  = this.generateRandomString(8);
        this.emailAddress = this.generateRandomString(10) + "@gmail.com";
        this.password = this.generateRandomString(8);
        this.phoneNumber = this.generateRandomPhoneNumber(10);
        this.country = "New Zealand";
    }

    generateRandomString(length: number): string {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let result = "";

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }

    generateRandomPhoneNumber(length: number): string {
        const characters = "0123456789";
        let result = "";

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }

    setCountry(newCountry) {
        this.country = newCountry;
    }

}

export default UserID;