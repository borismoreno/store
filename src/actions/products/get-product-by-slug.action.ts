import { defineAction } from 'astro:actions';
import { db, eq, Product, ProductImage } from 'astro:db';
import { z } from 'astro:schema';

const newProduct = {
    id: '',
    stock: 0,
    slug: '',
    price: 0,
    sizes: '',
    type: 'shirts',
    tags: '',
    title: '',
    description: '',
    gender: 'men',
}

export const getProductBySlug = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (slug) => {

        if (slug === 'new') {
            return {
                product: newProduct,
                images: []
            }
        }

        const [product] = await db.select().from(Product).where(eq(Product.slug, slug));

        if (!product) {
            throw new Error(`Product with slug ${slug} not found`);

        }

        const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id))
        return {
            product: product,
            images: images
            // images: images.map(i => i.image)
        };
    }
});
