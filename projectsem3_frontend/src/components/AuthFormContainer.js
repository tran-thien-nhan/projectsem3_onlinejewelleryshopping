import React, { useState, useEffect } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import Panel from './Panel';
import '../asset/style/style.css';
import logoImage from '../asset/img/logo.svg';
import registerImage from '../asset/img/register.svg';
// ok 123
const AuthFormContainer = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);

    const switchToSignUp = () => {
        setSignUpMode(true);
    };

    const switchToSignIn = () => {
        setSignUpMode(false);
    };

    useEffect(() => {
        const container = document.querySelector(".container");

        const handleSignUpClick = () => {
            container.classList.add("sign-up-mode");
        };

        const handleSignInClick = () => {
            container.classList.remove("sign-up-mode");
        };

        const sign_up_btn = document.querySelector("#sign-up-btn");
        const sign_in_btn = document.querySelector("#sign-in-btn");

        sign_up_btn.addEventListener("click", handleSignUpClick);
        sign_in_btn.addEventListener("click", handleSignInClick);

        // Clean up event listeners when the component unmounts
        return () => {
            sign_up_btn.removeEventListener("click", handleSignUpClick);
            sign_in_btn.removeEventListener("click", handleSignInClick);
        };
    }, []);

    return (
        <>
            <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <SigninForm />
                        <SignupForm />
                    </div>
                </div>

                <div className="panels-container">
                    <Panel
                        side="left"
                        headerText="New here ?"
                        buttonText="Sign Up"
                        content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!"
                        imageSrc={logoImage}
                        onClick={switchToSignUp}
                        idText="sign-up-btn"
                    />
                    <Panel
                        side="right"
                        headerText="One of us ?"
                        buttonText="Log In"
                        content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!"
                        imageSrc={registerImage}
                        onClick={switchToSignIn}
                        idText="sign-in-btn"
                    />
                </div>
            </div>
        </>
    );
};

export default AuthFormContainer;
