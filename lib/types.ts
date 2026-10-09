export type Product = { id:string; name:string; slug:string; description:string; category:string; brand:string; price:number; salePrice:number|null; stock:number; outOfStock:boolean; image:string; images:string[]; featured:boolean; newArrival:boolean; bestSeller:boolean };
export const price = (p: Product) => (p.salePrice && p.salePrice > 0 && p.salePrice < p.price ? p.salePrice : p.price);
export const rs = (n: number) => 'Rs. ' + n.toLocaleString('en-PK');
