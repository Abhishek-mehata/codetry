interface StepCardProps {
  stepNumber: string | number;
  title: string;
  description: string;
  screenshotText: string;
  delay?: number;
}

interface FlowStepProps {
  icon: string;
  title: string;
  description: string;
  screenshotText: string;
  reverse?: boolean;
}

interface TipCardProps {
  icon: string;
  title: string;
  text: string;
}

interface SectionHeaderProps {
  number: string;
  title: string;
}
const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description, screenshotText, delay = 0 }) => (
  <div
    className="rounded-2xl p-6 border-l-4 border-primary transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm">
        {stepNumber}
      </div>
      <h3 className="text-xl font-semibold text-dark-purple font-popins">{title}</h3>
    </div>
    <p className="text-para leading-relaxed mb-5">{description}</p>
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center text-blue-600 font-medium relative overflow-hidden group-hover:border-primary transition-colors duration-300">
        <img src={screenshotText} alt={screenshotText} />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>
  </div>
);
const FlowStep: React.FC<FlowStepProps> = ({ icon, title, description, screenshotText, reverse = false }) => (
  <div className={`flex items-center gap-8 p-6 bg-white rounded-2xl shadow-lg border-l-4 ${reverse ? 'flex-row-reverse border-r-4 border-l-0 border-r-primary' : 'border-primary'} hover:shadow-xl transition-all duration-300 scc:flex-col scc:text-center`}>
    <div className="flex-1">
      <h3 className="text-dark-purple mb-4 text-xl font-semibold font-popins flex items-center gap-3 scc:justify-center">
        <span className="text-2xl">{icon}</span>
        {title}
      </h3>
      <p className="text-para leading-relaxed">{description}</p>
    </div>
    <div className="flex-none scc:w-full">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 rounded-xl h-full flex flex-col items-center justify-center text-blue-600 font-medium hover:border-primary transition-colors duration-300">
        <img src={screenshotText} alt={screenshotText}/>
      </div>
    </div>
  </div>
);

const TipCard: React.FC<TipCardProps> = ({ icon, title, text }) => (
  <div className="p-6 rounded-xl text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
    <div className="text-3xl mb-3">{icon}</div>
    <h4 className="font-semibold text-dark-purple mb-2 font-popins">{title}</h4>
    <p className="text-para text-sm">{text}</p>
  </div>
);

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title }) => (
  <h2 className="text-3xl text-dark-purple mb-8 flex items-center gap-4 font-popins font-bold">
    <div className="bg-gradient-to-r from-primary to-light-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
      {number}
    </div>
    {title}
  </h2>
);
const HowBookingWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br to-fade-purple py-8">
      <div className="max-w-7xl mx-auto  overflow-hidden">
        {/* Header */}
        <div className="p-section-padding smm:p-sm-section-padding text-center">
          <h1 className="text-4xl smm:text-3xl sms:text-2xl font-bold mb-4 font-popins">
            DMT Tourism Booking Guide
          </h1>
          <p className="text-xl smm:text-lg opacity-90 font-popins">
            Your Step-by-Step Guide to Seamless Travel Bookings
          </p>
        </div>

        <div className="p-section-padding smm:p-sm-section-padding">
          {/* Registration Section */}
          <div className="mb-16">
            <SectionHeader number="A1" title="Registration and Account Setup" />

            <div className="grid grid-cols-1 gap-8 mt-8">
              <StepCard
                stepNumber="1"
                title="Visit DMT Website"
                description="Go to dmttourism.com, click the 'Login' tab (top-right corner) and then 'Register'"
                screenshotText="/screenshots/dmtwebsite.png"
                delay={100}
              />

              <StepCard
                stepNumber="2"
                title="Fill Account Form"
                description="Enter your name, email, password and tick mark the (General) 'Terms of use'. Now, click 'Register'"
                screenshotText="/screenshots/register.png"
                delay={200}
              />

              <StepCard
                stepNumber="3"
                title="Verify Email"
                description="Check your inbox for a verification link. Click to activate your account."
                screenshotText="/screenshots/verifyEmail.png"
                delay={300}
              />

              <StepCard
                stepNumber="4"
                title="Complete Profile"
                description="Add a profile photo, phone number, and payment method"
                screenshotText="/screenshots/updateProfile.png"
                delay={400}
              />
            </div>
          </div>

          {/* Booking Process Section */}
          <div className="mb-16">
            <SectionHeader number="A2" title="Searching and Booking Process" />

            <div className="space-y-6 mt-8">
              <FlowStep
                icon="🔍"
                title="Search Listings"
                description="Use the search bar to enter a destination, dates, and guests. Our smart search will help you find the perfect accommodation or experience."
                screenshotText="/screenshots/filter.png"
              />

              <div className="text-center text-3xl text-primary py-4">
                <div className="animate-bounce">↓</div>
              </div>

              <FlowStep
                icon="🎛️"
                title="Filter Results"
                description="Refine by or service type (e.g., 'Stays', 'Onsite Events', 'Online Events')."
                screenshotText="/screenshots/filterChoose.png"
                reverse={true}
              />

              <div className="text-center text-3xl text-primary py-4">
                <div className="animate-bounce">↓</div>
              </div>

              <FlowStep
                icon="📋"
                title="Review Details"
                description="Click a listing to view photos, descriptions, cancellation policies, and reviews from other guests."
                screenshotText="/screenshots/details.png"
              />

              <div className="text-center text-3xl text-primary py-4">
                <div className="animate-bounce">↓</div>
              </div>

              <FlowStep
                icon="💳"
                title="Book & Pay"
                description="Select dates, confirm guests, and proceed to payment by clicking 'Request to Book' and paying the initial deposit amount. Wait for host's confirmation."
                screenshotText="/screenshots/checkout.png"
                reverse={true}
              />
            </div>
          </div>

          {/* Booking Confirmation Highlight */}
          <div className="bg-gradient-to-r from-warning/20 to-success/20 border-l-4 border-warning rounded-2xl p-8 mb-16">
            <h3 className="text-xl font-semibold text-dark-purple mb-4 flex items-center gap-3 font-popins">
              <span className="text-2xl">🎯</span>
              How the Booking Confirmation Works
            </h3>
            <p className="text-para leading-relaxed">
              After you submit your booking request and pay the deposit, you need to wait for the host's feedback.
              As soon as your request is reviewed by the host, you'll receive a confirmation email and invoice.
              The host has 24 hours to respond to maintain their ranking on our platform.
            </p>
          </div>

          {/* Managing Bookings Section */}
          <div className="mb-16">
            <SectionHeader number="A3" title="Managing Your Bookings" />

            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl p-8 border-l-4 border-primary">
                <div className="flex items-center gap-4 mb-4 smm:flex-col smm:text-center">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                    📅
                  </div>
                  <h3 className="text-xl font-semibold text-dark-purple font-popins">
                    My Bookings Dashboard
                  </h3>
                </div>
                <p className="text-para leading-relaxed mb-6">
                  Access "My Bookings" to view/cancel bookings, message hosts, or request changes.
                  Stay connected with your hosts and manage all your travel plans in one place.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 rounded-xl h-48 flex flex-col items-center justify-center text-blue-600 font-medium">
                  <img src="/screenshots/reservation.png" alt="My Bookings Dashboard" />
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tips Section */}
          <div className="mb-16">
            <SectionHeader number="💡" title="Pro Tips for Better Booking Experience" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <TipCard
                icon="📋"
                title="Check Policies"
                text="Always review cancellation policies before booking"
              />

              <TipCard
                icon="💬"
                title="Communicate"
                text="Use the messaging system to clarify special requests"
              />

              <TipCard
                icon="🔒"
                title="Stay Secure"
                text="Never share passwords or payment details outside the platform"
              />

              <TipCard
                icon="⭐"
                title="Leave Reviews"
                text="Help other travelers by sharing your experience"
              />
            </div>
          </div>

          {/* Support Section */}
          <div className="border-l-4 border-success rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-dark-purple mb-4 font-popins">
              Need Help? We're Here for You!
            </h3>
            <p className="text-para leading-relaxed mb-6">
              Get instant support through multiple channels
            </p>
            <div className="flex justify-center gap-8 flex-wrap smm:gap-4 smm:text-sm">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span><strong>Email:</strong> support@dmttourism.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span><strong>WhatsApp:</strong>+977 909809768086</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowBookingWorks;