import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Footer() {
    return (
        <footer className="main-footer">
            <strong>Copyright &copy; 2023 <a href="https://example.com">Bimbel Compass</a>.</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 1.0.0
            </div>
        </footer>
    );
}

export default Footer;