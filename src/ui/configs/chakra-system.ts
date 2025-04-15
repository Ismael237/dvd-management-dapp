import { createSystem, defaultConfig, defineConfig, defineSemanticTokens, defineTokens } from "@chakra-ui/react"
import "@fontsource/inter"

const tokens = defineTokens({
    fonts: {
        heading: { value: `'Inter', serif` },
        body: { value: `'Inter', sans-serif` },
    },
    colors: {
        brand: {
            DEFAULT: { value: "#2522FC" },
            50: { value: "#EBEBFF" },
            100: { value: "#D2D5FE" },
            200: { value: "#A4AAFE" },
            300: { value: "#7C85FD" },
            400: { value: "#4F5AFD" },
            500: { value: "#2522FC" },
            600: { value: "#0312E2" },
            700: { value: "#020EAB" },
            800: { value: "#02096F" },
            900: { value: "#010437" },
            950: { value: "#00021E" },
        }
    },
});

const semanticTokens = defineSemanticTokens({
    colors: {
        brand: {
            solid: { value: "{colors.brand.500}" },
            contrast: { value: "{colors.brand.100}" },
            fg: { value: "{colors.brand.700}" },
            muted: { value: "{colors.brand.100}" },
            subtle: { value: "{colors.brand.200}" },
            emphasized: { value: "{colors.brand.300}" },
            focusRing: { value: "{colors.brand.500}" },
        },
    },
});

const config = defineConfig({
    theme: {
        tokens,
        semanticTokens,
    },
})

export const system = createSystem(defaultConfig, config)