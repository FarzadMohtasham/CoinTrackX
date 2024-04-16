export type Author = {
    imgSrc: string;
    name: string;
    job: string;
}

export type Review = {
    numberOfStars: number;
    quote: string;
    author: Author
}

