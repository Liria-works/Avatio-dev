import superagent from "superagent";
import { load } from "cheerio";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const url = "https://booth.pm/ja/items/" + query.id;

    try {
        const result = await superagent.get(url);
        const $ = load(result.text);
        const item = $(".market").attr("data-product-name")?.toString();
        const item_id = $(".market").attr("data-product-id")?.toString();
        const price = $(".market").attr("data-product-price")?.toString();
        const category_name = $(".market")
            .attr("data-shop-tracking-product-category")
            ?.toString();
        const category = $(".market").attr("data-product-category")?.toString();
        const shop = $(".shop__text").find("a").text();
        const shop_id = $(".market").attr("data-product-brand")?.toString();
        const thumbnail = $('meta[property="og:image"]')
            .attr("content")
            ?.toString();

        return {
            status: 200,
            body: {
                item: item,
                item_id: item_id,
                price: price,
                category_name: category_name,
                category: category,
                shop: shop,
                shop_id: shop_id,
                thumbnail: thumbnail,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            body: { error: "Failed to fetch data" },
        };
    }
});
