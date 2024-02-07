import { App } from "../src/App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getCategories } from "../firebase/methods/getCategories";
import {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
} from "../firebase/firebase";
import { act } from "react-dom/test-utils";

require("isomorphic-fetch");

beforeEach(() => {
  render(<App></App>);
});

jest.mock("use-resize-observer", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

describe("App component test", () => {
  test("App is a function", () => {
    expect(App).toBeInstanceOf(Function);
  });

  test("document contains login html", async () => {
    await waitFor(() => {
      console.log("LOGIN PAGE ", document.documentElement.innerHTML);
      const loginContainer = document.querySelector(".login__container");
      expect(loginContainer).toBeTruthy();
    });
  });

  test("register test", async () => {
    let error;

    const registerLink = document.querySelector(
      ".register-link",
    ) as HTMLAnchorElement;

    expect(registerLink).toBeTruthy();

    await userEvent.click(registerLink);

    await waitFor(
      async () => {
        const registerContainer = document.querySelector(
          ".register__container",
        );
        expect(registerContainer).toBeTruthy();

        await userEvent.type(screen.getByPlaceholderText("Name"), "petya");

        await userEvent.type(
          screen.getByPlaceholderText("E-mail Address"),
          "petya@yahoo.com",
        );

        await userEvent.type(
          screen.getByPlaceholderText("Password"),
          "1234qwert",
        );

        await userEvent.click(screen.getByRole("button"));

        await waitFor(
          async () => {
            const dashboard = document.querySelector(".dashboard");
            expect(dashboard).toBeTruthy();
            const res = await getDocs(query(collection(db, "users")));
          },
          { timeout: 80000 },
        );
      },
      { timeout: 90000 },
    );
  }, 1000000);
});

describe("add new category test", () => {
  test("", async () => {
    await userEvent.click(
      document.querySelector(".categories-link") as Element,
    );

    console.log("TUTUT", document.documentElement.innerHTML);
    await waitFor(async () => {
      const categoriesContainer = document.querySelector(
        ".categories__container",
      );
      expect(categoriesContainer).toBeTruthy();
    });

    await userEvent.click(
      document.querySelector("[name='add-category-btn']") as Element,
    );

    await waitFor(async () => {
      await userEvent.type(
        document.querySelector("[name='category-name']") as Element,
        "Машина",
      );
    });

    await userEvent.click(screen.getByText("Add"));

    await waitFor(
      async () => {
        const res = await getDocs(query(collection(db, "users")));
        const userRef = res.docs[0];

        let categories = await getCategories(userRef.data()["uuid"]);

        await waitFor(async () => {
          expect(categories).toBeTruthy();
        });
      },
      { timeout: 20000 },
    );

    await userEvent.click(screen.getByText("Dashboard"));

    await waitFor(
      () => {
        expect(document.querySelector(".dashboard")).toBeTruthy();
      },
      { timeout: 20000 },
    );

    await act(() => {
      userEvent.click(screen.getByText("Add Cost"));
    });

    await waitFor(
      () => {
        expect(document.querySelector(".modal")).toBeTruthy();
      },
      { timeout: 20000 },
    );

    act(() => {
      userEvent.click(document.querySelector("[name='category']") as Element);
    });

    act(() => {
      userEvent.type(screen.getByPlaceholderText("Please input cost"), "5000");
    });
    act(() => {
      userEvent.click(screen.getByText("Add"));
    });
  }, 80000);
});
