import {
  useEffect,
  useState,
} from "react";

import {
  startGame,
} from "./game/Game";

import {
  Inventory,
} from "./ui/inventory/Inventory";

import {
  uiState,
} from "./game/state/uiState";


function App() {
  const [inventoryOpen, setInventoryOpen] =
    useState(false);

  useEffect(() => {
    const game =
      startGame("game-container");

    return () =>
      game.destroy(true);
  }, []);


  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.code !== "KeyG") {
        return;
      }

      setInventoryOpen(current => {
        const next = !current;

        uiState.inventoryOpen = next;

        return next;
      });
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);


  return (
    <>
      <div id="game-container" />

      <Inventory
        isOpen={inventoryOpen}
      />
    </>
  );
}


export default App;