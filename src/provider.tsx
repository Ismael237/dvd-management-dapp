import { Provider as ChakraUIProvider } from '@components/chakra/provider';
import { Home } from '@pages/home/home';
import { ConfirmDialogGlobal } from '@components/common/dialog/confirm-dialog-global';
import { Toaster } from '@components/chakra/toaster';

export const Provider = () => {
	return (
		<ChakraUIProvider>
			<Home />
			<ConfirmDialogGlobal />
			<Toaster />
		</ChakraUIProvider>
	)
}