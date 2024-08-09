export const useFetchBooth = async (id: number) => {
    const runtimeConfig = useRuntimeConfig();
    try {
        const response: any = await $fetch(
            `/api/GetBoothItem?id=${encodeURIComponent(id)}`,
            {
                headers: {
                    Authorization: runtimeConfig.public.token,
                },
            }
        );
        return response.body;
    } catch (error) {
        console.error("Failed to fetch item data:", error);
        return null;
    }
};
