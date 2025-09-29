import Container from "../components/client/shared/Container"

function VacationGuide() {
    return (
        <Container className="px-6 md:px-0 py-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: '#172b4d' }}>
                        Your Ultimate Vacation Guide
                    </h1>
                    <p className="text-xl" style={{ color: '#3f3d56' }}>
                        Expert Tips, Hidden Gems, and Everything You Need for Perfect Travel Experiences
                    </p>
                </div>

                {/* Planning Your Trip */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
                        Planning Your Perfect Trip
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                                Before You Book
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-1">1</span>
                                    <div>
                                        <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Research Your Destination</h4>
                                        <p className="text-sm" style={{ color: '#3f3d56' }}>
                                            Check weather patterns, local customs, visa requirements, and seasonal events
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-1">2</span>
                                    <div>
                                        <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Set Your Budget</h4>
                                        <p className="text-sm" style={{ color: '#3f3d56' }}>
                                            Plan for accommodation, meals, activities, transportation, and emergency funds
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-1">3</span>
                                    <div>
                                        <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Book Early for Best Deals</h4>
                                        <p className="text-sm" style={{ color: '#3f3d56' }}>
                                            Secure accommodations 2-3 months ahead for popular destinations
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                                Essential Travel Documents
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <p className="text-sm" style={{ color: '#3f3d56' }}>Valid passport (6+ months remaining)</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <p className="text-sm" style={{ color: '#3f3d56' }}>Visa or travel permits (if required)</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <p className="text-sm" style={{ color: '#3f3d56' }}>Travel insurance documents</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <p className="text-sm" style={{ color: '#3f3d56' }}>Vaccination certificates</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <p className="text-sm" style={{ color: '#3f3d56' }}>Booking confirmations</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <p className="text-sm" style={{ color: '#3f3d56' }}>Emergency contact information</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Budget Planning */}
                    <div className="bg-yellow-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                            Smart Budget Planning
                        </h3>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white text-2xl">🏨</span>
                                </div>
                                <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Accommodation</h4>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>35-40% of budget</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white text-2xl">🍽️</span>
                                </div>
                                <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Food & Dining</h4>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>25-30% of budget</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white text-2xl">🎯</span>
                                </div>
                                <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Activities</h4>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>20-25% of budget</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white text-2xl">🚗</span>
                                </div>
                                <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Transportation</h4>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>10-15% of budget</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Destination Types */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
                        Choose Your Adventure
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-b from-blue-100 to-blue-50 p-6 rounded-lg">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl">🏖️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#172b4d' }}>
                                Beach & Coastal
                            </h3>
                            <div className="space-y-3">
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Best For:</strong> Relaxation, water sports, romantic getaways
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Activities:</strong> Snorkeling, surfing, beach volleyball, sunset cruises
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Pack:</strong> Sunscreen, swimwear, light clothing, waterproof bag
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Season:</strong> Year-round, avoid monsoon periods
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-green-100 to-green-50 p-6 rounded-lg">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl">⛰️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#172b4d' }}>
                                Mountain & Adventure
                            </h3>
                            <div className="space-y-3">
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Best For:</strong> Hiking, adventure sports, nature lovers
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Activities:</strong> Trekking, camping, rock climbing, wildlife watching
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Pack:</strong> Hiking boots, warm layers, rain gear, first aid kit
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Season:</strong> Spring to autumn for most regions
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-purple-100 to-purple-50 p-6 rounded-lg">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl">🏛️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#172b4d' }}>
                                Cultural & Historic
                            </h3>
                            <div className="space-y-3">
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Best For:</strong> History buffs, cultural immersion, learning
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Activities:</strong> Museum visits, guided tours, local festivals, cooking classes
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Pack:</strong> Comfortable walking shoes, modest clothing, camera
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Season:</strong> Shoulder seasons for fewer crowds
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Travel Tips */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
                        Expert Travel Tips
                    </h2>

                    <div className="space-y-8">
                        {/* Packing Tips */}
                        <div className="bg-indigo-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                                Smart Packing Strategies
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-medium mb-4" style={{ color: '#172b4d' }}>Essential Items</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Portable charger and universal adapter</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>First aid kit with prescription medications</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Copies of important documents (digital & physical)</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Travel-sized toiletries in TSA-approved containers</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Comfortable walking shoes and flip-flops</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-4" style={{ color: '#172b4d' }}>Packing Hacks</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Roll clothes instead of folding to save 30% space</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Use packing cubes for organization</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Pack one complete outfit in carry-on</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Leave 25% space for souvenirs</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            <p className="text-sm" style={{ color: '#3f3d56' }}>Wear heaviest items while traveling</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Safety Tips */}
                        <div className="bg-red-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                                Stay Safe While Traveling
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3" style={{ color: '#172b4d' }}>Before You Go</h4>
                                    <ul className="space-y-1 text-sm" style={{ color: '#3f3d56' }}>
                                        <li>• Research local laws and customs</li>
                                        <li>• Register with your embassy</li>
                                        <li>• Share itinerary with family/friends</li>
                                        <li>• Check travel advisories</li>
                                        <li>• Get comprehensive travel insurance</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3" style={{ color: '#172b4d' }}>While Traveling</h4>
                                    <ul className="space-y-1 text-sm" style={{ color: '#3f3d56' }}>
                                        <li>• Keep valuables in hotel safe</li>
                                        <li>• Use official transportation only</li>
                                        <li>• Stay aware of your surroundings</li>
                                        <li>• Avoid displaying expensive items</li>
                                        <li>• Keep emergency contacts handy</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3" style={{ color: '#172b4d' }}>Health Precautions</h4>
                                    <ul className="space-y-1 text-sm" style={{ color: '#3f3d56' }}>
                                        <li>• Drink bottled or filtered water</li>
                                        <li>• Eat at reputable establishments</li>
                                        <li>• Carry hand sanitizer</li>
                                        <li>• Protect against sun exposure</li>
                                        <li>• Know local emergency numbers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Money Matters */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
                        Money & Payment Tips
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                                Currency & Exchange
                            </h3>
                            <div className="space-y-3">
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Best Exchange Rates:</strong> Local banks and official exchange counters
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Avoid:</strong> Airport exchanges and hotel currency services
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>ATM Tips:</strong> Use bank ATMs, inform your bank of travel plans
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Cash vs Card:</strong> Carry some cash for small vendors and tips
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                                Budgeting on the Road
                            </h3>
                            <div className="space-y-3">
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Track Expenses:</strong> Use travel apps or keep daily receipts
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Save Money:</strong> Eat local street food, use public transport
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Emergency Fund:</strong> Keep 20% extra for unexpected expenses
                                </p>
                                <p className="text-sm" style={{ color: '#3f3d56' }}>
                                    <strong>Tipping Guide:</strong> Research local tipping customs beforehand
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seasonal Travel Guide */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
                        Best Times to Travel
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-pink-50 p-6 rounded-lg">
                            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-lg">🌸</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: '#172b4d' }}>
                                Spring (Mar-May)
                            </h3>
                            <div className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                                <p><strong>Pros:</strong> Mild weather, blooming flowers, fewer crowds</p>
                                <p><strong>Cons:</strong> Unpredictable weather, higher prices in Europe</p>
                                <p><strong>Best For:</strong> Japan, Europe, Mediterranean</p>
                            </div>
                        </div>

                        <div className="bg-orange-50 p-6 rounded-lg">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-lg">☀️</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: '#172b4d' }}>
                                Summer (Jun-Aug)
                            </h3>
                            <div className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                                <p><strong>Pros:</strong> Perfect beach weather, long days, festivals</p>
                                <p><strong>Cons:</strong> Peak prices, crowds, extreme heat</p>
                                <p><strong>Best For:</strong> Scandinavia, Russia, Northern Europe</p>
                            </div>
                        </div>

                        <div className="bg-amber-50 p-6 rounded-lg">
                            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-lg">🍂</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: '#172b4d' }}>
                                Autumn (Sep-Nov)
                            </h3>
                            <div className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                                <p><strong>Pros:</strong> Pleasant temperatures, beautiful foliage, harvest season</p>
                                <p><strong>Cons:</strong> Shorter days, rainy weather</p>
                                <p><strong>Best For:</strong> India, Nepal, East Coast USA</p>
                            </div>
                        </div>

                        <div className="bg-cyan-50 p-6 rounded-lg">
                            <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-lg">❄️</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: '#172b4d' }}>
                                Winter (Dec-Feb)
                            </h3>
                            <div className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                                <p><strong>Pros:</strong> Low prices, winter sports, fewer tourists</p>
                                <p><strong>Cons:</strong> Cold weather, limited daylight, closures</p>
                                <p><strong>Best For:</strong> Southeast Asia, Australia, South America</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Local Experiences */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
                        Immerse Yourself Like a Local
                    </h2>

                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-lg mb-8">
                        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                            Authentic Travel Experiences
                        </h3>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-medium mb-3" style={{ color: '#172b4d' }}>🍜 Food Culture</h4>
                                <ul className="space-y-1 text-sm" style={{ color: '#3f3d56' }}>
                                    <li>• Take cooking classes with locals</li>
                                    <li>• Visit traditional markets</li>
                                    <li>• Try street food (safely)</li>
                                    <li>• Join food tours</li>
                                    <li>• Learn local dining etiquette</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-3" style={{ color: '#172b4d' }}>🎭 Cultural Activities</h4>
                                <ul className="space-y-1 text-sm" style={{ color: '#3f3d56' }}>
                                    <li>• Attend local festivals</li>
                                    <li>• Visit community centers</li>
                                    <li>• Take language classes</li>
                                    <li>• Join cultural workshops</li>
                                    <li>• Stay with local families</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-3" style={{ color: '#172b4d' }}>🚌 Transportation</h4>
                                <ul className="space-y-1 text-sm" style={{ color: '#3f3d56' }}>
                                    <li>• Use public transportation</li>
                                    <li>• Rent bicycles</li>
                                    <li>• Walk through neighborhoods</li>
                                    <li>• Take local buses</li>
                                    <li>• Hire local guides</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-purple-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                                Responsible Tourism
                            </h3>
                            <div className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                                <p>• Respect local customs and traditions</p>
                                <p>• Support local businesses and artisans</p>
                                <p>• Minimize environmental impact</p>
                                <p>• Learn basic phrases in local language</p>
                                <p>• Be mindful of photography etiquette</p>
                                <p>• Contribute to community projects</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                                Digital Nomad Tips
                            </h3>
                            <div className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                                <p>• Check WiFi speeds before booking</p>
                                <p>• Find co-working spaces</p>
                                <p>• Consider time zone differences</p>
                                <p>• Pack lightweight tech equipment</p>
                                <p>• Have backup internet options</p>
                                <p>• Join digital nomad communities</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Container>)
}
export default VacationGuide;