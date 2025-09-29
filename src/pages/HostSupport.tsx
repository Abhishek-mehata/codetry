// Container component (assuming similar structure)
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => (
  <div className={`container mx-auto ${className ?? ''}`}>
    {children}
  </div>
);

function HostSupport() {
  return (
    <Container className="px-6 md:px-0 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#172b4d' }}>
            DMT Host Support Hub
          </h1>
          <p className="text-xl" style={{ color: '#3f3d56' }}>
            Your Complete Guide to Onboarding, Listings, and Managing Reservations
          </p>
        </div>

        {/* Host Registration & Onboarding */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Host Registration & Onboarding
          </h2>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
              Getting Started as a Host
            </h3>
            
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 1: Switch to Host Mode
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Sign up regularly at dmttourism.com. You can switch to host after login (By default, you would be in "Guest" mode). Once you are in "Seller/Host" mode, you can provide business details and create listings.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 2: Submit Business Details
                </h4>
                <div style={{ color: '#3f3d56' }}>
                  <p className="mb-2">Fill in your business information:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Legal business name</li>
                    <li>Tax ID (if applicable)</li>
                    <li>Contact person details</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 3: Identity Verification
                </h4>
                <div style={{ color: '#3f3d56' }}>
                  <p className="mb-2">Upload required documents:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Government-issued ID (passport, driver's license)</li>
                    <li>Business license/certificate (for hotels/tour operators/event organizers)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 4: Set Up Payout Method
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Navigate to Finance → Payout Settings and link a bank account, PayPal, or other payment method for receiving payments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creating Listings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Creating & Managing Listings
          </h2>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
              Add New Listings
            </h3>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 1: Access Dashboard
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  From your host dashboard, hover on "List on DMT" or directly select "Add Stays" or "Add Events" based on your listing type.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 2: Choose Your Listing Type
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-medium mb-2" style={{ color: '#172b4d' }}>For Stays/Hotels:</h5>
                    <ul className="text-sm space-y-1" style={{ color: '#3f3d56' }}>
                      <li>• Click "Add Stays" to create property</li>
                      <li>• Choose property type (hotel, villa, etc.)</li>
                      <li>• Add "New Room" with details</li>
                      <li>• Include amenities (WiFi, pool, breakfast)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-medium mb-2" style={{ color: '#172b4d' }}>For Events:</h5>
                    <ul className="text-sm space-y-1" style={{ color: '#3f3d56' }}>
                      <li>• Click "Add Event" (Online/Onsite)</li>
                      <li>• Add activity type and description</li>
                      <li>• Set duration and meeting point</li>
                      <li>• Include relevant information</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 3: Set Pricing & Availability
                </h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-medium mb-2" style={{ color: '#172b4d' }}>Stays Pricing:</h5>
                    <p style={{ color: '#3f3d56' }}>
                      Set nightly room rates and offer discounts for longer stays. Consider seasonal pricing strategies.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-medium mb-2" style={{ color: '#172b4d' }}>Events Pricing:</h5>
                    <p style={{ color: '#3f3d56' }}>
                      Set "per person" rates for Onsite events and "per device" rates for Online events.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 4: Upload High-Quality Media
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Add minimum 5 high-quality photos for better click rates. Note: Only photos are allowed, no videos.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 5: Submit for Approval
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Review all details and submit your listing. It will go live within 24-48 hours after moderation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reservation Management */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Reservation Request Management
          </h2>

          <div className="bg-indigo-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
              How Reservation Requests Work
            </h3>
            <p className="mb-6" style={{ color: '#3f3d56' }}>
              When guests submit a reservation request, they pay an upfront deposit to secure the booking. Here's the complete process:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
                <div>
                  <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Request Received</h4>
                  <p style={{ color: '#3f3d56' }}>
                    You'll receive an instant email and dashboard notification showing the upfront deposit amount and remaining balance to be paid during check-in.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
                <div>
                  <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Review Details</h4>
                  <p style={{ color: '#3f3d56' }}>
                    Check booking dates, guest count, special requests, and pricing details carefully.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
                <div>
                  <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Approve or Decline</h4>
                  <p style={{ color: '#3f3d56' }}>
                    <strong>Respond within 24 hours</strong> to maintain your ranking. Faster responses improve your listing's visibility.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">4</span>
                <div>
                  <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Confirmation</h4>
                  <p style={{ color: '#3f3d56' }}>
                    If approved, booking is confirmed. For Stays and Onsite events, remaining payment is collected during check-in.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">5</span>
                <div>
                  <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Post-Booking Communication</h4>
                  <p style={{ color: '#3f3d56' }}>
                    Use the platform's messaging system to communicate with guests and share pre-visit guides.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
              Benefits of Manual Approval
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 text-xl">✓</span>
                <p style={{ color: '#3f3d56' }}>
                  Flexibility to adjust pricing or terms for large groups
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 text-xl">✓</span>
                <p style={{ color: '#3f3d56' }}>
                  Avoid double-bookings by cross-checking availability
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
              Managing Your Requests
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Review Requests</h4>
                <p style={{ color: '#3f3d56' }}>
                  Go to "Reservations" → "Pending Requests" to check guest details, dates, and special notes.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Approve or Decline</h4>
                <p style={{ color: '#3f3d56' }}>
                  When approving, add optional comments. When declining, always provide a reason.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2" style={{ color: '#172b4d' }}>Track Confirmed Bookings</h4>
                <p style={{ color: '#3f3d56' }}>
                  Monitor confirmed bookings in "Upcoming Stays/Events" and use "Send Pre-Visit Guide" for instructions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Host Tools & Analytics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            Host Tools & Analytics
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Calendar Management
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Use the "Calendar" to track reservations and sync with external calendars to avoid conflicts.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Finance Hub
              </h3>
              <p style={{ color: '#3f3d56' }}>
                View earnings and pending payouts. Track your performance analytics including views, bookings, and revenue.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Bulk Operations
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Update pricing and availability for multiple listings at once to save time.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips for Hosts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#172b4d' }}>
            Pro Tips for Successful Hosting
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Optimize Your Listings
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-500 text-lg">•</span>
                  <p style={{ color: '#3f3d56' }}>
                    Use high-quality photos to boost bookings by 40%
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-500 text-lg">•</span>
                  <p style={{ color: '#3f3d56' }}>
                    Write SEO-friendly titles (e.g., "Luxury Beachfront Villa in Bali")
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-500 text-lg">•</span>
                  <p style={{ color: '#3f3d56' }}>
                    Keep descriptions short and precise for better guest clarity and SEO
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Maintain High Standards
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-lg">•</span>
                  <p style={{ color: '#3f3d56' }}>
                    Always respond to requests promptly to maintain your vendor rating
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-lg">•</span>
                  <p style={{ color: '#3f3d56' }}>
                    Respond within 24 hours to improve your listing's ranking
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-lg">•</span>
                  <p style={{ color: '#3f3d56' }}>
                    Use the messaging system for all guest communications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#172b4d' }}>
            Host Support Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Contact Support
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">📧</span>
                  <div>
                    <p className="font-medium" style={{ color: '#172b4d' }}>Email</p>
                    <p style={{ color: '#3f3d56' }}>vendors@dmttourism.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">💬</span>
                  <div>
                    <p className="font-medium" style={{ color: '#172b4d' }}>Live Chat</p>
                    <p style={{ color: '#3f3d56' }}>Available 24/7 via WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Resources & Guides
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">📋</span>
                  <p style={{ color: '#3f3d56' }}>Host Onboarding Checklist (PDF)</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">🎥</span>
                  <p style={{ color: '#3f3d56' }}>Video Tutorial: Mastering Seller Dashboard</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">📊</span>
                  <p style={{ color: '#3f3d56' }}>Dynamic Pricing Strategies Guide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
              Important Reminder
            </h3>
            <p style={{ color: '#3f3d56' }}>
              <strong>Never share passwords or payment details outside the platform.</strong> All financial transactions and communications should happen through DMT Tourism's secure platform.
            </p>
          </div>
        </section>
      </div>
    </Container>
  )
}

export default HostSupport;