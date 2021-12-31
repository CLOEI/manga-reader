import { useState, useEffect, createContext, useContext } from 'react';
import {
	onAuthStateChanged,
	auth,
	githubProvider,
	signOut,
	signInWithRedirect,
} from '../firebase';

const authContext = createContext();

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const signin = () => {
		return signInWithRedirect(auth, githubProvider).catch((err) => setError(err));
	};
	const signout = () => {
		return signOut(auth).catch((err) => setError(err));
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	return {
		user,
		error,
		signin,
		signout,
	};
}
