import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const client = await serverSupabaseClient(event);

    //let data: any;
    if (query.id) {
        const { data }: any = await client
            .from("setups")
            .select("*")
            .eq("id", query.id as number)
            .single();
        //console.log(query.id);
        if (data) {
            return {
                status: 200,
                message: "Setup found in database",
                body: {
                    name: data.name,
                    desc: data.desc,
                    tags: data.tags,
                    author: data.author,
                    avatar: data.avatar,
                    items: data.items,
                },
            };
        }
    } else {
        const { data }: any = await client.from("setups").select("id");
        if (data) {
            return {
                status: 200,
                message: "Fetched all setups in database",
                body: data,
            };
        }
    }
});
