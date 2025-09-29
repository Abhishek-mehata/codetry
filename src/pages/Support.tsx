import Container from "../components/client/shared/Container"

function Support() {
  return (
    <Container className="px-6 md:px-0 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#172b4d' }}>
            DMT Support Hub
          </h1>
          <p className="text-xl" style={{ color: '#3f3d56' }}>
            Your Guide to Seamless Travel Bookings and Hosting
          </p>
        </div>

        {/* For Guests Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            For Guests
          </h2>

          {/* Registration and Account Setup */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
              Registration and Account Setup
            </h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 1: Visit DMT Website
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Go to dmttourism.com, click the "Login" tab (top-right corner) and then "Register"
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 2: Fill Account Form
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Enter your name, email, password and tick mark the (General) "Terms of use". Now, click "Register"
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 3: Verify Email
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Check your inbox for a verification link. Click to activate your account.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 4: Complete Your Profile
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Add a profile photo, phone number, and payment method
                </p>
              </div>
            </div>
          </div>

          {/* Searching and Booking */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
              Searching and Booking
            </h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 1: Search Listings
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Use the search bar to enter a destination, dates, and guests.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 2: Filter Results
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Refine by price, amenities, ratings, or service type (e.g., "Stays", "Onsite Events", "Online Events").
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 3: Review Details
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Click a listing to view photos, descriptions, cancellation policies, and reviews.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 4: Book & Pay
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Select dates, confirm guests, and proceed to payment by clicking "Request to Book" and paying the initial deposit amount for confirmed booking. You need to wait for the host's feedback. As soon as your request are reviewed directly by the host, you would receive a confirmation email and invoice.
                </p>
              </div>
            </div>
          </div>

          {/* Managing Bookings */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
              Managing Bookings
            </h3>
            <div className="bg-green-50 p-6 rounded-lg">
              <p style={{ color: '#3f3d56' }}>
                Access "My Bookings" to view/cancel bookings, message hosts, or request changes.
              </p>
            </div>
          </div>
        </section>

        {/* For Sellers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b border-[#172b4d] pb-4" style={{ color: '#172b4d' }}>
            For Sellers: Listing Hotels and Events
          </h2>

          {/* Seller Registration */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
              Registration and Seller Onboarding
            </h3>
            
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 1: Create a Seller Account
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Sign up regularly. You can switch to host after login (By default, you would be in "Guest" mode). Once you are in "Seller/Host" mode, now you can provide business details (name, tax ID, etc.) and proceed to create a new listing to promote your business.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 2: Verify Identity
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Upload government-issued ID and business license (if applicable).
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 3: Set Up Payout Method
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Link a bank account or PayPal under "Payout Settings"
                </p>
              </div>
            </div>
          </div>

          {/* Creating a Listing */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
              Creating a Listing
            </h3>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 1: Go to Dashboard
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Hover on "List on DMT" from your seller dashboard. Alternatively, you can also select the tab "Add Stays" or "Add Events" to add the required listing.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 2: Create Stays or Events
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2" style={{ color: '#172b4d' }}>Create Stays:</h5>
                    <p style={{ color: '#3f3d56' }}>
                      Click "Add Stays" or select the already created property. Add "New Room" and fill in the relevant information including title, description, location, capacity, amenities.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2" style={{ color: '#172b4d' }}>Create Events:</h5>
                    <p style={{ color: '#3f3d56' }}>
                      Add title, description, location, capacity, and amenities for Onsite/Online events.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 3: Pricing & Availability
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2" style={{ color: '#172b4d' }}>Stays:</h5>
                    <p style={{ color: '#3f3d56' }}>
                      Set nightly room rates on the properties or discounts for longer stays for better pricing strategy.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2" style={{ color: '#172b4d' }}>Events:</h5>
                    <p style={{ color: '#3f3d56' }}>
                      Set "per person" rates for Onsite and "per device" for Online events fees.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 4: Upload Media
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Add high-quality photos (min. 5) for better click rates (only photos allowed - no videos).
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#172b4d' }}>
                  Step 5: Submit for Approval
                </h4>
                <p style={{ color: '#3f3d56' }}>
                  Review and submit. Listings go live within 24-48 hours after moderation.
                </p>
              </div>
            </div>
          </div>

          {/* Managing Bookings and Earnings */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#172b4d' }}>
              Managing Bookings and Earnings
            </h3>
            <div className="bg-green-50 p-6 rounded-lg">
              <p style={{ color: '#3f3d56' }}>
                Use the "Calendar" to track reservations. View earnings and pending payouts in "Finance Hub".
              </p>
            </div>
          </div>
        </section>

        {/* Reservation Request Mechanism */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#172b4d' }}>
            Reservation Request Mechanism
          </h2>
          
          <div className="bg-indigo-50 p-6 rounded-lg mb-6">
            <p className="mb-4" style={{ color: '#3f3d56' }}>
              When a buyer submits a reservation request for your hotel or events, they pay an upfront deposit to secure the booking. These are the phases involved:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Request Received</h4>
                  <p style={{ color: '#3f3d56' }}>
                    You'll get an instant email/dashboard notification with the upfront deposit amount and remaining amount to be paid during check-in by the guest.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Review Details</h4>
                  <p style={{ color: '#3f3d56' }}>
                    Check dates, guest count, special requests, and pricing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Approve/Decline</h4>
                  <p style={{ color: '#3f3d56' }}>
                    Confirm within "24 hours". In order to improve your response rate, faster the response - better your hotels/events ranking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">4</span>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Confirmation</h4>
                  <p style={{ color: '#3f3d56' }}>
                    If approved, the booking is confirmed and finalized. For Stays and Onsite events, the remaining amount is paid during check-in.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">5</span>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: '#172b4d' }}>Post-Booking</h4>
                  <p style={{ color: '#3f3d56' }}>
                    Communicate via the platform's messaging system.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
              Why Manual Approval?
            </h3>
            <ul className="space-y-2">
              <li style={{ color: '#3f3d56' }}>• Flexibility to adjust pricing or terms for large groups</li>
              <li style={{ color: '#3f3d56' }}>• Avoid double-bookings by cross-checking availability</li>
            </ul>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#172b4d' }}>
            Pro Tips
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                For Buyers
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Always check cancellation policies before booking.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                For Sellers
              </h3>
              <div className="space-y-2">
                <p style={{ color: '#3f3d56' }}>
                  • Use SEO-friendly titles (e.g., "Luxury Beachfront Villa in Bali")
                </p>
                <p style={{ color: '#3f3d56' }}>
                  • Use high-quality photos to boost bookings by 40%
                </p>
                <p style={{ color: '#3f3d56' }}>
                  • Fill short and precise information for guests clarity and better SEO
                </p>
                <p style={{ color: '#3f3d56' }}>
                  • Always respond to requests promptly to maintain your vendor rating
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
              Security
            </h3>
            <p style={{ color: '#3f3d56' }}>
              Never share passwords or payment details outside the platform.
            </p>
          </div>
        </section>

        {/* Need Help */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#172b4d' }}>
            Need Help?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                FAQs
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Visit our FAQ page for quick answers
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Live Chat
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Click the chat icon (bottom-right) or WhatsApp
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#172b4d' }}>
                Email Support
              </h3>
              <p style={{ color: '#3f3d56' }}>
                support@dmttourism.com
              </p>
              <p className="mt-2 text-sm" style={{ color: '#3f3d56' }}>
                Vendors: vendors@dmttourism.com
              </p>
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#172b4d' }}>
            Video Tutorials
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#172b4d' }}>
                Getting Started for Buyers
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Complete guide to booking your first stay or event
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#172b4d' }}>
                Mastering Seller Dashboard
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Navigate your seller dashboard like a pro
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#172b4d' }}>
                Optimizing Your Listings
              </h3>
              <p style={{ color: '#3f3d56' }}>
                Tips and tricks to maximize your booking potential
              </p>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}

export default Support