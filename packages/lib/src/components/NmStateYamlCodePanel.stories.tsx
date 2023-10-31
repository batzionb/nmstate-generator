import type { Meta, StoryObj } from "@storybook/react";
import NMStateYamlCodePanel from "./NMStateYamlCodePanel";
import { nmstateConfig1 } from "../mocks/NMStateData";

const NMStateYamlCodePanelPage = () => {
  return (
    <div style={{ height: "100vw", width: "100vw" }}>
      <NMStateYamlCodePanel
        nmstateConfig={nmstateConfig1}
        updateNMStateConfig={(code) => console.log(code)}
      />
    </div>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof NMStateYamlCodePanelPage> = {
  title: "Example/Button",
  component: NMStateYamlCodePanelPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NMStateYamlCodePanelPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NMStateYamlCodePanelStory: Story = {
  args: {},
};
