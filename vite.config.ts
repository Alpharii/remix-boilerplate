import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from "remix-flat-routes";

installGlobals();

export default defineConfig(() => {

	return {
		css: {
			postcss: {
				plugins: [autoprefixer(), tailwindcss()],
			},
		},
		plugins: [
			remix({
				routes: (defineRoutes) => flatRoutes("routes", defineRoutes),
			}),
			tsconfigPaths(),
		],
	};
});