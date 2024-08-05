// DBに登録されているデータが古い場合にBoothからデータを取得してDBに保存する工程の追加
// カテゴリ外でもVRChatタグ等が付いていた場合の例外処理
// NSFWアイテムに対する処理の追加 -> Puppeteerの利用
// ログイン済みユーザー以外の処理は弾くようにする
// URLが成り立っていないとInternal server errorになるので、エラーハンドリングを追加

import { serverSupabaseClient } from "#supabase/server";
import { load } from "cheerio";

const url_base = "https://booth.pm/ja/items/";

const allowed_category_id = [
    // 3Dモデル
    208, // 3Dキャラクター
    209, // 3D衣装
    217, // 3D装飾品
    210, // 3D小道具
    214, // 3Dテクスチャ
    215, // 3Dツール・システム
    216, // 3Dモーション・アニメーション
    211, // 3D環境・ワールド
    212, // VRoid
    127, // 3Dモデル（その他）
    // 素材データ
    125, // イラスト素材
    213, // イラスト3D素材
    126, // 背景画像
    128, // フォント・書体
    129, // アイコン
    22, //ロゴ
    123, //BGM素材
    124, //効果音
    134, // 素材（その他）
];

export default defineEventHandler(async (event) => {
    const startTime = Date.now(); // 処理開始時刻を記録
    const query = getQuery(event);
    const id = Number(extractId(query));

    if (!id) {
        return {
            status: 400,
            body: { error: "No ID or URL provided" },
        };
    }

    const client = await serverSupabaseClient(event);
    const { data }: any = await client
        .from("items")
        .select("*")
        .eq("id", id)
        .single();

    if (data) {
        logDuration(startTime, "Database", data.name);
        return createResponse(200, "Data found in database", data, id);
    }

    try {
        const result: any = await $fetch(url_base + id, {
            credentials: "include",
            method: "GET",
            scheme: "https",
            headers: {
                "Content-Type": "text/plain",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-User": "?1",
                "Sec-Fetch-Site": "same-origin",
                "If-None-Match": 'W/"8d2296fdc182b5d7cfa7af601f0dc941"',
                Priority: "u=0, i",
                Referer: "https://booth.pm/ja/items/5532971",
                "Sec-Ch-Ua":
                    '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": "Windows",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Accept-Encoding": "gzip, deflate, br, zstd",
                "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
            },
        });
        const $ = load(result);
        const itemData = extractItemData($);

        // カテゴリIDをチェック
        if (!isAllowedCategory(itemData.category)) {
            return {
                status: 400,
                body: { error: "Invalid category ID" },
            };
        }

        await client.from("items").insert(itemData);
        logDuration(startTime, "Booth", itemData.name);

        return createResponse(200, "Data fetched from Booth URL", itemData, id);
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            body: { error: "Failed to fetch data" },
        };
    }
});

function extractId(query: any): string | undefined {
    if (query.id) {
        return query.id;
    }
    if (query.url) {
        const url_parse = new URL(query.url.toString());
        const pathSegments = url_parse.pathname
            .split("/")
            .filter((segment) => segment);
        const itemsIndex = pathSegments.indexOf("items");
        return itemsIndex !== -1 && itemsIndex + 1 < pathSegments.length
            ? pathSegments[itemsIndex + 1]
            : undefined;
    }
    return undefined;
}

function extractItemData($: any): any {
    const data_market = $(".market");
    return {
        id: Number(data_market.attr("data-product-id")),
        name: data_market.attr("data-product-name")?.toString(),
        price: Number(data_market.attr("data-product-price")),
        category: Number(data_market.attr("data-product-category")),
        //vrchat: $('img[alt="VRChat"]').length,
        shop: $(".shop__text").find("a").text(),
        shop_id: data_market.attr("data-product-brand")?.toString(),
        thumbnail: $('meta[property="og:image"]').attr("content")?.toString(),
        nsfw: !data_market.attr("data-product-price"),
    };
}

function isAllowedCategory(categoryId: number): boolean {
    return allowed_category_id.includes(categoryId);
}

function logDuration(startTime: number, source: string, itemName: string) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Fetch Done : ${source} : ${duration}ms : ${itemName}`);
}

function createResponse(
    status: number,
    message: string,
    data: any,
    id: number
) {
    return {
        status,
        message,
        body: {
            link: url_base + id.toString(),
            id: data.id,
            item: data.name,
            price: data.price,
            category: data.category,
            category_id: data.category,
            shop: data.shop,
            shop_id: data.shop_id,
            thumbnail: data.thumbnail,
            nsfw: data.nsfw,
        },
    };
}
