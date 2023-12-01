<script lang="ts">
	import { SignedIn, SignedOut } from 'sveltefire';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
</script>

<section class="flex h-full w-full justify-center items-center">
	<div>
		<SignedOut let:auth>
			<button
				class="btn variant-filled-primary"
				on:click={() => signInWithPopup(auth, new GoogleAuthProvider())}>Sign In</button
			>
		</SignedOut>

		<SignedIn let:user let:signOut>
			<div class="flex flex-col gap-2">
				<p>Hello {user?.displayName}</p>
				<button class="btn variant-filled-secondary" on:click={signOut}>Sign Out</button>
			</div>
		</SignedIn>
	</div>
</section>
