
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {

    const navigate = useNavigate();

    return (
        <div className="landing">

            <nav className="landingNav">
                <h2>DeltaGpt</h2>

                <button
                    className="loginBtn"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            </nav>


            <main className="landingContent">

                <div className="hero">

                    <p className="badge">
                        AI Assistant
                    </p>

                    <h1>
                        Think better.
                        <br />
                        <span>Build faster.</span>
                    </h1>

                    <p className="description">
                        DeltaGpt is your AI-powered assistant for
                        learning, coding, problem solving, and
                        everyday questions.
                    </p>

                    <div className="heroButtons">

                        <button
                            className="getStarted"
                            onClick={() => navigate("/signup")}
                        >
                            Get Started
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>

                        <button
                            className="learnMore"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                    </div>

                </div>

            </main>


            <footer className="landingFooter">
                <span>© 2026 DeltaGpt</span>
                <span>Powered by AI</span>
            </footer>

        </div>
    );
}