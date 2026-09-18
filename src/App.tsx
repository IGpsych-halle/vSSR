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

import {
  useAuth,
} from "./auth/useAuth";


function App() {
  const {
    loading,
  } = useAuth();

  const [
    inventoryOpen,
    setInventoryOpen,
  ] =
    useState(false);


  useEffect(() => {
    if (loading) {
      return;
    }

    const game =
      startGame(
        "game-container"
      );

    return () => {
      game.destroy(true);
    };
  }, [loading]);


  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.code !== "KeyG") {
        return;
      }

      setInventoryOpen(
        current => {
          const next =
            !current;

          uiState.inventoryOpen =
            next;

          return next;
        }
      );
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


  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }


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