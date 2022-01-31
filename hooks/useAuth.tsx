import { useState, createContext, useContext, useEffect } from 'react';
import {
	auth,
	signInWithPopup,
	signOut,
	googleProvider,
	onAuthStateChanged,
} from '../firebase';
import type { User } from 'firebase/auth';

type AuthContextType = {
	user: User | false | null;
	login: Function;
	logout: Function;
};

const AuthContext = createContext({} as AuthContextType);

function useAuth() {
	return useContext(AuthContext);
}

function AuthProvider({ children }: { children: JSX.Element }) {
	const auth = authHandler();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function authHandler() {
	const [user, setUser] = useState<User | false | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});

		return () => unsubscribe();
	}, []);

	const login = () => {
		signInWithPopup(auth, googleProvider).then((data) => {
			setUser(data.user);
		});
	};

	const logout = () => {
		signOut(auth).then(() => setUser(false));
	};

	return {
		user,
		login,
		logout,
	};
}

export { AuthProvider, useAuth };
