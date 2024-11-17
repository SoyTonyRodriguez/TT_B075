import { useEffect, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';

const ExternalRedirect = ({ url }) => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.location.href = url;

    setLoading(false);
    return null;
  }, [url]);

  if (loading) {
    return <LoadingAnimation />;
}

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Redirigiendo...</h1>
//       <p>Por favor, espera un momento mientras te redirigimos al panel de administración.</p>
//     </div>
//   );
};

export default ExternalRedirect;