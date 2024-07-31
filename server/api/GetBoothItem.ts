import { serverSupabaseClient } from "#supabase/server";
import superagent from "superagent";
import { load } from "cheerio";

//モジュール化

// DBになかった場合にBoothからデータを取得してDBに保存する工程の追加
// DBに登録されているデータが古い場合にBoothからデータを取得してDBに保存する工程の追加
// リンクが切れている場合のレスポンスの追加
// カテゴリがアバター関連の場合のみ処理を継続するようにする -> カテゴリ外でもVRChatタグ等が付いていた場合の例外処理も追加
// NSFWアイテムに対する処理の追加 -> Puppeteerの利用

const url_base = "https://booth.pm/ja/items/";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    let id;

    if (query.id) {
        id = query.id;
    } else if (query.url) {
        const url_parse = new URL(query.url.toString());

        const pathSegments = url_parse.pathname
            .split("/")
            .filter((segment) => segment);

        const itemsIndex = pathSegments.indexOf("items");
        id =
            itemsIndex !== -1 && itemsIndex + 1 < pathSegments.length
                ? pathSegments[itemsIndex + 1]
                : undefined;
    } else {
        return {
            status: 400,
            body: { error: "No ID or URL provided" },
        };
    }

    const client = await serverSupabaseClient(event);
    const { data } = await client
        .from("items")
        .select("*")
        .eq("id", id as string)
        .single();

    if (data) {
        return {
            status: 200,
            message: "Data found in database",
            body: {
                link: url_base + id,
                id: data.id,
                item: data.name,
                price: data.price,
                category: "",
                category_id: data.category,
                shop: data.shop,
                shop_id: data.shop_id,
                thumbnail: data.thumbnail,
                nsfw: data.nsfw,
            },
        };
    }

    const url = url_base + id;

    try {
        const result = await superagent.get(url);
        const $ = load(result.text);
        const data_market = $(".market");

        let item = data_market.attr("data-product-name")?.toString();
        let shop = $(".shop__text").find("a").text();

        const item_id = data_market.attr("data-product-id")?.toString();
        const price = data_market.attr("data-product-price")?.toString();
        const category_name = data_market
            .attr("data-shop-tracking-product-category")
            ?.toString();
        const category = data_market.attr("data-product-category")?.toString();
        const shop_id = data_market.attr("data-product-brand")?.toString();
        const thumbnail = $('meta[property="og:image"]')
            .attr("content")
            ?.toString();

        const nsfw: boolean = !data_market
            .attr("data-product-price")
            ?.toString();

        return {
            status: 200,
            message: "Data fetched from Booth URL",
            body: {
                link: url,
                id: item_id,
                item: item,
                price: price,
                category: category_name,
                category_id: category,
                shop: shop,
                shop_id: shop_id,
                thumbnail: thumbnail,
                nsfw: nsfw,
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
