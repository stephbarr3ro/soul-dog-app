import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/src/components/Layout';
import { ChevronLeft } from 'lucide-react';

const POLICIES: Record<string, { title: string; content: string }> = {
  privacy: {
    title: 'Privacy Policy',
    content: `
      <p>At Soul Dog Stories, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.</p>
      
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you place an order. We also collect information about your customization choices (child names, dog breeds, etc.) to fulfill your personalized book order.</p>
      
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to process and fulfill your orders, communicate with you about your orders, send you marketing communications (with your consent), and improve our services.</p>
      
      <h2>Information Sharing</h2>
      <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and fulfilling orders.</p>
      
      <h2>Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
      
      <h2>Cookies</h2>
      <p>We use cookies to enhance your browsing experience. You can control cookie settings through your browser preferences.</p>
      
      <h2>Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at support@souldogstories.com.</p>
    `
  },
  terms: {
    title: 'Terms of Service',
    content: `
      <p>By accessing and using Soul Dog Stories, you accept and agree to be bound by the terms and provisions of this agreement.</p>
      
      <h2>Products and Services</h2>
      <p>Soul Dog Stories creates personalized children's books featuring your child and their dog. All books are made to order and are non-refundable once production has begun.</p>
      
      <h2>Order Process</h2>
      <p>Orders are confirmed once payment is received. Production begins immediately after confirmation. Please ensure all customization details are correct before submitting your order.</p>
      
      <h2>Intellectual Property</h2>
      <p>All content on this website, including illustrations, text, and designs, are the property of Soul Dog Stories and are protected by copyright law.</p>
      
      <h2>Limitation of Liability</h2>
      <p>Soul Dog Stories shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.</p>
      
      <h2>Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of the updated terms.</p>
      
      <h2>Contact</h2>
      <p>For questions about these terms, contact us at support@souldogstories.com.</p>
    `
  },
  shipping: {
    title: 'Shipping Policy',
    content: `
      <p>Soul Dog Stories ships personalized books worldwide. Please review our shipping policy below.</p>
      
      <h2>Production Time</h2>
      <p>Each book is custom-made to order. Please allow 7-10 business days for production before shipment.</p>
      
      <h2>Shipping Times</h2>
      <p><strong>United States:</strong> 3-7 business days after production<br/>
      <strong>Canada:</strong> 7-14 business days after production<br/>
      <strong>International:</strong> 14-21 business days after production</p>
      
      <h2>Shipping Costs</h2>
      <p>Shipping costs are calculated at checkout based on your location and order weight. Free shipping is available on orders over $75 within the United States.</p>
      
      <h2>Tracking</h2>
      <p>Once your order ships, you will receive a tracking number via email to monitor your delivery.</p>
      
      <h2>Delays</h2>
      <p>Soul Dog Stories is not responsible for delays caused by customs, weather, or carrier issues. International orders may be subject to customs fees.</p>
      
      <h2>Questions</h2>
      <p>For shipping questions, contact us at support@souldogstories.com.</p>
    `
  },
  contact: {
    title: 'Contact Us',
    content: `
      <p>We'd love to hear from you! Whether you have questions about your order, need help with customization, or just want to share your Soul Dog Stories experience, we're here to help.</p>
      
      <h2>Email</h2>
      <p><a href="mailto:support@souldogstories.com">support@souldogstories.com</a></p>
      
      <h2>Response Time</h2>
      <p>We respond to all inquiries within 24-48 business hours.</p>
      
      <h2>Order Support</h2>
      <p>For questions about an existing order, please include your order number in your message so we can assist you quickly.</p>
      
      <h2>Custom Requests</h2>
      <p>Have a special request or need help with your personalized book? Our team is happy to help you create the perfect story for your family.</p>
    `
  }
};

export const PolicyPage = () => {
  const { page } = useParams<{ page: string }>();
  const policy = POLICIES[page || ''];

  if (!policy) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-navy/40">Page not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-cream pt-16 pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Link to="/" className="inline-flex items-center gap-2 text-navy/40 hover:text-navy text-sm font-medium mb-10 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-display text-navy mb-10">{policy.title}</h1>

          <div
            className="prose-policy"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
        </div>
      </div>
    </Layout>
  );
};
