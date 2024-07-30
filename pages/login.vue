<script setup lang="ts">
const supabase = useSupabaseClient()

const signInWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: '    ',
        password: '    ',
    })
    if (error) console.log(error)
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log(error)
}
</script>


<template>

    <div class="items-start gap-8 flex flex-col w-full">
        <UButton label="login" block />

    </div>

</template>
