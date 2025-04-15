import { create } from "zustand";
import { DVD } from "../entities/DVD";
import { dvdService } from "@core/infrastructure/blockchain/dvd.service";
import { executeWithErrorHandling, KnownError } from "@utils/error";

interface DvdStore {
    dvds: DVD[];
    loading: boolean;
    error: KnownError | null;
    fetchDvds: () => Promise<DVD[]>;
    createDvd: (title: string, numCopy: number, price: number) => Promise<boolean>;
    updateDvd: (id: number, title: string, numCopy: number) => Promise<boolean>;
    deleteDvd: (id: number) => Promise<boolean>;
    buyDvd: (id: number, ethValue: string) => Promise<boolean>;
}

export const useDvdStore = create<DvdStore>()((set) => ({
    dvds: [],
    loading: false,
    error: null,
    fetchDvds: async () => {
        set({ loading: true, error: null });
        return executeWithErrorHandling<DVD[]>(
            () => dvdService.getAllDvd(),
            (state) => set({ ...state, dvds: state.data! })
        );
    },
    createDvd: async (title, numCopy, price) => {
        set({ loading: true, error: null });
        return executeWithErrorHandling<boolean>(
            () => dvdService.addDvd(title, numCopy, price),
            (state) => set({ ...state })
        );
    },
    deleteDvd: async (id) => {
        set({ loading: true, error: null });
        return executeWithErrorHandling<boolean>(
            () => dvdService.deleteDvd(id),
            (state) => set({ ...state })
        );
    },
    updateDvd: async (id, title, numCopy) => {
        set({ loading: true, error: null });
        return executeWithErrorHandling<boolean>(
            () => dvdService.updateDvd(id, title, numCopy),
            (state) => set({ ...state })
        );
    },
    buyDvd: async (id, ethValue) => {
        set({ loading: true, error: null });
        return executeWithErrorHandling<boolean>(
            () => dvdService.buyDvd(id, ethValue),
            (state) => set({ ...state })
        );
    }
}));
