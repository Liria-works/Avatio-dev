import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const { data, error } = await client.auth.signUp({
        email: "liry241999@gmail.com",
        password: "password",
    });
});
