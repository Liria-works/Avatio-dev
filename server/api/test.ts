export default eventHandler(async (event) => {
    const query: any = getQuery(event);
    const id = query.id;

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

        return {
            status: 200,
            message: "ok",
            body: result,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Failed to fetch data",
            body: error,
        };
    }
});
