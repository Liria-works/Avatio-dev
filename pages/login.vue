<script setup>
const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
    try {
        loading.value = true;
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
        });
        if (error) throw error;
        alert("Check your email for the login link!");
    } catch (error) {
        alert(error.error_description || error.message);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="w-full flex flex-col items-center gap-5">
        <UForm class="w-96 flex flex-col gap-3" @submit="handleLogin">
            <UFormGroup name="email">
                <UInput v-model="email" placeholder="Email" />
            </UFormGroup>

            <UButton type="submit" :disabled="loading">
                {{ loading ? "Loading" : "Send magic link" }}
            </UButton>
        </UForm>
    </div>
</template>
