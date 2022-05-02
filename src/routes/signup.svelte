<script lang="ts">
	import { goto } from '$app/navigation';
	import { signup } from '$lib/stores/authStore';

	let username = '';
	let password1 = '';
	let password2 = '';
	let e_username = false;
	let e_password = false;
	let shortPassword = false;

	const signUp = async () => {
		e_username = false;
		e_password = false;
		shortPassword = false;
		if (password1.trim() !== password2.trim() || !password1.trim()) {
			e_password = true;
			return;
		}
		try {
			await signup(username.trim(), password1.trim());
			goto('/');
		} catch (error) {
			if (error.message === 'Password is too short (min 6)') {
				shortPassword = true;
				e_password = true;
			} else if (error.message.startsWith('E11000 duplicate key error')) {
				e_username = true;
			}
		}
	};
</script>

<svelte:head >
    <title>Sign up</title>
</svelte:head>

<div class="grid place-items-center h-screen bg-gradient-to-br p-3 from-green-500 to-cyan-500">
	<div>
		<div class="flex flex-col gap-8 w-[calc(100vw-1.5rem)] max-w-[375px] bg-white rounded-xl p-8">
			<div class="flex flex-col gap-8">
				<span class="m-auto text-4xl font-bold my-10">Sign up</span>
				<input
					class="border-b-2 pl-1 pb-1 w-full text-xl outline-none hover:border-black/40"
					class:e_username
					id="username"
					type="text"
					placeholder="Username"
					bind:value={username}
				/>
				<div class="relative">
					<input
						class="border-b-2 pl-1 pb-1 w-full text-xl outline-none hover:border-black/40"
						class:e_password
						type="password"
						placeholder="Password"
						bind:value={password1}
					/>
					{#if shortPassword}
						<div class="text-red-600 absolute top-1 right-0">min 6</div>
					{/if}
				</div>
				<input
					class="border-b-2 pl-1 pb-1 w-full text-xl outline-none hover:border-black/40"
					class:e_password
					type="password"
					placeholder="Password"
					bind:value={password2}
				/>
				<button
					on:click={signUp}
					class="mt-2 rounded-md bg-gradient-to-br p-3 from-green-500 to-cyan-500 text-white hover:bg-gradient-to-br hover:to-green-500 hover:from-cyan-500"
					>Sign up</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.e_username {
		@apply border-red-500;
	}

	.e_password {
		@apply border-red-500;
	}
</style>
