const bcryptjs = require('bcryptjs');

export class Password {

    /**
     * It hashes the password using the bcryptjs library.
     * @param password - The password to be hashed.
     * @returns The hash.
     */

    static async hash(password) {
        let hash = await bcryptjs.hash(password, 8);
        return hash;
    }

    /**
     * It compares the password that the user has entered with the password that is stored in the database.
     * @param requestPassword - The password that the user has entered.
     * @param dbPassword - The password stored in the database.
     * @returns The `compare` function returns a `Promise` object.
     */

    static async compare(requestPassword, dbPassword) {
        return await bcryptjs.compare(requestPassword, dbPassword);
    }
}