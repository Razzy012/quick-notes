<script lang='ts'>
    import { goto } from '$app/navigation';
    import { login } from '$lib/stores/authStore';

    let username = '';
    let password = '';
    let errorClass = false;

    const loginButton = async () => {
        if (!username.trim() || !password.trim()) {
            errorClass = true;
            return;
        }
        errorClass = false;
        try {
            await login(username.trim(), password.trim());
            goto('/');
        } catch (error) {
            if (error.message === 'Wrong username or password') {
                errorClass = true;
            }
        }
    }

    let screenWidth: number = 1000;
</script>

<svelte:head >
    <title>Login</title>
</svelte:head>

<svelte:window bind:innerWidth={screenWidth}/>

<div class="grid place-items-center h-screen bg-gradient-to-br p-3 from-green-500 to-cyan-500">
	<div>
		<div class="flex flex-col gap-8 w-[calc(100vw-1.5rem)] max-w-[375px] bg-white rounded-xl p-8
                    md:flex-row md:max-w-[752px]">
			<div class="flex flex-col gap-8 md:min-w-[311px] md:min-h-[392px]">
				<span class="m-auto text-4xl font-bold my-10">Login</span>
				<input
					class="border-b-2 pl-1 pb-1 w-full text-xl outline-none hover:border-black/40"
                    class:errorClass
					id="username"
					type="text"
					placeholder="Username"
                    bind:value={username}
				/>
				<input 
                    class="border-b-2 pl-1 pb-1 w-full text-xl outline-none hover:border-black/40"
                    class:errorClass
                    type="password"
                    placeholder="Password"
                    bind:value={password}
                />
				<button on:click={loginButton} class="mt-2 rounded-md bg-gradient-to-br p-3 from-green-500 to-cyan-500 text-white hover:bg-gradient-to-br hover:to-green-500 hover:from-cyan-500">Login</button>
			</div>
			<div class="m-auto md:border-l-2 md:m-0 md:grid md:place-items-center md:w-full">
                {#if screenWidth >= 768}
                    <div class="flex flex-col gap-5 ml-auto">
                        <span class="m-auto text-3xl font-bold">Sign up</span>
                        <span class="m-auto text-sm">Sign up here if you dont have account.</span>
                        <a href="/signup" class="text-center mt-2 rounded-md bg-gradient-to-br p-3 from-green-500 to-cyan-500 text-white w-[311px] hover:bg-gradient-to-br hover:to-green-500 hover:from-cyan-500">Sign up</a>
                    </div>
                {:else}
                    <span class="text-sm">Don't have account? <a href="/signup" class="text-blue-600">Sing up</a></span>
                {/if}
			</div>
		</div>
	</div>
</div>

<style>
    .errorClass {
        @apply border-red-500;
    }
</style>
