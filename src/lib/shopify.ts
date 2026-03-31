import Client from 'shopify-buy';

let shopifyInstance: any = null;

export const getShopifyClient = () => {
  if (shopifyInstance) return shopifyInstance;

  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !storefrontAccessToken) {
    console.warn('Shopify credentials missing. Checkout will be disabled.');
    return null;
  }

  shopifyInstance = Client.buildClient({
    domain,
    storefrontAccessToken,
    apiVersion: '2024-01',
  });
  return shopifyInstance;
};

// Helper to get product by handle
export const getProductByHandle = async (handle: string) => {
  const client = getShopifyClient();
  if (!client) return null;
  try {
    return await client.product.fetchByHandle(handle);
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    return null;
  }
};

// Helper to create a checkout and redirect
export const createCheckoutAndRedirect = async (lineItems: any[]) => {
  const client = getShopifyClient();
  if (!client) {
    alert('Shopify store is not configured. Please contact the store owner.');
    return;
  }
  try {
    const checkout = await client.checkout.create();
    const checkoutWithItems = await client.checkout.addLineItems(checkout.id, lineItems);
    window.location.href = checkoutWithItems.webUrl;
  } catch (error) {
    console.error('Error creating checkout:', error);
    alert('Something went wrong with the checkout. Please try again.');
  }
};
