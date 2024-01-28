import {registerWithEmailAndPassword } from "../../firebase/firebase"
import { waitFor } from '@testing-library/react'

import { loginWithEmailAndPassword } from "../../firebase/firebase";
require('isomorphic-fetch')


describe("test Login with Email and password", () => {

    test("login with bad wrong creds", async () => {
        let error = '';
        try {
            const user = await loginWithEmailAndPassword("igor@m.ru", "qwerty123")
        }
        catch(err) {
            if (err instanceof Error) {
                error = err.message
            }
        }
        await waitFor(() => {
            expect(error).toBeTruthy()
        })
    })

    test("login with correct creds", async () => {
        let error = '';
        let user: any;
        try {
            user = await loginWithEmailAndPassword("igor@m.ru", "12341234")
        }
        catch(err) {
            if (err instanceof Error) {
                error = err.message
            }
        }
        await waitFor(() => {
            expect(user.user).toBeTruthy();
        })
    })
})

describe("register with Email and password test", () => {
    test("bad", async () => {
        let error = '';
        let user: any;
        try {
            user = await registerWithEmailAndPassword('vasya', 'vasya', '228');
        }
        catch (err) {
            if (err instanceof Error) {
                error = err.message
            }
        }

        await waitFor(() => {
            expect(user).toBeFalsy();
            expect(error).toBeTruthy()
        })
    }, 70000)
})
