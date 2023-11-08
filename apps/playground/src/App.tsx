import React from "react";
import {
  NMStateConfig,
  NMStateConfigDetail,
  NMStateYamlCodePanel,
} from "@nmstate-ui/lib";
import {
  Page,
  PageSection,
  PageSectionVariants,
  TextContent,
  TextVariants,
  Text,
  Tabs,
  Tab,
  TabTitleIcon,
  TabTitleText,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelContent,
  DrawerColorVariant,
  TabsProps,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import NetworkIcon from "@patternfly/react-icons/dist/esm/icons/network-icon";
import ClusterIcon from "@patternfly/react-icons/dist/esm/icons/cluster-icon";
import {
  nmstateConfigs as nmstateConfigsData,
  emptyNMStateConfig,
} from "./mocks/NMStateData";

function App() {
  const [nmstateConfigs, setNMStateConfigs] =
    React.useState(nmstateConfigsData);
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [drawerExpanded, setDrawerExpanded] = React.useState(true);

  const handleAddTab = () => {
    const updatedNMStateConfigs = [...nmstateConfigs, emptyNMStateConfig];
    setNMStateConfigs(updatedNMStateConfigs);
    setActiveTabKey(updatedNMStateConfigs.length - 1);
  };

  const removeTab: TabsProps["onClose"] = (_, eventKey) => {
    const updatedNMStateConfigs = nmstateConfigs.filter(
      (_, index) => index !== eventKey
    );
    setNMStateConfigs(updatedNMStateConfigs);
    setActiveTabKey(
      updatedNMStateConfigs.length === 0
        ? "globalSettings"
        : updatedNMStateConfigs.length - 1
    );
  };

  const handleNMStateConfigUpdate = (
    index: number,
    nmstateConfig: NMStateConfig
  ) => {
    const updated = [...nmstateConfigs];
    updated.splice(index, 1, nmstateConfig);
    setNMStateConfigs(updated);
  };

  return <NMStateYamlCodePanel />;
}

export default App;
