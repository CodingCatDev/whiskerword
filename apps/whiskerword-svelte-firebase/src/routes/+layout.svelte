<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Firebase
	import { PUBLIC_EMULATOR } from '$env/static/public';
	import { FirebaseApp, docStore } from 'sveltefire';
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
	import { topicStore, categoryStore, typeStore } from './store';
	import type { Unsubscriber } from 'svelte/store';
	let unsubTopic: Unsubscriber;
	onMount(() => {
		// If we are in the game set the correct category state
		if ($page.url.pathname.startsWith('/game')) {
			const paths = $page.url.pathname.replace('/game/', '').split(',');
			const categoryRef = docStore(firestore, `categories/${paths.at(0)}`);
			categoryRef.subscribe((category) => {
				categoryStore.set({
					...category,
					ref: categoryRef
				});
			});
			const typeRef = docStore(firestore, `categories/${paths.at(0)}/types/${paths.at(1)}`);
			typeRef.subscribe((type) => {
				typeStore.set({
					...type,
					ref: categoryRef
				});
			});
			const topicRef = docStore(
				firestore,
				`categories/${paths.at(0)}/types/${paths.at(1)}/topics/${paths.at(2)}`
			);
			topicRef.subscribe((topic) => {
				topicStore.set({
					...topic,
					ref: categoryRef
				});
			});
		}
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
					<div class="flex flex-col">
						<a href="/">
							<strong class="text-xl">WiskerWord</strong>
						</a>
						<span>{new Date().toLocaleDateString()}</span>
					</div>
				</svelte:fragment>
				<div class="flex flex-col">
					<div class="flex capitalize">Category: {$categoryStore?.name || ''}</div>
					<div class="flex capitalize">Type: {$typeStore?.name || ''}</div>
					<div class="flex capitalize">Topic: {$topicStore?.name || ''}</div>
				</div>
				<svelte:fragment slot="trail">
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
		<div class="w-full h-full flex">
			<aside class="flex-none overflow-x-hidden overflow-y-auto bg-surface-50-900-token lg:w-auto">
				<CategoryPicker />
			</aside>

			<div id="page" class="flex-1 flex justify-center">
				<!-- Page Route Content -->
				<slot />
			</div>
		</div>
	</AppShell>
</FirebaseApp>
