import { forwardRef, useImperativeHandle, useRef } from "react";

import { WebView } from "react-native-webview";

import { mainJs } from "@/src/webview/dice/main";
import { styleCss } from "@/src/webview/dice/style";

const html = `
<!DOCTYPE html>
<html>
<head>

<style>
${styleCss}
</style>

</head>

<body>

<div id="table"></div>

<script>
${mainJs}
</script>

</body>
</html>
`;

export interface DiceWebViewRef {
  send: (message: string) => void;
}

interface Props {
  onMessage: (data: any) => void;
}

export const DiceWebView = forwardRef<DiceWebViewRef, Props>(
  ({ onMessage }, ref) => {
    const webviewRef = useRef<WebView>(null);

    useImperativeHandle(ref, () => ({
      send(message) {
        webviewRef.current?.postMessage(message);
      },
    }));

    return (
      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{
          html,
        }}
        onMessage={(event) => onMessage(JSON.parse(event.nativeEvent.data))}
      />
    );
  },
);
