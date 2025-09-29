

const LoadingAnimation = () => {
    return (
        <div>
            <div className="w-full md:w-fit h-[250px] md:h-[300px] flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-purple-200"></div>
                <p className="text-sm text-gray-600 text-center max-w-xs">
                    Please wait while the resources are being loaded...
                </p>
            </div>
        </div>
    )
}

export default LoadingAnimation