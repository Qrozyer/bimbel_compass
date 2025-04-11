import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Logo Sidebar */}
            <a href="/" className="brand-link">
                <span className="brand-text font-weight-light">AdminLTE React</span>
            </a>

            {/* Sidebar Menu */}
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/blank" className="nav-link">
                                <i className="nav-icon far fa-file"></i>
                                <p>Blank Page</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;