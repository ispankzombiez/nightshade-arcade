import React, { useContext, useEffect, useRef } from "react";
import { Game, AUTO } from "phaser";
import NinePatchPlugin from "phaser3-rex-plugins/plugins/ninepatch-plugin.js";
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin.js";

import { Preloader } from "features/world/scenes/Preloader";
import { PortalContext } from "./lib/PortalProvider";
import { useActor } from "@xstate/react";
import { PortalExampleScene } from "./PortalExampleScene";
import { CasinoIslandScene } from "./CasinoIslandScene";
import { NPCModals } from "features/world/ui/NPCModals";
import { InteractableModals } from "features/world/ui/InteractableModals";
import { CONFIG } from "lib/config";

export const PortalExamplePhaser: React.FC = () => {
  const { portalService } = useContext(PortalContext);
  const [portalState] = useActor(portalService);

  const game = useRef<Game>(undefined);

  // Determine which scene to load based on PORTAL_APP config
  let scene = "portal_example";
  let scenes: any[] = [Preloader, PortalExampleScene];

  if (CONFIG.PORTAL_APP === "casino-island") {
    scene = "casino-island";
    scenes = [Preloader, CasinoIslandScene];
  }

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: AUTO,
      fps: {
        target: 30,
        smoothStep: true,
      },
      backgroundColor: "#000000",
      parent: "phaser-example",

      autoRound: true,
      pixelArt: true,
      plugins: {
        global: [
          {
            key: "rexNinePatchPlugin",
            plugin: NinePatchPlugin,
            start: true,
          },
          {
            key: "rexVirtualJoystick",
            plugin: VirtualJoystickPlugin,
            start: true,
          },
        ],
      },
      width: window.innerWidth,
      height: window.innerHeight,

      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { x: 0, y: 0 },
        },
      },
      scene: scenes,
      loader: {
        crossOrigin: "anonymous",
      },
    };

    game.current = new Game({
      ...config,
      parent: "game-content",
    });

    game.current.registry.set("initialScene", scene);
    game.current.registry.set("gameState", portalState.context.state);
    game.current.registry.set("id", portalState.context.id);
    game.current.registry.set("portalService", portalService);

    return () => {
      game.current?.destroy(true);
    };
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
    >
      <div 
        id="game-content" 
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* NPCModals and InteractableModals require GameProvider context, which is not available in portal mode */}
      {/* <NPCModals id={portalState.context.id as number} /> */}
      {/* <InteractableModals id={portalState.context.id as number} scene={scene as any} /> */}
    </div>
  );
};
