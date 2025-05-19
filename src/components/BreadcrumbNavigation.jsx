import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbNavigation = ({ paths }) => {
  const location = useLocation();

  return (
    <nav style={{ marginBottom: '1.5rem', fontSize: '15px' }}>
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;

        return (
          <span key={index}>
            {path.to && !isLast ? (
              <Link
                to={path.to}
                style={{
                  color: '#6c757d', // abu-abu untuk path sebelumnya
                  textDecoration: 'none',
                }}
              >
                {path.label}
              </Link>
            ) : (
              <span
                style={{
                  color: '#007bff', // biru untuk halaman aktif
                  fontWeight: 'bold',
                }}
              >
                {path.label}
              </span>
            )}
            {index < paths.length - 1 && (
              <span style={{ margin: '0 5px', color: '#6c757d' }}>{'>'}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadcrumbNavigation;
