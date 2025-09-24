const Loading = () => {
    return (
        <div
            className="flex flex-col items-center justify-center"
            style={{ padding: 25 }}
        >
            <div className="text-center relative">
                <div
                    className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm flex flex-col items-center gap-5"
                    style={{ padding: 30 }}
                >
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        Loading...
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                        Connecting to the photo gallery
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loading;
