import { ConnectButton } from "@mysten/dapp-kit";
// import {useCurrentAccount} from "@mysten/dapp-kit";
// import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Flex, Heading } from "@radix-ui/themes";
// import { useState } from "react";
// import { Counter } from "./Counter";
// import { CreateCounter } from "./CreateCounter";

function App() {
  // const currentAccount = useCurrentAccount();
  // const [counterId, setCounter] = useState(() => {
  //   const hash = window.location.hash.slice(1);
  //   return isValidSuiObjectId(hash) ? hash : null;
  // });

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>dApp Starter Template</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
    </>
  );
}

export default App;
