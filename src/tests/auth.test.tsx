import { App } from "../App";
import { render, fireEvent, screen, waitFor , act} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

require('isomorphic-fetch')


describe("App component", () => {
    test("App is a function", () => {
        expect(App).toBeInstanceOf(Function);
    })

    test("document contains login html", () => {
        const container = render(<App></App>)
        screen.getByPlaceholderText("E-mail Address")
        
    })

    test("register test", async () => {
        let error;
        const container = render(<App></App>)

        const register= document.querySelector('.register-link') as HTMLAnchorElement;

        act(() => {
            register?.click()
        })

        expect(register).toBeTruthy()

      
        await userEvent.type(screen.getByPlaceholderText("Name"), 'vasya')
        await userEvent.type(screen.getByPlaceholderText("E-mail Address"), "vasya@yahoo.com")
        await userEvent.type(screen.getByPlaceholderText("Password"), "1234qwert")
        
        try {
            await userEvent.click(screen.getByRole("button"))

            await waitFor(() => {
                console.log("AFTER REGISTER ", document.documentElement.innerHTML)
            }, {timeout: 5000})
        }

        catch (err) {
            error = err;
            expect(error).toBeTruthy();
            await waitFor(() => {
                console.log("AFTER REGISTER ", document.documentElement.innerHTML)
            })
        }
        
    })
})

// describe("", () => {
//     test("login with email and password test", async () => {
//         render(<App></App>)
    
//         await userEvent.type(screen.getByPlaceholderText('E-mail Address'), "igor@m.ru")
//         await userEvent.type(screen.getByPlaceholderText('Password'), "12341234")

//         const btn = document.querySelector(".login__btn") as HTMLButtonElement;

//         if (btn) {
//             await userEvent.click(screen.getByRole('button'));
//         }
//         else {
//             throw new Error()
//         }

//     })
// })