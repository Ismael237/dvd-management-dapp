import { Eip1193Provider } from "ethers";

declare module '@fontsource/inter';

declare global {
    interface Window {
        ethereum: Eip1193Provider;
    }
}
