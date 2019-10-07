import React from 'react';
import { IdentityContext } from '../layouts';

export function UserAuth(props) {
    const [form, setForm] = React.useState({
        email: 'cameron.zaas@mindbodyonline.com',
        password: 'Test1234!',
    });
    const [useLogin, setUseLogin] = React.useState(true);
    const [error, setError] = React.useState(null);
    const identity = React.useContext(IdentityContext);
    console.log(identity);

    async function handleLogin(e) {
        e.preventDefault();
        setError(null);
        try {
            const login = await identity.loginUser(form.email, form.password);
        } catch (e) {
            setError('');
        }
    }
    async function handleSignUp(e) {
        e.preventDefault();
        setError(null);
        if (!form.email.includes('@mindbodyonline.com')) {
            setError('You must be using a @mindbodyonline.com email address');
            return;
        }
        const signup = await identity.signupUser(form.email, form.password);
        console.log(signup);
    }

    if (identity.isLoggedIn && !identity.isConfirmedUser) {
        return <p>You're almost all set, check your email and confirm your sign up.</p>;
    }

    return (
        <>
            <p>You need to be logged in to view this content</p>

            {useLogin ? (
                <>
                    <h2>Login</h2>
                    <p>
                        If you don't have an account, <a onClick={() => setUseLogin(false)}>sign up</a>.
                    </p>
                    <form onSubmit={handleLogin}>
                        <label>
                            Email
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            Password
                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                            />
                        </label>
                        <br />
                        <button>Log In</button>
                    </form>
                </>
            ) : (
                <>
                    <h2>Signup</h2>
                    <p>
                        If you already have an account, <a onClick={() => setUseLogin(true)}>log in</a>.
                    </p>
                    <form onSubmit={handleSignUp}>
                        <label>
                            Email
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            Password
                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                            />
                        </label>
                        <br />
                        <button>Sign Up</button>
                    </form>
                </>
            )}
            {error && <p>{error}</p>}
        </>
    );
}
