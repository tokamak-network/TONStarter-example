import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";

// import { Page } from "./Page";
// import RootLayout from "../../../packages/template-simple2/src/App";
// import Page from "../../../packages/react-cra/ts/src/App";
import RootLayout from "../../../packages/template-simple2/src/App";

const meta = {
  title: "Example/Public Sale",
  component: RootLayout,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
};
// satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
// export const LoggedIn: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const loginButton = canvas.getByRole("button", { name: /Log in/i });
//     await expect(loginButton).toBeInTheDocument();
//     await userEvent.click(loginButton);
//     await expect(loginButton).not.toBeInTheDocument();

//     const logoutButton = canvas.getByRole("button", { name: /Log out/i });
//     await expect(logoutButton).toBeInTheDocument();
//   },
// };
