import { Dialog, Flex, For } from "@chakra-ui/react";
import { WalletItem } from "../wallet-item";
import { useWallet } from "@hooks/useWallet";
import { toaster } from "@components/chakra/toaster";
import { walletService } from "@core/infrastructure/blockchain/wallet.service";
import { truncateText } from "@utils/string";
import { MetamaskIcon, MetamaskIconProps } from "@components/common/icon/metamask-icon";

export type DetectedWallet = {
    name: string;
    isInstalled: boolean;
    identifier: string;
    icon: React.ComponentType<MetamaskIconProps>;
    url?: string;
};

export function WalletList() {
    const ethereumWallet: DetectedWallet = {
        name: 'MetaMask',
        isInstalled: false,
        identifier: 'metamask',
        icon: MetamaskIcon,
        url: 'https://metamask.io/',
    };

    if (walletService.checkWallet('metamask')) {
        ethereumWallet.isInstalled = true;
    }

    const wallets: DetectedWallet[] = [ethereumWallet];

    const { connect } = useWallet();

    const onSelectWallet = async (wallet: DetectedWallet) => {
        const toastInfo: {
            title: string;
            type: 'success' | 'error';
            duration: number;
            closable: boolean;
            description?: string;
        } = {
            title: "Connected",
            type: 'success',
            duration: 3000,
            closable: true,
        };

        try {
            const data = await connect(wallet.identifier);
            if ('account' in data) {
                toastInfo.description = `Connected with ${truncateText(data.account!)}`;
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            toastInfo.title = "Error during wallet connection";
            toastInfo.type = "error";
            toastInfo.description = "An unknown error occurred";
        }
        toaster.create(toastInfo);
    }


    return (
        <Flex
            flexDirection="column"
            gap={4}
        >
            <For each={wallets}>
                {(wallet, i) => (
                    <Dialog.ActionTrigger key={i}>
                        <WalletItem
                            wallet={wallet}
                            onSelect={onSelectWallet}
                        />
                    </Dialog.ActionTrigger>
                )}
            </For>
        </Flex>
    )
}
