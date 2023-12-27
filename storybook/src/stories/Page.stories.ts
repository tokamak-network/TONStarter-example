import type { Meta, StoryObj } from "@storybook/react";
// import { within, userEvent, expect } from "@storybook/test";
import App from "../../../packages/tokamak-design/src/App";

const meta = {
  title: "TONStarter/Public Sale",
  component: App,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TokamakDesign: Story = {
  args: {
    l2Token: "0x7A4710394a7f96028a517A9846b5aC3ECE6ebC62",
    title: "Dragons of Midgard",
    description:
      "Playable NFT Collectible PVP game set in the medieval era in the kingdom of midgard. Dragons of midgard is crypto collectible P2E game which will allow users to play and earn in unique pvp battles with 30 species and 8 dragon territories to make the perfect gaming experience for the players. While dragon holders will be able to earn by playing dragons of midgard game.",
  },
};
export const Simple: Story = {};
export const EalryTonstarter: Story = {};

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
