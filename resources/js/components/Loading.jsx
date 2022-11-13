import ReactLoading from "react-loading";

const Loading = ({ loadingIs = true, bgColor = null }) => {
    const loadingCss = {
        display: "flex",
        backgroundColor: bgColor ?? "rgb(244 246 249 / 42%)",
        height: "100vh",
        width: "100%",
        transition: "height .2s linear",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
    };

    if (!loadingIs) return true;

    return (
        <>
            <div
                className="flex-column justify-content-center align-items-center"
                style={loadingCss}
            >
                <ReactLoading type="bars" color="red" />
            </div>
        </>
    );
};

export default Loading;
