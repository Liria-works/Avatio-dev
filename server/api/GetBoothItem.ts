// ログイン済みユーザー以外の処理は弾くようにする
// ItemのComponentにfetchしたデータを渡せるようにして、fetchが２回起こらないように

import { serverSupabaseClient } from "#supabase/server";
// import { load } from "cheerio";

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
    let old = false;

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
        const timeDifference = startTime - new Date(data.updated_at).getTime();

        // 時間の差分が1日を超えている場合、処理継続する
        if (timeDifference < 24 * 60 * 60 * 1000) {
            logDuration(startTime, "Database", data.name);
            return createResponse(200, "Data found in database", data, id);
        }
        old = true;
        console.log("Data is old, fetching from Booth");
    }

    try {
        const result: any = await $fetch(
            "https://imbxeblwlopxrgexztsx.supabase.co/functions/v1/get-booth-item",
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + process.env.SUPABASE_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
            }
        );
        const itemData = {
            id: result.id,
            name: result.name,
            thumbnail: result.thumbnail,
            price: result.price,
            category: result.category,
            shop: result.shop,
            shop_id: result.shop_id,
            shop_thumbnail: result.shop_thumbnail,
            shop_verified: result.shop_verified,
            nsfw: result.nsfw,
        };

        // カテゴリIDをチェック
        if (!isAllowedCategory(result.category, result.tags)) {
            return {
                status: 400,
                body: { error: "Invalid category ID" },
            };
        }

        if (old) {
            const res = await client
                .from("items")
                .update(itemData)
                .eq("id", id);
            // console.log("OLD : ", res);
        } else {
            const res = await client.from("items").insert(itemData);
            // console.log(res);
        }
        logDuration(startTime, "Booth", result.name);

        return createResponse(200, "Data fetched from Booth URL", result, id);
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
        try {
            const url_parse = new URL(query.url.toString());
            const pathSegments = url_parse.pathname
                .split("/")
                .filter((segment) => segment);
            const itemsIndex = pathSegments.indexOf("items");

            return itemsIndex !== -1 && itemsIndex + 1 < pathSegments.length
                ? pathSegments[itemsIndex + 1]
                : undefined;
        } catch (error) {
            return undefined;
        }
    }
    return undefined;
}

function isAllowedCategory(categoryId: number, tags: any): boolean {
    if (allowed_category_id.includes(categoryId)) {
        return true;
    } else {
        for (const tag of tags) {
            if (tag.name === "VRChat") {
                return true;
            }
        }
    }
    return false;
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
            thumbnail: data.thumbnail,
            price: data.price,
            category: data.category,
            shop: data.shop,
            shop_id: data.shop_id,
            shop_thumbnail: data.shop_thumbnail,
            shop_verified: data.shop_verified,
            nsfw: data.nsfw,
        },
    };
}
