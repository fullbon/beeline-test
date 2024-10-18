export type AgreementType = {
    id?: number,
    region: string,
    branch: string,
    status: string,
    started_at: string,
    finished_at: string,
    comment?: string,
}

export type ProcessType = {
    id?: number,
    agreement_id: string,
    name: string,
    price: string
}
