import React from "react";
import Tabs from "sanity-plugin-tabs";
import { Stack, Text } from "@sanity/ui";

export const TabsContainer = React.forwardRef<any, any>((props, ref) => {
  return (
    <Stack space={2}>
      <Stack space={3}>
        <Text weight="semibold" size={1}>{props.type.title}</Text>
        {props.type.description && (
          <Text size={1} muted>
            {props.type.description}
          </Text>
        )}
        <Tabs {...props} ref={ref} />
      </Stack>
    </Stack>
  );
});
