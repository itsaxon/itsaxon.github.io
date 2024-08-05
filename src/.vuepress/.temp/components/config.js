import { defineClientConfig } from "vuepress/client";
import { hasGlobalComponent } from "/workspaces/itsaxon.github.io/src/src/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.39_vuepress@2.0.0-rc.14_@vuepress+bundler-vite@2.0.0-rc.14_@types+n_qs533cafytahlkk2mbqflekzyi/node_modules/@vuepress/helper/lib/client/index.js";

import { useScriptTag } from "/workspaces/itsaxon.github.io/src/src/node_modules/.pnpm/@vueuse+core@10.11.0_vue@3.4.35/node_modules/@vueuse/core/index.mjs";
import FontIcon from "/workspaces/itsaxon.github.io/src/src/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.52_vuepress@2.0.0-rc.14_@vuepress+bundler-vite@2.0.0-rc.1_nwyov2mazw2odqeos6ndv2cn4y/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import Badge from "/workspaces/itsaxon.github.io/src/src/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.52_vuepress@2.0.0-rc.14_@vuepress+bundler-vite@2.0.0-rc.1_nwyov2mazw2odqeos6ndv2cn4y/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/workspaces/itsaxon.github.io/src/src/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.52_vuepress@2.0.0-rc.14_@vuepress+bundler-vite@2.0.0-rc.1_nwyov2mazw2odqeos6ndv2cn4y/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";

import "/workspaces/itsaxon.github.io/src/src/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.52_vuepress@2.0.0-rc.14_@vuepress+bundler-vite@2.0.0-rc.1_nwyov2mazw2odqeos6ndv2cn4y/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/brands.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/solid.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/fontawesome.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

  },
  rootComponents: [

  ],
});
