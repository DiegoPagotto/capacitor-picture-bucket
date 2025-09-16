export interface Photo {
    id?: string;
    webPath: string;
    filename?: string;
}

export interface PhotoData {
    filename: string;
    url: string;
    createdAt: number;
}
