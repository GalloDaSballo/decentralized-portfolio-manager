import Head from "next/head";
import { useState } from "react";
import Portfolio from "../components/Portfolio";
import { useLogin, useProvider } from "../context/UserContext";
import styles from "../styles/Index.module.scss";

export const Home = (): JSX.Element => {
    const provider = useProvider();
    const login = useLogin();

    const [string, setString] = useState<string>("");

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {!provider && (
                    <div>
                        <h1>Please Login by passing a RPC String</h1>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (string === "") {
                                    // Do nothing
                                } else {
                                    login(string);
                                }
                            }}
                        >
                            <input
                                type="text"
                                onChange={(e) => setString(e.target.value)}
                            />
                            <button type="submit">Login with RPC String</button>
                        </form>
                    </div>
                )}

                {provider && (
                    <div>
                        <h2>Portfolio here</h2>
                        <Portfolio provider={provider} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
