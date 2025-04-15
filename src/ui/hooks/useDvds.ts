import { useDvdStore } from "@core/domain/usecases/dvd.usecase";
import { ZeroAddress } from "ethers";

export const useDvds = () => {
    const {
        dvds,
        loading,
        error,
        buyDvd,
        fetchDvds,
        createDvd,
        updateDvd,
        deleteDvd,
    } = useDvdStore();
    
    const filteredDvds = (dvds ?? []).filter(
        (dvd) => dvd.currentOwner !== ZeroAddress
    );

    return {
        dvds: filteredDvds,
        loading,
        error,
        buyDvd,
        createDvd,
        deleteDvd,
        fetchDvds,
        updateDvd,
    };
};