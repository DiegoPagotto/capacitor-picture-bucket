import { useEffect, useState } from 'react';
import { usePhotoGallery } from './hooks/usePhotoGallery';
import PhotoGrid from './components/PhotoGrid';
import Header from './components/Header';
import './config/firebaseAuth';

function App() {
    const { photos, takePhoto } = usePhotoGallery();
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsCompact(window.scrollY > 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Header isCompact={isCompact} onTakePhoto={takePhoto} />
            <main className="relative z-0 pb-8 pt-4">
                <div className="flex justify-center items-center mx-auto">
                    <PhotoGrid photos={photos} />
                </div>
            </main>
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-60">
                <div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full animate-pulse"
                    style={{ filter: 'blur(60px)' }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full animate-pulse"
                    style={{ filter: 'blur(80px)', animationDelay: '1s' }}
                ></div>
            </div>
        </div>
    );
}

export default App;
