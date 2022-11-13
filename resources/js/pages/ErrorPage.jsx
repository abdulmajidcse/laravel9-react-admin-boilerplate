const ErrorPage = ({ errorCode = 404, errorMessage = "Not Found" }) => {
    const errorPageCss = {
        display: "flex",
        height: "100vh",
        width: "100%",
    };

    return (
        <>
            <div
                className="flex-column justify-content-center align-items-center"
                style={errorPageCss}
            >
                <div className="text-center text-uppercase">
                    <strong>
                        {errorCode} | {errorMessage}
                    </strong>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
