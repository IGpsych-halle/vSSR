import { useEffect } from "react";
import { startGame } from "./game/Game";

function App() {
  useEffect(() => {
    const game = startGame("game-container");

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
}

export default App;