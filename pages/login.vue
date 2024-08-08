<script setup lang="ts">
const supabase = useSupabaseClient();

const loading = ref(false);

const login = ref({
    email: "",
    password: "",
});

const signUp = ref({
    email: "",
    password: "",
});

const handleLogin = async () => {
    try {
        loading.value = true;
        const { error } = await supabase.auth.signInWithPassword({
            email: login.value.email,
            password: login.value.password,
        });
        if (error) throw error;
        alert("Logged in successfully");
    } catch (error: any) {
        alert(error.error_description || error.message);
    } finally {
        loading.value = false;
    }
};

const handleSignUp = async () => {
    console.log(signUp.value.email, signUp.value.password);
    try {
        loading.value = true;
        const { data, error } = await supabase.auth.signUp({
            email: signUp.value.email,
            password: signUp.value.password,
        });
    } catch (error: any) {
        alert(error.error_description || error.message);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="w-full flex flex-col items-center gap-5">
        <UForm
            :state="login"
            class="w-96 flex flex-col gap-3"
            @submit="handleLogin"
        >
            <UFormGroup name="email">
                <UInput v-model="login.email" placeholder="Email" />
            </UFormGroup>
            <UFormGroup name="password">
                <UInput v-model="login.password" placeholder="Password" />
            </UFormGroup>

            <UButton type="submit" :disabled="loading">
                {{ loading ? "Loading" : "Login" }}
            </UButton>
        </UForm>
        <UForm
            :state="signUp"
            class="w-96 flex flex-col gap-3"
            @submit="handleSignUp"
        >
            <UFormGroup name="email">
                <UInput v-model="signUp.email" placeholder="Email" />
            </UFormGroup>
            <UFormGroup name="password">
                <UInput v-model="signUp.password" placeholder="Password" />
            </UFormGroup>

            <UButton type="submit" :disabled="loading">
                {{ loading ? "Loading" : "Sign up" }}
            </UButton>
        </UForm>
    </div>
</template>
