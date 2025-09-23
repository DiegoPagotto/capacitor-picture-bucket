import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    isCompact: boolean;
    onTakePhoto: () => void;
}

function Header({ isCompact, onTakePhoto }: HeaderProps) {
    const headerClass = `sticky top-0 z-10 backdrop-blur-sm ${
        isCompact
            ? 'bg-black/40 shadow-lg border-b border-white/20 py-2'
            : 'bg-black/30 border-b border-white/10 py-16'
    } transition-all duration-300 ease-in-out`;

    const containerClass = `flex ${
        isCompact
            ? 'flex-row items-center justify-evenly gap-0'
            : 'flex-col items-center justify-center gap-6'
    } px-6 ${
        isCompact ? 'py-1' : 'py-8'
    } transition-all duration-300 ease-in-out`;

    const titleContainerClass = `${
        isCompact ? 'text-center flex items-center h-16' : 'text-center'
    } transition-all duration-300 ease-in-out`;

    const titleClass = `font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${
        isCompact
            ? 'text-xl mb-0 whitespace-nowrap'
            : 'text-4xl sm:text-6xl mb-3'
    } transition-all duration-300 ease-in-out`;

    const subtitleClass = `text-gray-300 text-lg ${
        isCompact ? 'opacity-0 -translate-y-2' : 'opacity-80 translate-y-0'
    } transition-all duration-300 ease-in-out`;

    const glowClass = `absolute -inset-3 rounded-full ${
        isCompact
            ? 'bg-blue-500/20 opacity-50 scale-75'
            : 'bg-purple-500/30 opacity-100 scale-110'
    } transition-all duration-300 ease-in-out`;

    const buttonClass = `group relative ${
        isCompact
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
    } text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden ${
        isCompact ? 'w-16 h-16' : 'w-16 h-16 sm:w-32 sm:h-32'
    } transition-all duration-300 ease-in-out`;

    const buttonContainerClass = `relative`;

    const iconClass = `relative z-10 ${
        isCompact ? 'text-xl' : 'text-4xl'
    } transition-all duration-300 ease-in-out`;

    return (
        <header className={headerClass}>
            <div className={containerClass}>
                <div className={titleContainerClass}>
                    <h1 className={titleClass}>Picture Bucket</h1>
                    {!isCompact && (
                        <p className={subtitleClass}>Capture your moments</p>
                    )}
                </div>
                <div className={buttonContainerClass}>
                    <div
                        className={glowClass}
                        style={{
                            filter: 'blur(20px)',
                        }}
                    ></div>
                    <button className={buttonClass} onClick={onTakePhoto}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                        <FontAwesomeIcon
                            icon={faCamera}
                            className={iconClass}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
