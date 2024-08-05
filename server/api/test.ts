export default eventHandler(async (event) => {
    const query: any = getQuery(event);
    try {
        const result: any = await $fetch(query.url, {
            method: "GET",
            scheme: "https",
        });
        return {
            status: 200,
            message: "ok",
            body: result,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            body: { error: "Failed to fetch data" },
        };
    }
});
