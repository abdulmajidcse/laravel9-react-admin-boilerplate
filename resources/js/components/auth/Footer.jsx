export default () => {
    return (
        <>
            <footer className="main-footer">
                <strong>
                    Copyright &copy; {`${new Date().getFullYear()} `}
                    <a href="/">{import.meta.env.VITE_APP_NAME}</a>.
                </strong>{" "}
                All rights reserved.
            </footer>
        </>
    );
};
