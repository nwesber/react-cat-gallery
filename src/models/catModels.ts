// Defines the shape of a cat object.
export interface Cat {
    id: string;
    breeds?: [
        {
            id: string,
            name: string,
            origin: string,
            temperament: string,
            description: string
        }
    ];
    url: string;
    width?: number;
    height?: number;
}

// Similar to Cat but for API responses where all fields are expected.
export interface CatApiResponse {
    id: string;
    breeds: [
        {
            id: string,
            name: string,
            origin: string,
            temperament: string,
            description: string
        }
    ];
    url: string;
    width: number;
    height: number;
}
  