const AuthPageLayout = ({ leftSection, rightSection, children }) => {
    return (
        <>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">{leftSection}</div>
                            <div className="col-sm-6">
                                <div className="float-right">
                                    {rightSection}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="card card-info">
                            <div className="card-body">{children}</div>
                        </div>
                        {/* /.card-body */}
                    </div>
                </section>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}
        </>
    );
};

export default AuthPageLayout;
