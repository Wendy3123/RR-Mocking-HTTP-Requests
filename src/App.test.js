import { waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  // sets everything back to initial state after each test
  fetch.resetMocks();
});

//describe is a jest method that contains one or more related tests
describe("receives value from github REST API using jest fetch mock", () => {
  test("mock the GET request using the Jest Fetch Mock npm package", async () => {
    fetch.mockResponseOnce(JSON.stringify({ name: "coder" }));
    render(<App />);
    const githubName = await waitFor(() => screen.getByRole("heading"));
    expect(githubName).toHaveTextContent("coder");
  });

  test("receive github URL", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ html_url: "https://github.com/learningToCode1234" })
    );
    render(<App />);
    const githubUser = await waitFor(() => screen.getByRole("link"));
    expect(githubUser).toHaveAttribute(
      "href",
      expect.stringContaining("github.com")
    );
  });
});
