export type StatutDvd = "available" | "sold";

export interface DVD {
    d_id: number;
    d_title: string;
    numCopy: number;
    statut: StatutDvd;
    currentOwner: string;
    price: string;
}
