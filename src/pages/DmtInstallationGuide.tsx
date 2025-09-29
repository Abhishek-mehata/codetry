interface DownloadSiteButtonProps {
    text?: string;
    imageSrc?: string;
    step: number;
    type?: "desktop" | "mobile";
}

function StepCard({ text, imageSrc, step, type }:DownloadSiteButtonProps) {
    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm">{step}</div>
            <h3 className="text-2xl font-semibold">{text}</h3></div>
            <img className={`${type == "desktop" ? "w-full" : "w-80"} rounded-md shadow-md mx-auto`} src={imageSrc} alt={imageSrc} />
        </div>
    )
}

function DmtInstallationGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-br to-fade-purple py-8">
            <div className="max-w-4xl mx-auto overflow-hidden">
                {/* Header */}
                <div className=" p-section-padding smm:p-sm-section-padding text-center">
                    <h1 className="text-4xl smm:text-3xl sms:text-2xl font-bold mb-4 font-popins">
                        DMT Installation Guide
                    </h1>
                    <p className="text-xl smm:text-lg opacity-90 font-popins">
                        Your Step-by-Step Guide to Seamless Travel Bookings
                    </p>
                </div>
                {/* Body Mobile */}
                <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4">Mobile</h2>
                <div className="flex flex-col gap-8">
                    <StepCard type={"mobile"} step={1} text="Visit our website in your browser." imageSrc="/screenshots/install-dmt/mobile-1.jpg" />
                    <StepCard type={"mobile"} step={2} text="Open the browser menu. and Tap Add to Home Screen." imageSrc="/screenshots/install-dmt/mobile-2.jpg" />
                    <StepCard type={"mobile"} step={3} text="Install DMT on your device." imageSrc="/screenshots/install-dmt/mobile-4.jpg" />
                    <StepCard type={"mobile"} step={4} text="Navigate DMT on your device." imageSrc="/screenshots/install-dmt/mobile-5.jpg" />
                    <StepCard type={"mobile"} step={5} text="Open the app and enjoy seamless travel bookings!" imageSrc="/screenshots/install-dmt/mobile-6.jpg" />
                </div>
                {/* Body Mobile */}
                <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4">Desktop</h2>
                <div className="flex flex-col gap-6">
                    <StepCard type={"desktop"} step={1} text="Visit our website." />
                    <StepCard type={"desktop"} step={2} text="Go to the Install DMT section and download the shortcut" imageSrc="/screenshots/install-dmt/desktop-1.png" />
                    <StepCard type={"mobile"} step={3} text="Locate the shortcut file in your downloads." imageSrc="/screenshots/install-dmt/desktop-2.png" />
                    <StepCard type={"desktop"} step={4} text="Open the app and enjoy seamless travel bookings!" imageSrc="/screenshots/install-dmt/desktop-3.png" />
                </div>
            </div>
        </div>
    )
}

export default DmtInstallationGuide