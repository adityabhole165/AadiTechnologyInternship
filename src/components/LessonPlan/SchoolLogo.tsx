import { useEffect, useState } from 'react';

export function SchoolLogoComponent({ schoolName }) {
    const [base64Image, setBase64Image] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadLogo() {
            try {
                const imageUrl = `https://riteschoolmobileservicehttps.riteschool.com/images/${schoolName}_logo.png`;

                const response = await fetch(imageUrl, {
                    mode: 'no-cors', // Note: this won't let you read the response
                    headers: {
                        'Origin': window.location.origin
                    }
                });

                // If you need the actual image data, you might need server-side support
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // This approach won't work due to CORS, but kept for reference
                const blob = await response.blob();
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

                setBase64Image(base64);
            } catch (err) {
                console.error('Logo fetch error:', err);
                setError(err);
            }
        }

        loadLogo();
    }, [schoolName]);

    if (error) {
        return <div>Error loading logo</div>;
    }

    return base64Image
        ? <img src={base64Image} alt={`${schoolName} Logo`} />
        : <div>Loading logo...</div>;
}