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
  