import { Fragment } from "react";

export default function NoMatch() {
    return (
    <Fragment>
        <div className="container text-center d-flex flex-column align-items-center justify-content-center mx-auto">
            <div className="mb-4">
                <div className="w-100 h-auto d-flex justify-content-center align-items-center">
                    <img src="https://www.tailwindtap.com/_next/image?url=%2Fassets%2Fcomponents%2F404%2F404-green.png&w=1920&q=75" 
                         className="img-fluid" 
                         alt="404 Not Found" />
                </div>
            </div>
            <div>
                <h3 className="display-4 text-dark">Page Not Found</h3>
            </div>
            <div className="d-flex flex-column gap-3 mt-3">
                <div className="text-center">
                    <p className="text-muted">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>
            </div>
        </div>
    </Fragment>
    );
}
