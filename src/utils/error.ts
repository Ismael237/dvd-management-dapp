import { ErrorDecoder } from "ethers-decode-error";

export type KnownError = {
    message: string;
    code?: string | number;
    details?: unknown;
};

export type State<T> = {
    loading: boolean;
    error: KnownError | null;
    data: T | null;
};

export const isErrorWithMessage = (error: unknown): error is KnownError => {
    return typeof error === "object" && error !== null && "message" in error;
};

export const isNativeError = (error: unknown): error is Error => {
    return error instanceof Error;
};

export async function handleEthereumError(error: unknown): Promise<KnownError> {
    try {
        const errorDecoder = ErrorDecoder.create();
        const { reason, signature, args } = await errorDecoder.decode(error);
        
        return {
            message: reason || 'Unspecified smart contract error',
            code: signature,
            details: args
        };
    } catch (decodeError) {
        console.warn("Failed to decode Ethereum error:", decodeError);
        
        if (typeof error === 'string') {
            return { message: error };
        }
        
        throw new Error('Unable to decode Ethereum error');
    }
}

export async function formatError(error: unknown): Promise<KnownError> {
    try {
        return await handleEthereumError(error);
    } catch (error) {
        if (isErrorWithMessage(error)) {
            return error;
        }
        
        if (isNativeError(error)) {
            return {
                message: error.message,
                details: error.stack
            };
        }
        
        return {
            message: 'An unexpected error occurred',
            details: error
        };
    }
}


export async function executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    setState: (state: State<T>) => void,
    initialState?: Partial<State<T>>
): Promise<T> {
    setState({
        loading: true,
        error: null,
        data: initialState?.data ?? null
    });
    
    try {
        const result = await operation();
        setState({ loading: false, error: null, data: result });
        return result;
    } catch (err: unknown) {
        console.error("Operation failed:", err);
        
        const error = await formatError(err);
        setState({ data: null, error, loading: false });
        throw error;
    }
}