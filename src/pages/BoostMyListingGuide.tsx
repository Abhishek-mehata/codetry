import React from 'react';

interface BoostMyListingGuideProps {
    children?: React.ReactNode;
    className?: string;
}
interface DownloadSiteButtonProps {
    text?: string;
    imageSrc?: string;
    step: number;
    type?: "desktop" | "mobile";
}

// Container component (assuming similar structure)
const Container = ({ children, className }: BoostMyListingGuideProps) => (
    <div className={`container mx-auto ${className}`}>
        {children}
    </div>
);

function StepCard({ text, imageSrc, step, type }: DownloadSiteButtonProps) {
    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm">{step}</div>
                <h3 className="text-2xl font-semibold">{text}</h3></div>
            <img className={`${type == "desktop" ? "w-full" : "w-80"} rounded-md shadow-md mx-auto`} src={imageSrc} alt={imageSrc} />
        </div>
    )
}

function BoostListing() {
    return (
        <Container className="px-6 md:px-0 py-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: '#172b4d' }}>
                        Boost Your Visibility & Get More Customers
                    </h1>
                    <p className="text-xl mb-2" style={{ color: '#3f3d56' }}>
                        with <span className="font-bold text-2xl" style={{ color: '#172b4d' }}>Boosted Listing!</span>
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mt-6">
                        <p className="text-lg" style={{ color: '#3f3d56' }}>
                            Want more eyes on your <strong>Events</strong> or <strong>Stays</strong>? With <strong>Boosted Listing</strong>, your listings appear at the <strong>top of the homepage</strong>, giving you maximum exposure and helping you attract potential customers faster!
                        </p>
                    </div>
                </div>

                {/* Why Choose Boosted Listing */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
                        Why Choose Boosted Listing?
                    </h2>

                    <div className="grid md:grid-cols-1 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-start space-x-4">
                                <span className="text-green-500 text-2xl font-bold">✅</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#172b4d' }}>
                                        Higher Visibility
                                    </h3>
                                    <p style={{ color: '#3f3d56' }}>
                                        Your listing gets prime placement, making it the first thing customers see when they visit our platform.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-start space-x-4">
                                <span className="text-blue-500 text-2xl font-bold">✅</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#172b4d' }}>
                                        More Bookings & Sales
                                    </h3>
                                    <p style={{ color: '#3f3d56' }}>
                                        Increased visibility means more clicks, inquiries, and conversions. Transform views into actual bookings.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                            <div className="flex items-start space-x-4">
                                <span className="text-purple-500 text-2xl font-bold">✅</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#172b4d' }}>
                                        Stand Out from Competitors
                                    </h3>
                                    <p style={{ color: '#3f3d56' }}>
                                        Get ahead of other listings and capture customer attention instantly. Be the first choice customers see.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How Boosted Listing Works */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
                        How Boosted Listing Works
                    </h2>
                    <div className='flex flex-col gap-6'>

                        <StepCard type={"mobile"} step={1} text="Go to your Dashboard and select the Stays or Events listing you want to promote." imageSrc="" />
                        <StepCard type={"mobile"} step={2} text="Look for the Boost button and click to activate promotion." imageSrc="/screenshots/boost-listing/boost-1.png" />
                        <StepCard type={"desktop"} step={3} text="Choose how long you want your listing to be boosted" imageSrc="/screenshots/boost-listing/boost-2.png" />
                        <StepCard type={"mobile"} step={4} text="Verify your selection to ensure your listing is successfully promoted." imageSrc="/screenshots/boost-listing/boost-3.png" />
                        <StepCard type={"desktop"} step={5} text="Visit the Promoted Listings section on our homepage to see your boosted Stay or Event in action!" imageSrc="/screenshots/boost-listing/boost-4.png" />
                    </div>
                </section>
            </div>
        </Container>
    )
}

export default BoostListing;