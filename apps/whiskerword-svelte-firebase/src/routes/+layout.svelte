<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Firebase
	import { PUBLIC_EMULATOR } from '$env/static/public';
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
	import { getAuth, connectAuthEmulator } from 'firebase/auth';
	import { connectStorageEmulator, getStorage } from 'firebase/storage';
	import CategoryPicker from './CategoryPicker.svelte';
	import { onDestroy, onMount } from 'svelte';

	// Initialize Firebase
	const app = initializeApp({
		apiKey: 'AIzaSyDtA64NUU5MSm8EI0UNHcHp8oGOvVlTLRA',
		authDomain: 'whiskerword.firebaseapp.com',
		projectId: 'whiskerword',
		storageBucket: 'whiskerword.appspot.com',
		messagingSenderId: '801717146769',
		appId: '1:801717146769:web:cf68e38b9eece755305b30',
		measurementId: 'G-MRREFE81N0'
	});
	const auth = getAuth(app);
	const firestore = getFirestore(app);
	const storage = getStorage(app);
	if (PUBLIC_EMULATOR) {
		connectAuthEmulator(auth, 'http://localhost:9099/auth');
		connectFirestoreEmulator(firestore, 'localhost', 8080);
		connectStorageEmulator(storage, 'localhost', 9199);
	}

	// Nav
	import { topic, category, type } from './store';
	import type { Unsubscriber } from 'svelte/store';
	let unsubTopic: Unsubscriber;
	onMount(() => {
		unsubTopic = topic.subscribe((t) => {
			if (t?.id) {
				window.location.href = `/game/${$category?.id},${$type?.id},${$topic?.id}`;
			}
		});
	});
	onDestroy(() => {
		if (unsubTopic) {
			unsubTopic();
		}
	});
</script>

<!-- Firebase App -->

<FirebaseApp {auth} {firestore} {storage}>
	<!-- App Shell -->
	<AppShell>
		<svelte:fragment slot="header">
			<!-- App Bar -->
			<AppBar>
				<svelte:fragment slot="lead">
					<strong class="text-xl uppercase">Skeleton</strong>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://discord.gg/EXqV7W8MtY"
						target="_blank"
						rel="noreferrer"
					>
						Discord
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://twitter.com/SkeletonUI"
						target="_blank"
						rel="noreferrer"
					>
						Twitter
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://github.com/skeletonlabs/skeleton"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<div class="container h-full">
			<div class="">
				<CategoryPicker />
				<!-- Page Route Content -->
				<slot />
			</div>
		</div>
	</AppShell>
</FirebaseApp>
