import Container from "../components/client/shared/Container"

function TrustAndSafety() {
  return (
    <Container className="px-6 md:px-0 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#172b4d' }}>
            Trust & Safety
          </h1>
          <p className="text-xl" style={{ color: '#3f3d56' }}>
            Your Security and Peace of Mind Are Our Top Priority
          </p>
        </div>

        {/* Our Commitment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Our Commitment to You
          </h2>
          
          <div className="bg-blue-50 p-8 rounded-lg mb-8">
            <p className="text-lg leading-relaxed" style={{ color: '#3f3d56' }}>
              At DMT Tourism, we believe that trust is the foundation of great travel experiences. 
              We've built comprehensive safety measures, verification systems, and support processes 
              to ensure every booking is secure and every interaction is protected.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#172b4d' }}>
                Verified Hosts
              </h3>
              <p style={{ color: '#3f3d56' }}>
                All hosts undergo identity verification and business license validation before listing.
              </p>
            </div>

            <div className="bg-white border-2 border-green-200 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#172b4d' }}>
                Secure Payments
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Bank-grade encryption protects all transactions with PCI DSS compliance.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-200 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#172b4d' }}>
                Quality Assurance
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Every listing is manually reviewed and approved within 24-48 hours of submission.
              </p>
            </div>
          </div>
        </section>

        {/* For Guests */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Guest Protection
          </h2>

          <div className="space-y-8">
            {/* Booking Safety */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                Safe Booking Process
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-1">✓</span>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Verified Listings</h4>
                      <p className="text-sm" style={{ color: '#3f3d56' }}>
                        All properties are manually verified for accuracy and legitimacy
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-1">✓</span>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Deposit Protection</h4>
                      <p className="text-sm" style={{ color: '#3f3d56' }}>
                        Your deposit is held securely until booking confirmation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-1">✓</span>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>24/7 Support</h4>
                      <p className="text-sm" style={{ color: '#3f3d56' }}>
                        Round-the-clock assistance for any booking concerns
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-1">✓</span>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Transparent Pricing</h4>
                      <p className="text-sm" style={{ color: '#3f3d56' }}>
                        No hidden fees - all costs displayed upfront
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Guidelines */}
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                Your Safety Guidelines
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>✅ DO's</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#3f3d56' }}>
                    <li>• Always communicate through DMT's messaging system</li>
                    <li>• Verify host identity and property details before arrival</li>
                    <li>• Read cancellation policies carefully before booking</li>
                    <li>• Report any suspicious activity immediately</li>
                    <li>• Keep copies of booking confirmations and receipts</li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>❌ DON'Ts</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#3f3d56' }}>
                    <li>• Never pay outside the DMT platform</li>
                    <li>• Don't share personal financial information</li>
                    <li>• Avoid wire transfers or cash payments for bookings</li>
                    <li>• Don't ignore red flags in host communication</li>
                    <li>• Never book properties without proper verification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Hosts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Host Protection & Standards
          </h2>

          <div className="space-y-8">
            {/* Verification Process */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                Host Verification Process
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">1</span>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Identity Verification</h4>
                    <p style={{ color: '#3f3d56' }}>
                      Government-issued ID verification, phone number confirmation, and email validation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">2</span>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Business Documentation</h4>
                    <p style={{ color: '#3f3d56' }}>
                      Business license validation, tax registration verification, and legal compliance check
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">3</span>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Property Verification</h4>
                    <p style={{ color: '#3f3d56' }}>
                      Ownership documentation, property inspection (for premium listings), and quality assessment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Responsibilities */}
            <div className="bg-yellow-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
                Host Responsibilities
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3" style={{ color: '#172b4d' }}>Property Standards</h4>
                  <ul className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                    <li>• Maintain accurate listing descriptions</li>
                    <li>• Ensure property cleanliness and safety</li>
                    <li>• Provide functional amenities as advertised</li>
                    <li>• Regular property maintenance and updates</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3" style={{ color: '#172b4d' }}>Guest Communication</h4>
                  <ul className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                    <li>• Respond to inquiries within 24 hours</li>
                    <li>• Provide clear check-in instructions</li>
                    <li>• Be available for guest assistance</li>
                    <li>• Handle complaints professionally</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Measures */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Platform Security
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Data Protection
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <p className="text-sm" style={{ color: '#3f3d56' }}>SSL/TLS encryption for all data transmission</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <p className="text-sm" style={{ color: '#3f3d56' }}>GDPR and CCPA compliance</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <p className="text-sm" style={{ color: '#3f3d56' }}>Regular security audits and penetration testing</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <p className="text-sm" style={{ color: '#3f3d56' }}>Secure data storage with backup systems</p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Payment Security
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <p className="text-sm" style={{ color: '#3f3d56' }}>PCI DSS Level 1 compliance</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <p className="text-sm" style={{ color: '#3f3d56' }}>Multi-factor authentication</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <p className="text-sm" style={{ color: '#3f3d56' }}>Fraud detection and prevention systems</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <p className="text-sm" style={{ color: '#3f3d56' }}>Secure payment processing partners</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dispute Resolution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Dispute Resolution
          </h2>

          <div className="bg-orange-50 p-8 rounded-lg">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                  Resolution Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">1</span>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Direct Communication</h4>
                      <p className="text-sm" style={{ color: '#3f3d56' }}>
                        Try to resolve the issue directly with the other party through our messaging system
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">2</span>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Report to DMT</h4>
                      <p className="text-sm" style={{ color: '#3f3d56' }}>
                        If direct resolution fails, report the issue to our Trust & Safety team within 48 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">3</span>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Investigation</h4>
                      <p className="text-sm" style={{ color: '#3f3d56' }}>
                        Our team reviews all evidence, communications, and documentation within 3-5 business days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">4</span>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Resolution</h4>
                      <p className="text-sm" style={{ color: '#3f3d56' }}>
                        Fair resolution based on platform policies, with potential refunds or account actions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                  Common Dispute Types
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Guest Issues</h4>
                    <ul className="text-sm space-y-1" style={{ color: '#3f3d56' }}>
                      <li>• Property not as described</li>
                      <li>• Cancellation disputes</li>
                      <li>• Cleanliness or safety concerns</li>
                      <li>• Host communication issues</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Host Issues</h4>
                    <ul className="text-sm space-y-1" style={{ color: '#3f3d56' }}>
                      <li>• Property damage claims</li>
                      <li>• Guest misconduct</li>
                      <li>• Payment disputes</li>
                      <li>• Review policy violations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Emergency Support
          </h2>

          <div className="bg-red-50 p-8 rounded-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2" style={{ color: '#172b4d' }}>
                24/7 Emergency Hotline
              </h3>
              <p className="text-lg font-medium" style={{ color: '#3f3d56' }}>
                For urgent safety concerns or emergencies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg text-center border-2 border-red-200">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">📞</span>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#172b4d' }}>Phone Support</h4>
                <p className="text-sm" style={{ color: '#3f3d56' }}>+977-1-XXXXXXX</p>
                <p className="text-xs mt-1" style={{ color: '#3f3d56' }}>Available 24/7</p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center border-2 border-red-200">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">💬</span>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#172b4d' }}>WhatsApp</h4>
                <p className="text-sm" style={{ color: '#3f3d56' }}>+977-98XXXXXXXX</p>
                <p className="text-xs mt-1" style={{ color: '#3f3d56' }}>Instant messaging</p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center border-2 border-red-200">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">📧</span>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#172b4d' }}>Emergency Email</h4>
                <p className="text-sm" style={{ color: '#3f3d56' }}>emergency@dmttourism.com</p>
                <p className="text-xs mt-1" style={{ color: '#3f3d56' }}>Priority response</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Standards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Community Standards
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-lg mb-6" style={{ color: '#3f3d56' }}>
              DMT Tourism is built on trust, respect, and community. We expect all users to follow our community standards:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4" style={{ color: '#172b4d' }}>✅ We Encourage</h3>
                <ul className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                  <li>• Honest and accurate listings</li>
                  <li>• Respectful communication</li>
                  <li>• Timely responses to messages</li>
                  <li>• Following local laws and regulations</li>
                  <li>• Constructive feedback and reviews</li>
                  <li>• Cultural sensitivity and inclusiveness</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4" style={{ color: '#172b4d' }}>❌ We Prohibit</h3>
                <ul className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                  <li>• Discrimination of any kind</li>
                  <li>• Fraudulent or misleading information</li>
                  <li>• Harassment or inappropriate behavior</li>
                  <li>• Circumventing platform policies</li>
                  <li>• Fake reviews or rating manipulation</li>
                  <li>• Illegal activities or property misuse</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Report Issues */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#172b4d' }}>
            Report Safety Concerns
          </h2>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-lg">
            <p className="text-lg mb-6" style={{ color: '#3f3d56' }}>
              If you encounter any safety concerns, policy violations, or suspicious activity, please report it immediately.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-red-200">
                <h3 className="font-semibold mb-4" style={{ color: '#172b4d' }}>How to Report</h3>
                <ul className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                  <li>• Use the "Report" button on listings or profiles</li>
                  <li>• Email: safety@dmttourism.com</li>
                  <li>• Call our 24/7 safety hotline</li>
                  <li>• Use the in-app reporting feature</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-red-200">
                <h3 className="font-semibold mb-4" style={{ color: '#172b4d' }}>What to Include</h3>
                <ul className="space-y-2 text-sm" style={{ color: '#3f3d56' }}>
                  <li>• Detailed description of the issue</li>
                  <li>• Screenshots or evidence (if available)</li>
                  <li>• Booking reference number</li>
                  <li>• User profiles involved</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="text-center bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#172b4d' }}>
            Your Safety is Our Priority
          </h2>
          <p className="text-lg mb-4" style={{ color: '#3f3d56' }}>
            We continuously improve our safety measures based on community feedback and industry best practices.
          </p>
          <p className="text-sm" style={{ color: '#3f3d56' }}>
            Last updated: August 2025 | For questions about this policy, contact: legal@dmttourism.com
          </p>
        </section>
      </div>
    </Container>
  )
}

export default TrustAndSafety