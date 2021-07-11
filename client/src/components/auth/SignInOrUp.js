import GoogleLogin from 'react-google-login';

const SignInOrUp = () =>
    {
        const successHandler = async (res) =>
        {
            const user = res?.profileObj;
            const token = res?.tokenId;

            try
            {
                // const res = await fetch("",
                //     {
                //         method: "POST",
                //         body: JSON.stringify({ token, user }),
                //         headers: { "Content-Type": "application/json" }
                //     });

                // const data = await res.json();
                console.log(user, token);

                // store returned user in local storage
            }
            catch(err) { console.log(err); };

        };

        const errorHandler = async (err) =>
        {
            console.log(err);
        };

        return (
            <div className="SignInOrUp">
                <GoogleLogin
                    clientId="248809747957-t28kdcifl2ujfhvqlqmhaubscpui2299.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={successHandler}
                    onFailure={errorHandler}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    };

export default SignInOrUp;