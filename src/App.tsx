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

/* import {
  useAuth,
} from "./auth/useAuth";
*/
import {
  apiFetch,
} from "./api/apiClient";


function App() {

  const [inventoryOpen, setInventoryOpen] =
    useState(false);

  useEffect(() => {
  async function testInventory() {
    try {
      const response =
        await apiFetch(
          "/api/inventory"
        );

      const data =
        await response.json();

      console.log(
        "Inventory response:",
        data
      );
    } catch (error) {
      console.error(
        "Inventory request failed:",
        error
      );
    }
  }


  testInventory();
}, []);


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